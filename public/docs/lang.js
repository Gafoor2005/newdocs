console.log("hello c");
let main = document.querySelector("main");
main.style.height = main.offsetHeight-95+'px';

let sidebar_ul = document.querySelector('.sidebar ul');
let sidebar_h3 = document.querySelector('.sidebar h3');

let selected = sidebar_h3.innerText.split(" ")[0];
console.log(selected , "hello  ee");

fetch("/docs/" + selected + "_json")
.then((response) => response.json())
.then((data) => {
    console.log(data);
    data.forEach(el => {
        console.log(el.split('.')[0]);
        
        let li = document.createElement("li");
        let anc = document.createElement("a");
        anc.innerText = el.split(".")[0];
        li.appendChild(anc);
        sidebar_ul.appendChild(li);
        li.addEventListener('click',()=>{
            display_info(el);
        });
    });
});

// anc.href = "./hello";
// anc.addEventListener('click',);
function log(){
    console.log("oo yes");
} 
function display_info(file_json){
    console.log("fetching",file_json);
    let main_content = document.querySelector(".main_content");
    main_content.innerHTML = '';
    
    let content_nav = document.querySelector(".content_header h2");
    content_nav.innerText = "docs/"+ selected +"/"+file_json.split(".")[0];
    
    fetch(selected +"/"+file_json)
    .then((response) => response.json())
    .then((data) => {
        // data = JSON.parse(data);
        console.log(data);
        data.info_data.forEach(el => {
            console.log(el);
            if(el.type == "title"){
                let h3 = document.createElement("h3");
                h3.innerText = el.value;
                main_content.appendChild(h3);
            }
            else if (el.type == "desc"){
                let p = document.createElement("p");
                p.innerText = el.value;
                main_content.appendChild(p);
            }
            else if (el.type == "code"){
                // let p = document.createElement("p");
                // p.innerText = "example code :";
                // p.classList.add('margin_10_top');
                // main_content.appendChild(p);
                let p2 = document.createElement('pre');
                p2.innerText = el.value;
                
                    // not using textarea now pre came for whitespace ------------
                    // let p2 = document.createElement('textarea');
                    // p2.value = el.value;
                    // p2.disabled = 1;
                    // p2.spellcheck = 0;
                p2.classList.add("code_font");
                let div = document.createElement("div");
                div.classList.add("code_ex");
                div.appendChild(p2);
                main_content.appendChild(div);
            }
        });
    });

}
