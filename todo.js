
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskContainer');

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    
    if (Array.isArray(savedTasks)) {
        savedTasks.forEach((taskText) => {
            createTask(taskText)
        })
    }
    
    
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        createTask(taskText);

      
        savedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));

        taskInput.value = "";
    });

    // Create task 
    function createTask(taskText) {
        const task = document.createElement('div');
        task.classList.add("flex", "justify-between", "items-center", "p-2", "w-80", "mt-2", "bg-gray-200", "dark:bg-gray-700", "shadow", "rounded");
    
        task.innerHTML = `
            <span class="flex-1 cursor-pointer">${taskText}</span>
            <button class="bg-red-500 font-medium p-1 rounded hover:bg-red-700">Delete</button>
        `;
    
        taskList.append(task);
    
    
        const taskSpan = task.querySelector("span");
        taskSpan.addEventListener("click", () => {
            taskSpan.classList.toggle("line-through");
        });
    
       // Remove task
        const removeButton = task.querySelector('button');
        removeButton.addEventListener('click', () => {
            task.remove();
    
            // Remove task from saved task arrary
            const taskIndex = savedTasks.indexOf(taskText);
            if (taskIndex > -1) {
                savedTasks.splice(taskIndex, 1);
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
            }
        });
    }
});
