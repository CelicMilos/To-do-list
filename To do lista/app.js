//SELEKTORI

const todoInput = document.querySelector('.todo-input');
const todoDugme = document.querySelector('.todo-dugme');
const todoLista = document.querySelector('.todo-lista');
const filterOpcije = document.querySelector('.filter-todo');



//EVENT LSITENERS
document.addEventListener('DOMContentLoaded',getTodos);
todoDugme.addEventListener("click", addTodo);
todoLista.addEventListener('click',deleteCheck);
filterOpcije.addEventListener('click',filterTodo);




//FUNKCIJE

function addTodo(event){
    event.preventDefault();
    console.log('RADIII!');

    // TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Dodati novi todo u localStarage
    saveLocalTodos(todoInput.value);

    //CHECKED MARK BUTTON

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    ///TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    
    
    // Dodati Listi
    todoLista.appendChild(todoDiv);

    //CLEAR INPUT VALUE
    todoInput.value = '';



}
function deleteCheck(e){
 const item = e.target;

 // DELETE TODO
 if(item.classList[0]=== 'trash-btn'){
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend',function(){
        todo.remove();
    })
    //todo.remove();
 }
 // CHECK MARK
 if(item.classList[0] === 'completed-btn'){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
 }
}

function filterTodo(e){
    // console.log(filterOpcije);
    // const todos = todoLista.children;
    // console.log(todos);
    //.childNodes ne moze jer vraca HTMLCOllection a foreach ne radi sa kolekcijama
    //zato mora todoLsita.children i for,  jbg...
    const todos = todoLista.children;
     for(const todo of todos){
        switch(e.target.value){
            case "sve":
                todo.style.display ='flex';
                break;
            case "zavrseno":
                if(todo.classList.contains("completed")){
                    todo.style.display ='flex';
                }else{
                    todo.style.display ='none';
                }
                break;
            case "nezavrseno":
                if(!todo.classList.contains("completed")){
                    todo.style.display ='flex';
                }else{
                    todo.style.display ='none';
                }
                break;


        }
    };
};
function saveLocalTodos(todo){
// provera ima li neceg u localStorage
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
};
function getTodos(){
    console.log('memorija');
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
   

    //CHECKED MARK BUTTON

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    ///TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    
    
    // Dodati Listi
    todoLista.appendChild(todoDiv);
    });  
};
function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    console.log(todoIndex);
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos',JSON.stringify(todos));
};
