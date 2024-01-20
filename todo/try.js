window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form")
    const input = document.querySelector("#task-input")
    const list_el = document.querySelector(".list")

    // Load tasks from local storage on page load
    loadTasks();

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const task = input.value

        if (!task) {
            alert("Please input a task");
            return;
        } else {
            // Create a new task element
            let newTask = document.createElement("div");
            newTask.className = "box";
            newTask.innerHTML = `<div class="done"><button><img src="done.svg" alt=""></button></div>
                <input type="textarea" class="text" value="${task}" readonly>
                <div class="but flex">
                    <div class="but-1"><button>Edit</button></div>
                    <div class="but-2"><button>Delete</button></div>
                </div>`;

            // Append the new task element to the list
            list_el.appendChild(newTask);

            // Clear the input field
            input.value = "";

            // Save tasks to local storage
            saveTasks();
        }
    })

    list_el.addEventListener("click", (event) => {
        const targetButton = event.target.closest("button");
        const textToSave = targetButton.closest(".box").querySelector(".text");

        if (targetButton) {
            const action = targetButton.innerText.toLowerCase();

            if (action === "edit") {
                console.log('Edit button clicked');
                targetButton.innerText = "Save";

                // Remove the readonly attribute
                if (textToSave) {
                    textToSave.removeAttribute("readonly");
                    
                }
            } else if (action === "save") {
                targetButton.innerText = "Edit"
                textToSave.setAttribute("readonly", "readonly")
                
                // Save tasks to local storage after editing
                saveTasks();
            } else if (action === "delete") {
                const deleteContent = targetButton.closest(".box");

                if (deleteContent) {
                    // Check if deleteContent is a child of list_el
                    list_el.removeChild(deleteContent);

                    // Save tasks to local storage after deleting
                    saveTasks();
                } else {
                    console.error("Element not found");
                }
            }
        }
    });

    list_el.addEventListener("click", (event) => {
        const circle = event.target.closest("button");
        const textToChange = circle.closest(".box").querySelector(".text")

        if (circle) {
            const circleImg = circle.querySelector("img");
            if (circleImg) {
                if (circleImg.src.endsWith("done.svg")) {
                    textToChange.style.color = "#0dff00";
                    circleImg.src = "complete.svg";
                } else {
                    textToChange.style.color = "red";
                    circleImg.src = "done.svg";
                }

                // Save tasks to local storage after marking as done
                saveTasks();
            }
        }
    });

    function saveTasks() {
        // Get all task elements and extract their innerHTML
        const taskElements = Array.from(list_el.children);
        const tasks = taskElements.map(taskElement => taskElement.innerHTML);

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
                let newTask = document.createElement("div");
                newTask.className = "box";
                newTask.innerHTML = task;
                list_el.appendChild(newTask);
            });
        }
    }
});
