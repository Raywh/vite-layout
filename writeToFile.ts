const fs = require('fs');

fs.writeFile('./dist/tencent15853287577231284603.txt', '3426425376211384987', function (err) {
    if (err) throw err;
    console.log('Custom file written successfully!');
});
