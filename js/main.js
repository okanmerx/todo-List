import {Task, UI, data} from './lib.js'


let filteredData =[];

document.querySelector('form').addEventListener('submit', addTask)
document.addEventListener('click',deleteTask)
document.addEventListener('change', toggleComplete)
document.getElementById('search-input').addEventListener('input', filter)




function filter(e){
    filteredData = data.filter(d=> d.title.toLowerCase().includes(e.target.value.toLowerCase()))
    UI.render(filteredData)

}

function toggleComplete(e){
    if(e.target.className.includes('form-check-input')){
        const id = e.target.parentElement.parentElement.id.split('-')[1]
        Task.toggleComplete(id);
        if(filteredData.length>=1) UI.render(filteredData)
        else 
        UI.render(data)
    }
}

function deleteTask(e){
    let el

    if(e.target.className.includes('fa-trash')){
        el=e.target.parentElement
    }else if(e.target.className.includes('btn-delete')){
        el = e.target
    }

    if(el){
        const id = el.parentElement.parentElement.id.split('-')[1]
        console.log(id)
        Task.deleteTaskById(id)
        UI.render(data);
    }
}

function addTask(e){
    e.preventDefault();
    const taskInput = document.querySelector('#input-title')
    const closeBtn = document.querySelector('#close-model')
    const task = new Task(taskInput.value)
    task.addTask()
    
    taskInput.value = ''
    closeBtn.click()
    UI.render(data);
}


UI.render(data);