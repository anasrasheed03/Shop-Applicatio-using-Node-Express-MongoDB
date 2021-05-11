const fs = require('fs');

const requestHandler = (req,res)=>{
    const url = req.url
    const method = req.method;
if(url === '/'){
    res.write('<html>');
    res.write('<head><title>Data Pages</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>')
    res.write('</html>');
    return res.end();
}
if(url === '/message' && method === 'POST'){
    const body = [];
    req.on('data',(chunk)=>{
        body.push(chunk);
        console.log(chunk)
    })
    return req.on('end',()=>{
        const parsedBody = Buffer.concat(body).toString();
        console.log(parsedBody);
        const message = parsedBody.split('=')[1];
        fs.writeFile('message.txt',message,(err)=>{
            res.statusCode = 302;
            res.setHeader('Location','/');
            return res.end();
        });

    })
   
}
res.setHeader('Content-Type','text/html');
res.write('<html>');
res.write('<head><title>Page Title</title></head>');
res.write('<body>Hello From NoDE.JS Server</body>')
res.write('</html>');
res.end();
}
//one particulator export method
// module.exports = requestHandler;
//multiple export method
// module.exports = {
//     handler:requestHandler,
//     someText:'Some hard coded Text'
// }
//another way of multiple export methods

exports.handler = requestHandler;
exports.someText = 'Some Hard Coded Text'