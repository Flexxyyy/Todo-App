const todoList=document.querySelector('.todo-list');
const todoButton=document.querySelector('.todo-btn');
const todoInput=document.querySelector('#todo-input');
const filterOption=document.querySelector('.filter-todos')

//event listeners
window.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',checkDelete);
filterOption.addEventListener('click',filterTodo);

function addTodo(e){
    e.preventDefault();
    // console.log('hellu');
    //creating div
    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');

    //creating li
    const newTodo=document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText=todoInput.value;
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);

    //checked button
    const checkButton=document.createElement('button');
    checkButton.innerHTML=`<i class="fas fa-check"></i>`
    checkButton.classList.add('check-btn');
    todoDiv.appendChild(checkButton);

    //delete button
    const deleteButton=document.createElement('button');
    deleteButton.innerHTML=`<i class="fas fa-trash"><i/>`;
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    //append to main div
    todoList.appendChild(todoDiv);

    //clear todoinput value
    todoInput.value='';
}

function checkDelete(e){
    const item=e.target;
    // for delete 
    if(item.classList[0]=='delete-btn'){
        const todo=item.parentElement;
        todo.classList.add('fall');
        removeLocalTodo(todo);
        todo.addEventListener('transitionend',()=>{
            todo.remove();
        })
    }

    // for checked 
    if(item.classList[0]=='check-btn'){
        const todo=item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display='flex';
                }    
                else{
                    todo.style.display='none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display='flex';
                }    
                else{
                    todo.style.display='none';
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo)=>{
        const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');

    //creating li
    const newTodo=document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText=todo;
    todoDiv.appendChild(newTodo);

    //checked button
    const checkButton=document.createElement('button');
    checkButton.innerHTML=`<i class="fas fa-check"></i>`
    checkButton.classList.add('check-btn');
    todoDiv.appendChild(checkButton);

    //delete button
    const deleteButton=document.createElement('button');
    deleteButton.innerHTML=`<i class="fas fa-trash"><i/>`;
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    //append to main div
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}