// query 格式化的插件
import qs from 'query-string';
import MD5 from 'md5'
import { useAuthStore } from "@/store/user";

// 捕获异常的一个提示，和你项目用的 ui 库一致就可以
import { ElMessage } from 'element-plus'

function filterObject(o: Record<string, string>, filter: Function) {
  const res: Record<string, string> = {};
  Object.keys(o).forEach(k => {
    if (filter(o[k], k)) {
      res[k] = o[k];
    }
  });
  return res;
}

export enum EHttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type ICustomRequestError = {
  status: number;
  statusText: string;
  url: string;
}

function dealErrToast(err: Error & ICustomRequestError, abortController?: AbortController) {
  switch(err.status) {
    case 408: {
      abortController && abortController.abort();
      (typeof window !== 'undefined') && ElMessage.error(err.statusText);
      break;
    }
    default: {
      console.log(err);
      break;
    }
  }
}

/**
 * @description: 声明请求头header的类型
 */
interface IHeaderConfig {
  Accept?: string;
  'Content-Type': string;
  [propName: string]: any;
}

export interface IResponseData {
  code: number;
  data: any;
  message: string;
}

interface IAnyMap { 
  [propName: string]: any;
}

export interface IRequestOptions {
  headers?: IHeaderConfig;
  signal?: AbortSignal;
  method: EHttpMethods;
  query?: IAnyMap;
  params?: IAnyMap;
  data?: IAnyMap;
  body?: string;
  timeout?: number;
  credentials?: 'include' | 'same-origin';
  mode?: 'cors' | 'same-origin';
  cache?: 'no-cache' | 'default' | 'force-cache';
}

/**
  * Http request
  * @param url request URL
  * @param options request options
  */
interface IHttpInterface {
  request<T>(url: string, options?: IRequestOptions): Promise<T>;
}

const CAN_SEND_METHOD = ['POST', 'PUT', 'PATCH', 'DELETE'];

class Http implements IHttpInterface {
  public async request<T>(url: string, options?: IRequestOptions, abortController?: AbortController): Promise<T> {
    const r_time = '' + new Date().getTime()
    const request_id = MD5(r_time)
    const ak = 'xxxx'
    const sk = 'yyyy'
    const signature = ak + sk + request_id + r_time + JSON.stringify(options?.data)

    const opts: IRequestOptions = Object.assign({
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        'request_time': MD5(r_time),
        'request_id': request_id,
        'signature': MD5(signature),
      },
      credentials: 'include',
      timeout: 10000,
      mode: 'cors',
      cache: 'no-cache'
    }, options);

    // 获取token
    const authStore = useAuthStore();
    const token = authStore.token
    if (token && opts.headers) Reflect.set(opts.headers, 'Authorization', 'Bearer ' + token);

    abortController && (opts.signal = abortController.signal);

    if (opts && opts.query) {
      url += `${url.includes('?') ? '&' : '?'}${qs.stringify(
        filterObject(opts.query, Boolean),
      )}`;
    }

    const canSend = opts && opts.method && CAN_SEND_METHOD.includes(opts.method);

    if (canSend && opts.data) {
      opts.body = JSON.stringify(filterObject(opts.data, Boolean));
      opts.headers && Reflect.set(opts.headers, 'Content-Type', 'application/json');
    }

    try {
      const res = await Promise.race([
        fetch(url, opts),
        new Promise<any>((_, reject) => {
          setTimeout(() => {
            return reject({ status: 408, statusText: '请求超时，请稍后重试', url });
          }, opts.timeout);
        }),
      ]);

      const result: T = await res.json();
      return result;
    } catch (e: any) {
      dealErrToast(e, abortController);
      return e;
    }
  }
}

const { request } = new Http();

export { request as default };