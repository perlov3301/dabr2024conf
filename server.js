import { createServer } from 'http';
import  {readFile} from 'fs/promises';

async function fserver(url) {
  if (url === '/api/cat-names') {
    const catFile = await readFile('./cats.txt','utf8');
    const catNames = catFile.split('\n');
    const json = { catNames };
    return json;
  }
  if (url==='/') {
    return  `<!doctype html>
      <html>
        <head>
          <link rel="stylesheet href="style.css" />
        </head>
        <body>
          <script src="client.js"></script>
          <button onClick="onClick()">
            Reveal
          </button> 
        </body>
      </html>
    `;
  }
 
  if (url==='/client.js') {
    return readFile('./client.js', 'utf8');
  }
}
const port = 8080;
let vdata;
let vtext='';
createServer(async function (req, res) {
    console.log(`serverjs;createServer();url=${req.url};`) ;
    const vdata = await fserver(req.url);
    // console.log(vdata);
    // if (req.url === './client.js') {
    //   vtext = vdata;
    // }
    // console.log(vtext);
    if (req.url==='/') {
        res.writeHead(200, {'Content-Type':'text/html'});
    }  
    if (req.url==='./client.js') {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
    }
    if (req.url === '/api/cat-names') {
        res.writeHead(200, {'Content-Type': 'application/json'});
    }
    if (req.url='./installHook.js.map') {
       // disable your react tools extension
    }
    
    res.end(vdata);

}).listen(port,(err)=>{
    if (err) { console.error(err); }
    console.log(`server is listening on port ${port}`);;
});