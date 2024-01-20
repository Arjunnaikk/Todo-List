window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form")
    const input = document.querySelector("#task-input")
    const list_el = document.querySelector(".list")

    // Load tasks from local storage on page load
    loadTasks();

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskText = input.value;

        if (!taskText) {
            alert("Please input a task");
            return;
        } else {
            // Create a new task object
            const newTask = {
                text: taskText,
                color: "red", // Default text color
                isDone: false // Default circle state
            };

            // Create a new task element
            const newTaskElement = createTaskElement(newTask);

            // Append the new task element to the list
            list_el.appendChild(newTaskElement);

            // Clear the input field
            input.value = "";

            // Save tasks to local storage
            saveTasks();
        }
    });

    list_el.addEventListener("click", (event) => {
        const targetButton = event.target.closest("button");

        if (targetButton) {
            const action = targetButton.innerText.toLowerCase();
            const taskElement = targetButton.closest(".box");
            const textElement = taskElement.querySelector(".text");

            if (action === "edit") {
                console.log('Edit button clicked');
                targetButton.innerText = "Save";

                // Remove the readonly attribute
                if (textElement) {
                    textElement.removeAttribute("readonly");
                }
            } else if (action === "save") {
                targetButton.innerText = "Edit"
                textElement.setAttribute("readonly", "readonly");

                // Save tasks to local storage after editing
                saveTasks();
            } else if (action === "delete") {
                // Check if deleteContent is a child of list_el
                list_el.removeChild(taskElement);

                // Save tasks to local storage after deleting
                saveTasks();
            }
        }
    });

    list_el.addEventListener("click", (event) => {
        const circle = event.target.closest("button");

        if (circle) {
            const taskElement = circle.closest(".box");
            const textElement = taskElement.querySelector(".text");
            const circleImg = circle.querySelector("img");

            if (circleImg) {
                if (circleImg.src.endsWith("done.svg")) {
                    textElement.style.color = "#0dff00";
                    circleImg.src = "complete.svg";
                } else {
                    textElement.style.color = "red";
                    circleImg.src = "done.svg";
                }

                // Save tasks to local storage after marking as done
                saveTasks();
            }
        }
    });

    function saveTasks() {
        // Get all task elements and extract their task data
        const taskElements = Array.from(list_el.children);
        const tasks = taskElements.map(taskElement => {
            return {
                text: taskElement.querySelector(".text").value,
                color: taskElement.querySelector(".text").style.color,
                isDone: taskElement.querySelector("img").src.endsWith("complete.svg")
            };
        });

        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        // Retrieve tasks from local storage
        const storedTasks = localStorage.getItem('tasks');

        if (storedTasks) {
            // Parse the JSON and recreate task elements
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                const newTaskElement = createTaskElement(task);
                list_el.appendChild(newTaskElement);
            });
        }
    }

    function createTaskElement(task) {
        // Create a new task element
        const newTaskElement = document.createElement("div");
        newTaskElement.className = "box";
        newTaskElement.innerHTML = `<div class="done"><button><img src="${task.isDone ? 'complete.svg' : 'done.svg'}" alt=""></button></div>
            <input type="textarea" class="text" value="${task.text}" style="color: ${task.color};" readonly>
            <div class="but flex">
                <div class="but-1"><button>Edit</button></div>
                <div class="but-2"><button>Delete</button></div>
            </div>`;
        return newTaskElement;
    }
});
