import { createServer } from 'http';
import  {readFile} from 'fs/promises';
const port = 8080;

async function fserver(url) {
  
  if (url==='/') {
    const catFile = await readFile('./cats.txt','utf8');
    const catNames = catFile.split('\n');
    const json = { catNames };
    return  `<!doctype html>
      <html>
        <head>
          <link rel="stylesheet href="style.css" />
        </head>
        <body>
          <script >
            function onClick() {
             console.log("serverjs;onClick()");
             
             const { catNames} = ${JSON.stringify(json)};
             const index = Math.floor(Math.random()*catNames.length);
             const catName = catNames[index];
             document.body.innerText= catName;
}
          </script>
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


let vdata;
createServer(async function (req, res) {
    console.log(`serverjs;createServer();url=${req.url};`) ;
    vdata = await fserver(req.url);
    
    if (req.url==='/') {
        res.writeHead(200, {'Content-Type':'text/html'});
    }  
    if (req.url==='./client.js') {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
    }
    if (req.url === '/api/cat-names') {
        vdata=JSON.stringify(vdata);
        res.writeHead(200, {'Content-Type': 'application/json'});
    }
    if (req.url='./installHook.js.map') {
       // disable your react tools extension
    }
    console.log("serverjs;createServer();before res.end()");
    res.end(vdata);

}).listen(port,(err)=>{
    if (err) { console.error(err); }
    console.log(`server is listening on port ${port}`);;
});