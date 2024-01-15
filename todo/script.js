window.addEventListener('load',()=>{
    const form = document.querySelector("#new-task-form")
    const input = document.querySelector("#task-input")
    const list_el = document.querySelector(".list")

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

    // Using event delegation to handle "Edit" button clicks
    list_el.addEventListener("click", (event) => {
        const targetButton = event.target.closest(".but-1 button");
        const textToSave = targetButton.closest(".box").querySelector(".text");
        if (targetButton && targetButton.innerText.toLowerCase() === "edit") {
            console.log('Edit button clicked');
            
            targetButton.innerText = "Save"
            // Assuming textToSave is an input element you want to make editable

            // Remove the readonly attribute
            if (textToSave) {
                textToSave.removeAttribute("readonly");
            }
        }
        else{
            targetButton.innerText = "Edit"
            textToSave.setAttribute("readonly","readonly")
        }
    });

    //Delete the content
    // list_el.addEventListener("click", (event) => {
    //     const deleteButton = event.target.closest(".but-2");
    //     if(deleteButton){
    //         console.log(deleteButton);
    //         const deletecontent = deleteButton.closest(".box")
    //         if(deletecontent){
    //             list_el.removeChild(deletecontent)
    //         }
    //     }
        
    // });

    list_el.addEventListener("click", (event) => {
        const deleteButton = event.target.closest(".but-2");
    
        if (deleteButton) {
            console.log(deleteButton);
    
            const deleteContent = deleteButton.closest(".box");
    
            if (deleteContent) {
                list_el.removeChild(deleteContent);
            }
        }
    });
    


});

    // const edit = document.querySelector("lst");
    // console.log(edit);
    // let edit = document.querySelector(".lst").getElementsByTagName(".but-1")
    // edit.addEventListener("click",()=>{
    //     console.log('Clickkk');
    // })

    
// })