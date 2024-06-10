export let data = []
export class Task {
    constructor(title){
        this.title = title;
        this.date = new Date();
        this.id = Date.now();
        this.completed = false;
    }

    addTask(){
        data.push(this);
    }

    static deleteTaskById(id){
        data = data.filter((t) => t.id != id);
    }
    static toggleComplete(id){
        const taskIndex = data.findIndex((t) => t.id == id);
        data[taskIndex].completed = !data[taskIndex].completed;
    }
}

export class UI {
    static render(renderData) {
      const tasks = document.getElementById("tasks");
      if(renderData.length==0)
          tasks.innerHTML = `<h5 class="text-center my-5">No Tasks !</h5>`
      else 
       tasks.innerHTML =''
      document.getElementById("total-stats").textContent = data.length;
      document.getElementById("completed-stats").textContent = data.filter(
        (t) => t.completed,
      ).length;
      document.getElementById("incompleted-stats").textContent = data.filter(
        (t) => !t.completed,
      ).length;
  
      renderData.forEach((task) => {
        const div = document.createElement("div");
  
        div.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-center",
        );
        if (task.completed) div.classList.add("list-group-item-success");
        div.id = `task-${task.id}`;
        div.innerHTML = `
          <div class="d-flex align-items-center gap-3">
            <input class="form-check-input" type="checkbox" ${task.completed? "checked":""}>
              <div class="d-flex flex-column gap-1">
                <h2 class="m-0">${task.title}</h2>
                <small>${task.date.toLocaleDateString("en-US")}</small>
              </div>
          </div>  
            <div class="d-flex gap-3">
              <button class="btn btn-warning text-light">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn btn-danger btn-delete">
                <i class="fa-solid fa-trash"></i>
              </button>
          </div>
  
              `;
  
        tasks.appendChild(div);
      });
    }
  }