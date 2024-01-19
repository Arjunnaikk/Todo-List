window.addEventListener('load',()=>{
    const form = document.querySelector("#new-task-form")
    const input = document.querySelector("#task-input")
    const list_el = document.querySelector(".list")
    const lst_el = document.querySelector(".lst")

    const textToSave = document.querySelector(".text")

    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        
        const task = input.value
        
        if(!task)
        {
            alert("Plzz input")
            return;
        }
        else{
            // Create a new task element
            let newTask = document.createElement("lst");
            newTask.innerHTML =  newTask.innerHTML + `<div class="box">
            <div class="done"><button><img src="done.svg" alt=""></button></div>
                <input type="textarea" class="text" value="${task}" readonly>
                <div class="but flex">
                <div class="but-1"><button>Edit</button></div>
                <div class="but-2"><button>Delete</button></div>
                
            </div>
        </div>`;

            // Append the new task element to the list
            list_el.appendChild(newTask);

            // Clear the input field
            input.value = "";
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
            }
                else if(action === "save"){
                    targetButton.innerText = "Edit"
                    textToSave.setAttribute("readonly","readonly")
                }
            else if (action === "delete") {
                const deleteContent = targetButton.closest(".box");
    
                if (deleteContent) {
                    // Check if deleteContent is a child of lst
                    const lstElement = deleteContent.closest("lst");
    
                    if (lstElement) {
                        lstElement.removeChild(deleteContent);
                    } else {
                        console.error("lst not found for deleteContent");
                    }
                } else {
                    console.error("Element not found");
                }
            }
        }
    });


    list_el.addEventListener("click",(event)=>{
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
            }
        }

    })

});


