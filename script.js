let addSign;
document.getElementById("form").addEventListener("submit", isSubmitted);

function isSubmitted(event)
{
    //This line prevents the normal submission process
    //Basically the page won't be reloaded after a submission
    event.preventDefault();

    let spalten = document.getElementsByClassName("Spalte");
    let spalteClass = addSign.classList[2];
    let spalte;
    
    //Iterating through all the columns to find the one with the correct class of the plus sign
    for (let i = 0; i < spalten.length; i++)
    {
        if (spalten[i].classList.contains(spalteClass))
        {
            spalte = document.getElementsByClassName(spalteClass)[0];
        }
    }
    
    //Copy the muster task and change its class to not interfere with next tasks creation
    let muster = document.getElementsByClassName("Task-Muster")[0];
    let newTask = muster.cloneNode(true);
    newTask.className = "New-Task";

    //Set the task name
    let taskName = document.getElementById("Task-Name").value;
    newTask.getElementsByClassName("name")[0].textContent = taskName;

    //Take hold of a list of all the exercises input fields
    let checkboxBeschreibungListe = document.getElementsByClassName("Aufgabe");

    //Take the input checkbox muster and cancel its values
    let inputSatz = document.getElementsByClassName("Input-Satz")[0];
    inputSatz.getElementsByClassName("checkbox-beschreibung")[0].value = "";
    

    //Iterate through the list of inputted exercises
    for (let i = 0; i < checkboxBeschreibungListe.length; i++)
    {
        let newAufgabe = checkboxBeschreibungListe[i];
        //Create a new checbox input copy for every exercise
        let newInputSatz = inputSatz.cloneNode(true);
        newInputSatz.style.display = "flex";
        
        //Change the class name of the copy to not interfere with the muster choice
        newInputSatz.className = "New-Input-Satz";
        
        //For every new checkbox assign the exercise as the label
        newInputSatz.getElementsByClassName("checkbox-beschreibung")[0].textContent = newAufgabe.value;
        
        newTask.appendChild(newInputSatz);
    }

    newTask.style.display = "flex";

    //Add the whole task to the right column
    spalte.appendChild(newTask);

    exit();
}

function exit()
{
    //Display the window and resetting the name field
    document.getElementById("Add-Task").style.display = "none";
    document.getElementById("Task-Name").value = "";

    //Copying the first input field with plus sign and resetting the field value
    let ersteInput = document.getElementById("Erste-Input");
    let newErsteInput = ersteInput.cloneNode(true);
    newErsteInput.getElementsByClassName("Aufgabe")[0].value = "";
    
    //Removing all the fields and adding the new copied field
    //Window completely resetted
    let aufgabeCheckbox = document.getElementById("Aufgabe-Checkbox");
    aufgabeCheckbox.replaceChildren();
    aufgabeCheckbox.appendChild(newErsteInput);
}

function createTask(add)
{
    document.getElementById("Add-Task").style.display = "flex";
    //Saving the plus sign to later get the class of its column
    addSign = add;
}

function deleteTask(task) 
{
    let taskToDelete = task.parentElement.parentElement;
    taskToDelete.remove();
}

function addAufgabeFeld()
{
    //Copying and resetting the value of the input field to create a new one
    let inputAufgabe = document.getElementsByClassName("Aufgabe")[0];
    let newInputField = inputAufgabe.cloneNode(true);
    newInputField.value = "";

    //Appending the input field
    let aufgabeCheckbox = document.getElementById("Aufgabe-Checkbox");
    aufgabeCheckbox.appendChild(newInputField);
}

function changeColumn(select)
{
    //Take hold of the complete task and copying it
    let selectTask = select.parentElement.parentElement;
    let changedTask = selectTask.cloneNode(true);

    //Filter through the options to find the selected option's value
    //Converting the options to an array -> filtering for the selected one -> 
    // replacing it with its value for the class
    let selectedOption = Array.from(select.options).filter(option => option.selected).map(option => option.value);
    
    //Using the founded class to get the new column
    let newColumn = document.getElementsByClassName(selectedOption[0])[0];

    //Deleting the beginning task and appending the copy to the new column
    selectTask.remove();
    newColumn.appendChild(changedTask);
}
