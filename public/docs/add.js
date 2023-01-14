console.log("testing");

let langs_div = document.querySelector(".langs");
// let lang_temp = document.querySelectorAll(".lang_temp");
let lang_temp = document.getElementsByClassName("lang_temp");
let div_box = document.getElementById("div_box");
let back_btn = document.getElementsByClassName("back_btn");
let main_title_h1 = document.querySelector(".main_title h1");
// console.log(main_title_h1);

let select_edit_options_div = document.querySelector(".select_edit_options");
let data_inpt_div = document.querySelector(".data_inpt");
let inpt_tools_ul = document.querySelector(".inpt_tools");

let create_topic_selected = false;

div_box.style.height = div_box.offsetHeight-95+'px';
console.log(div_box.offsetHeight);
div_box.classList.add("none");

// console.log(langs_div); 


// fetch('./c_files')
//   .then((response) => response.json())
//   .then((data) => console.log(data));





fetch('/docs_folders')
.then((response) => response.json())
.then((data) => {
  console.log(data)
  data.forEach(e => {
    // let va = element;
    let outer_div = document.createElement('div');
    let h1_elem = document.createElement('h1');
    h1_elem.innerText = e;
    let h3_elem = document.createElement('h3');
    h3_elem.innerText = "+ add";
    let h4_elem = document.createElement('h4');
    if(e == "C" || e == "C++"){
      h4_elem.innerText =  e + " language";
    }else{
      h4_elem.innerText =  e;
    }
    outer_div.classList.add("lang_temp","content_temp");
    outer_div.appendChild(h1_elem);
    outer_div.appendChild(h3_elem);
    outer_div.appendChild(h4_elem);
    langs_div.appendChild(outer_div);
  });
  let outer_div = document.createElement('div');
  let h1_elem = document.createElement('h1');
  h1_elem.innerText = "+";
  let h3_elem = document.createElement('h3');
  h3_elem.innerText = "add a new language";
  let h4_elem = document.createElement('h4');
  h4_elem.innerText = "New";
  outer_div.classList.add("add_temp","content_temp");
  outer_div.appendChild(h1_elem);
  outer_div.appendChild(h3_elem);
  outer_div.appendChild(h4_elem);
  langs_div.appendChild(outer_div);
  // langs_div.removeChild(outer_div);

  

})
.then(()=>{     // asyncronous model 
  console.log(lang_temp);
  for (let i = 0; i < lang_temp.length; i++) {
    lang_temp[i].addEventListener("click",(e)=>{
      // console.log(e);
      // console.log(lang_temp[i]);
      // console.log(lang_temp[i].childElementCount);
      // console.log(lang_temp[i].childNodes[0]);
      main_title_h1.innerHTML = lang_temp[i].childNodes[0].innerHTML;
      langs_div.classList.toggle("none");
      div_box.classList.toggle("none");
    });
  }
  back_btn[0].addEventListener("click",(e)=>{
    if(create_topic_selected == true){
      select_edit_options_div.classList.toggle("none");
      data_inpt_div.classList.toggle("none");
      inpt_tools_ul.classList.toggle("none");
      create_topic_selected = false;
    }
    else{
      langs_div.classList.toggle("none");
      div_box.classList.toggle("none");

    }
  });
  console.log("end");
  // function submit_add(){
    //   console.log("language for ",main_title_h1.innerHTML);
    //   console.log(topic_input.textContent);
    //   console.log(desc_input.textContent);
    // }
});
    
    
function submit_add(){
  console.log("language for ",main_title_h1.innerHTML);
  let inpt_topic = document.getElementById("inpt_topic");
  let data_inpt_values = document.getElementsByClassName("data_inpt_value");
  // console.log(data_inpt_values);
  // console.log(data_inpt_values[0].innerHTML);
  // console.log(data_inpt_values[0].value);
  // console.log(data_inpt_values[0].name);

  let data = { type : "add_topic",
               language :  main_title_h1.innerHTML,
               topic : inpt_topic.value.replace(/ /g,'_'),
               info_data :[]
  };
  console.log(data.topic);
  for (let i = 0; i < data_inpt_values.length; i++) {
    let e = data_inpt_values[i];
    data.info_data[data.info_data.length] = {
      type : e.name,
      value : e.value
    };
  }  
  console.log(data);
  fetch('/add_edit', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    alert("submitted");
  })
  .catch((error) => {
    console.error('Error:', error);
  });



}
    

function create_topic(){
  select_edit_options_div.classList.toggle("none");
  data_inpt_div.classList.toggle("none");
  inpt_tools_ul.classList.toggle("none");
  create_topic_selected = true;
}
  
// const data = { username: 'example' };

// fetch('https://example.com/profile', {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
// .then((response) => response.json())
// .then((data) => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });

function add_title(){
  let lable = document.createElement("label");
  lable.htmlFor = "title";
  lable.innerText = "enter title :";
  let input_tag = document.createElement("input");
  input_tag.name = "title";
  input_tag.type = "text";
  input_tag.classList.add("data_inpt_value");
  input_tag.placeholder = "enter the title";
  data_inpt_div.appendChild(lable );
  data_inpt_div.appendChild(input_tag);
}
// add_title();

function add_text(){
  let lable = document.createElement("label");
  lable.htmlFor = "desc";
  lable.innerText = "description :";
  let textarea = document.createElement("textarea");
  textarea.name = "desc";
  textarea.classList.add("data_inpt_value");
  textarea.cols = "40";
  textarea.rows = "10";
  textarea.placeholder = "enter some words";
  textarea.style.fontSize = "large";
  data_inpt_div.appendChild(lable);
  data_inpt_div.appendChild(textarea);
}
// add_text();

function add_code(){
  let lable = document.createElement("label");
  lable.htmlFor = "code";
  lable.innerText = "source code :";
  let textarea = document.createElement("textarea");
  textarea.name = "code";
  textarea.classList.add("code_font");
  textarea.classList.add("data_inpt_value");
  textarea.cols = "40";
  textarea.rows = "10";
  textarea.placeholder = "enter code";
  textarea.style.fontSize = "large";
  data_inpt_div.appendChild(lable);
  data_inpt_div.appendChild(textarea);
  
}
// add_code();





