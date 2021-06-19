const todoList=document.querySelector('.todo-list');
const todoButton=document.querySelector('.todo-btn');
const todoInput=document.querySelector('#todo-input');

//event listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',checkDelete);

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

// continue from 37:16 