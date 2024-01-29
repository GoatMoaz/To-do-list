const ul=document.querySelector('ul');
ul.addEventListener('click',function(e){
    if(e.target.className=='btn-danger'){
        ul.removeChild(e.target.parentNode);
    }
});  
const add=document.forms['add-todo'];
add.addEventListener('submit',function(e){
    e.preventDefault();
    createElement();
    reset();
});
function createElement(){
    const text=add.querySelector('input[type="text"]').value;
    const li=document.createElement('li');
    const btn=document.createElement('button');
    if(text.length==0){
        alert('Please enter something');
        return;
    }
    li.textContent=text;
    btn.textContent='Delete';
    btn.className='btn-danger';
    li.appendChild(btn);
    ul.appendChild(li); 
}
function reset(){
    text=add.querySelector('input[type="text"]').value='';
}