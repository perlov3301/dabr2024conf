
function fexec() {
    console.log("clientjs;dom loaded");
    // alert("dom and clientjs are loaded");
    
}
if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",fexec);
} else { fexec(); }
let catNames = [];
  catNames = [
    "Alonzo",
    "Bill Bailey", 
    "Bombalurina",
    "Electra",
    "Pluto",
    "Nigura",
];
async function onClick() {
    console.log("clientjs;onClick()");
  const response = await fetch('/api/cat-names');
  const json = await response.json();
  const { catNames} = json;
 console.log(`clientjs;onClick();catNames:${catNames}`)
  const index = Math.floor(Math.random()*catNames.length);
console.log(`clientjs:onClick();index=${index}`);
  const catName = catNames[index];
  document.body.innerText= catName;
}