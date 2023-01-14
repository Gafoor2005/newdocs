const fs = require('fs')
const express = require('express')
const { json } = require('express')
const app = express()
const port = 5500

app.use(express.json());
// app.use(express.static('./public/'))

app.get('/',(req,res)=>{
    let file = fs.readFileSync('./public/index.html');
    // res.send(file);
    res.end(file)
})




function serve_folder ( rootFldr , firstUrl){
    let arrOfFolders = fs.readdirSync(rootFldr);
    for (let i = 0; i < arrOfFolders.length; i++) {
        console.log(firstUrl+'/'+arrOfFolders[i]);
        if(arrOfFolders[i].split(".")[1] == undefined){continue;}
        app.get(firstUrl+'/'+arrOfFolders[i],(req,res)=>{
            let file = fs.readFileSync(rootFldr+'/'+arrOfFolders[i]);
            // res.send(file);
            
            console.log(firstUrl+'/'+arrOfFolders[i]);
            console.log("---.extension");
            res.end(file);
        })
        console.log(arrOfFolders[i].split(".")[1]);
        if(arrOfFolders[i].split(".")[1] == "html"){
            app.get(firstUrl+'/'+arrOfFolders[i].split(".")[0],(req,res)=>{
                let file = fs.readFileSync(rootFldr+'/'+arrOfFolders[i])
                console.log(firstUrl+'/'+arrOfFolders[i].split(".")[0]);
                console.log("---non ext");
                res.end(file)
            })
        }
    }
}// . ext
serve_folder("./public",'')
serve_folder("./public/docs",'/docs')
serve_folder("./public/docs/c",'/docs/c')
serve_folder("./public/docs/cpp",'/docs/cpp')
serve_folder("./public/assets",'/assets')



function existing_dirs(rootFldr,ext_type,real_ext){
    let arrOfFolders = fs.readdirSync("./public"+rootFldr);
    // console.log("hello hello helllo heloo");
    console.log(arrOfFolders);
    
    let build_data = [];
    for (let i = 0; i < arrOfFolders.length; i++) {
        if (arrOfFolders[i].split(".")[1] != real_ext) {continue;}
        build_data[build_data.length] = arrOfFolders[i];
    }
    console.log(build_data);
    app.get(rootFldr+"_"+ext_type, (req,res)=>{
        
        res.end(JSON.stringify(build_data));
    })

}// _ ext
existing_dirs("/docs","folders",undefined)
existing_dirs("/docs/c","json","json")
existing_dirs("/docs/cpp","json","json")


app.post('/add_edit',(req,res)=>{
    let data = req.body;
    console.log(req.body);
    function add_json(){
        let path = './public/docs/'+ data.language + '/' + data.topic + '.json';
        console.log(path);
        let write_data = {info_data : data.info_data}
        write_data = JSON.stringify(write_data);
        fs.writeFileSync(path,write_data);
    }
    if(data.type == "add_topic"){
        add_json();
    }
    else{
        console.log("invalid type in /add_edit");
    }
    res.end(JSON.stringify({transfer: "success"}));
})


// app.get(fs.existsSync('./public/'),(req,res) => {
//     console.log(req.url);
//     console.log("well done");
//     res.send("hello")
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})