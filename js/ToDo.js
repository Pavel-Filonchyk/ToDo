const taskList = document.querySelector("#list-group")  
let tasks = []  
let tasksJSON = localStorage.getItem("tasks")  
if(tasksJSON !== null){
    let tasksArray = JSON.parse(tasksJSON)    
    tasks = tasksArray   
    
    tasks.forEach(function(item){
        const taskHTML = `  
        <li class="list-group-item d-flex justify-content-between">
			<span contenteditable="true" class="task-title">${item}</span>
				<div>
					<button type="button" data-action="ready" class="btn btn-light align-self-end">Done</button>
					<button type="button" data-action="delete-task" class="btn btn-light align-self-end">Remove</button>
				</div>
		</li>
       `   
    taskList.insertAdjacentHTML("afterbegin", taskHTML)
    })
}
/* add task*/
const form = document.querySelector("#newTaskForm");
form.addEventListener("submit", function (event){ 
    
    event.preventDefault() 
    const taskInput = document.querySelector("#addNewTask") 
    const taskText = taskInput.value;   

    tasks.push(taskText)  
    localStorage.setItem("tasks", JSON.stringify(tasks))  

    const taskHTML = `  
        <li class="list-group-item d-flex justify-content-between">
			<span contenteditable="true" class="task-title">${taskText}</span>
				<div>
					<button type="button" data-action="ready" class="btn btn-light align-self-end">Done</button>
					<button type="button" data-action="delete-task" class="btn btn-light align-self-end">Remove</button>
				</div>
		</li>
        `    
    taskList.insertAdjacentHTML("afterbegin", taskHTML) 
    taskInput.value = ""; 
})

taskList.addEventListener("click", function(event){
    if(event.target.getAttribute("data-action") === "delete-task") {      
        const taskText = event.target.closest("li").querySelector(".task-title").textContent  
        const taskIndex = tasks.indexOf(taskText) 
        tasks.splice(taskIndex, 1)  
        localStorage.setItem("tasks", JSON.stringify(tasks))
        event.target.parentElement.parentElement.remove()        
    } 
})