import { loadingElement, displayLoadingAnimation, dashboardLogo, hideDashboardLogo } from '/js/plotting.js'

import { clearInputSloSelector, clearInputMeasureSelector, clearInputTargetSelector, hideAllInputModalSelectorErrors, modalInputAcademicTermTag } from '/js/inputModal.js';

import {isValid500Error,isValid400Error,getErrorResponse500,getErrorResponse400} from '/js/plotModal.js';

/////////////////////////////////////////Input modal elements///////////////////////////////////////////////
const saveButton = document.getElementById('data-input-button');
const closeInputModalButton = document.querySelector("#dataInputModal > div > div > div.modal-footer > button.btn.btn-secondary");
const sloSelectorInputModal = document.querySelector("#SLO-selector-data");
const measureSelectorInputModal = document.querySelector("#measure-selector-data");
const targetSelectorInputModal = document.querySelector("#SLO-selector-target");

const targetAmountInputField = document.querySelector("#student-target-input");
const numberOfStudentsInputField = document.querySelector("#number-of-students-input");
const numberOfStudentsMetTargetInputField = document.querySelector("#number-of-students-met-input");
const percentageOfStudentsMetTargetInputField = document.querySelector("#percentage-of-students-met-input");
const resultTextBoxInputField = document.querySelector("#result-texbox");
///////////////////////////////////////////////////////////////////////////////////////////////////////////


const confirmationMessageArea = document.querySelector("#confirmation-message-area");
const errorMessageArea = document.querySelector("#error-message-area");


//All selector values and input box elements.
const inputFields = {

    sloSelector: sloSelectorInputModal,
    measureSelector: measureSelectorInputModal,
    targetSlector: targetSelectorInputModal,
    targetAmountElement: targetAmountInputField,
    numberOfStudentsElement: numberOfStudentsInputField,
    numberOfStudentsMetTargetElement: numberOfStudentsMetTargetInputField,
    percentageOfStudentMeTargetElement: percentageOfStudentsMetTargetInputField,
    resultTextBoxElement: resultTextBoxInputField
    
};


//Checks if a string is numeric, an integer or decimal.
function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}



//Checks if a value is in between lower and upper values inclusive i.e 1 to 10; 1 and 10 included.
function isBetweenInclusiveValues(number, lower, upper) {

    if (number >= lower && number <= upper) { return true };

    return false;
    
}



//Checks if string is numeric and between 0 to 100 including 0 and 100.
function numericInputIsValid(text) {

    if (isNumeric(text) && isBetweenInclusiveValues(text, 0, 100)) {
       return true; 
    }

    return false;
}



//Checks if a string is empty.
function isEmptyString(string) {

    const emptyString = "";

    if (string == null) return false;

    if (string == emptyString || string.trim() == emptyString) {
        return true;
    }

    return false;
}



//Sets all the selectors back to their default option and clears all other options that were loaded previously. 
function clearAllSelectorOptions(modalInputSloSelector,modalInputMeasureSelector,modalInputTargetSelector) {

    clearInputSloSelector(modalInputSloSelector);
    clearInputMeasureSelector(modalInputMeasureSelector);
    clearInputTargetSelector(modalInputTargetSelector);

}



//Clears all the text input elements and the textbox.
function clearAllInputFieldData(inputFields) {

    const targetAmountInputField = inputFields.targetAmountElement;
    const numberOfStudentsInputField = inputFields.numberOfStudentsElement
    const numberOfStudentsMetTargetInputField = inputFields.numberOfStudentsMetTargetElement;
    const percentageOfStudentsMetTargetInputField = inputFields.percentageOfStudentMeTargetElement;
    const resultInputField = inputFields.resultTextBoxElement;

    targetAmountInputField.value = '';
    numberOfStudentsInputField.value = '';
    numberOfStudentsMetTargetInputField.value = '';
    percentageOfStudentsMetTargetInputField.value = '';
    resultInputField.value = '';
    
}


//Clears the options within the selectors and resets them to default and clears all inputs from input fields.
function clearAllInputModalData(inputFields) {
     
    clearAllSelectorOptions(inputFields.sloSelector,inputFields.measureSelector,inputFields.targetSlector);
    clearAllInputFieldData(inputFields);
    
}



function revealDashboardLogo(dashboardLogo) {

    setTimeout(() => {

        dashboardLogo.style.display = "block";

    }, 2000);
    
}



//Reveals a message area. Either the confirmation message area or the error message area.
function revealMessageArea(messageArea) {

    setTimeout(() => {

        messageArea.style.display = "grid";
        
    }, 2300);
    
}



//Hides a message area. Either the confirmation message area or the error message area.
function hideMessageArea(messageArea) {

        messageArea.style.display = "none";

}



//Hides the error displayed by a selector element i.e SLO, Measure.
function hideUnselectedSelectorError(selector) {

    if (selector == null) return null;

    selector.style.borderColor = "#0d6efd";

    const parentNode = selector.parentElement;
    const unfilledErrorContainer = parentNode.children[1];

    unfilledErrorContainer.style.display = "none";
    
}



//Hides the error of an unfilled input element.
function hideUnfilledTextFieldError(inputElement) {

    if (inputElement == null) return null;

    inputElement.style.borderColor = "#0d6efd";

    const parentNode = inputElement.parentElement;
    const unfilledErrorContainer = parentNode.children[2];

    unfilledErrorContainer.style.display = "none";
    
}



//Hides invalid input errors for input elements.
function hideInvalidTextFieldError(inputElement) {

     if (inputElement == null) return null;

    inputElement.style.borderColor = "#0d6efd";

    const parentNode = inputElement.parentElement;

    const invalidErrorContainer = parentNode.children[3];

    invalidErrorContainer.style.display = "none";
}



//This hides all current errors that are on the input modal.
function resetAllActiveInputFieldErrors(inputFields) {

    const unfilledTextFields = getAllUnfilledTextFields(inputFields);
    const invalidInputFields = getAllInvalidInputFields(inputFields);

    unfilledTextFields.forEach(hideUnfilledTextFieldError);
    invalidInputFields.forEach(hideInvalidTextFieldError);
    
}




function closeInputModal() {
    
    const closeButton = document.querySelector("#dataInputModal > div > div > div.modal-header > button");

    closeButton.click();
    
}



//Checks if all the selectors i.e SLO, Measure etc. are all selected and not in their default selection.
function allInputSelectorsSelected(inputFields) {

    const sloSelectorInputModal = inputFields.sloSelector;
    const measureSelectorInputModal = inputFields.measureSelector;
    const targetSelectorInputModal = inputFields.targetSlector;

    const defaultSloSelectorValue = sloSelectorInputModal.options[0].text;
    const defaultMeasureSelectorValue = measureSelectorInputModal.options[0].text;
    const defaultTargetSelectorValue = targetSelectorInputModal.options[0].text;
    const currentSloSelectorValue = sloSelectorInputModal.options[sloSelectorInputModal.selectedIndex].text;
    const currentMeasureSelectorValue = measureSelectorInputModal.options[measureSelectorInputModal.selectedIndex].text;
    const currentTargetSelectorValue = targetSelectorInputModal.options[targetSelectorInputModal.selectedIndex].text;
    

    if (defaultSloSelectorValue == currentSloSelectorValue ||
        defaultMeasureSelectorValue == currentMeasureSelectorValue || defaultTargetSelectorValue == currentTargetSelectorValue) {
        
        return false;
    }


    return true;
}



//Checks if all the input fields (text based) have valid input except the result textbox.
//result text box values are assumed to be true since it's just sentences.
function allInputFieldsHasValidInput(inputFields) {

    const targetAmountInputField = inputFields.targetAmountElement;
    const numberOfStudentsInputField = inputFields.numberOfStudentsElement
    const numberOfStudentsMetTargetInputField = inputFields.numberOfStudentsMetTargetElement;
    const percentageOfStudentsMetTargetInputField = inputFields.percentageOfStudentMeTargetElement;
    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");

    if (togglepercentageStudentsMetButtton.checked == false) {

        if (numericInputIsValid(targetAmountInputField.value) &&
            numericInputIsValid(numberOfStudentsInputField.value) &&
            numericInputIsValid(numberOfStudentsMetTargetInputField.value)){return true;}
    
    }
    else {

        if (numericInputIsValid(targetAmountInputField.value) &&
            numericInputIsValid(percentageOfStudentsMetTargetInputField.value)){return true;}

    }

    return false;
}




//Checks if all inpiut fields (text based) has some form of input.
//It also handles when the togglepercentageStudentsMetButtton is checked or not.
function allTextInputFieldsFilled(inputFields) {

    const targetAmountInputField = inputFields.targetAmountElement;
    const numberOfStudentsInputField = inputFields.numberOfStudentsElement;
    const numberOfStudentsMetTargetInputField = inputFields.numberOfStudentsMetTargetElement;
    const percentageOfStudentsMetTargetInputField = inputFields.percentageOfStudentMeTargetElement;
    const resultInputField = inputFields.resultTextBoxElement;
    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");
    

    if (togglepercentageStudentsMetButtton.checked == false) {
    
        if (isEmptyString(targetAmountInputField.value) ||
            isEmptyString(numberOfStudentsInputField.value) ||
            isEmptyString(numberOfStudentsMetTargetInputField.value) ||
            isEmptyString(resultInputField.value)) {
        
            return false;
        }

    }
    else {

        if (isEmptyString(targetAmountInputField.value) ||
            isEmptyString(percentageOfStudentsMetTargetInputField.value) ||
            isEmptyString(resultInputField.value)) {
        
            return false;
        }
        
    }

    return true;
}




//Returns a Boolean that tells us whether
//all selectors are selected and all input fields have some form of input or not.
function allInputFieldsFilled(inputFields) {

    if (allInputSelectorsSelected(inputFields) && allTextInputFieldsFilled(inputFields)) return true;

    return false;
}



//Finds all unselected selector elements on the input modal and returns them in an array. 
function getAllUnselectedSelectors(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const unfilledInputFields = [];
    
    const inputSelectors = [
        inputFields.sloSelector,
        inputFields.measureSelector,
        inputFields.targetSlector
    ];

    for (let currSelector of inputSelectors) {
        const defaultSelectorValue = currSelector.options[0].text;
        const selectorValue = currSelector.options[currSelector.selectedIndex].text;
            
        if (defaultSelectorValue == selectorValue) {
            unfilledInputFields.push(currSelector);
        }

    }

    return unfilledInputFields;
}



//Gets all unfilled input field elements and returns them in an array.
function getAllUnfilledTextFields(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const unfilledInputFields = [];
    const emptyString = "";
    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");

    const inputTextFields = (togglepercentageStudentsMetButtton.checked == false) ? [
        inputFields.targetAmountElement,
        inputFields.numberOfStudentsElement,
        inputFields.numberOfStudentsMetTargetElement,
        inputFields.resultTextBoxElement
    ] : [
        inputFields.targetAmountElement,
        inputFields.percentageOfStudentMeTargetElement,
        inputFields.resultTextBoxElement
       ];


    for (let currTextField of inputTextFields) {
            
        const currTextFieldValue = currTextField.value;

        if (currTextFieldValue == emptyString || currTextFieldValue.trim() == emptyString) {
            
            unfilledInputFields.push(currTextField);

        }   

    }

    return unfilledInputFields;
}



//Gets all unfilled test field elments and returns them in an array.
function getAllFilledTextFields(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const filledInputFields = [];
    const emptyString = "";
    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");
    
    const inputTextFields = (togglepercentageStudentsMetButtton.checked == false) ? [
        inputFields.targetAmountElement,
        inputFields.numberOfStudentsElement,
        inputFields.numberOfStudentsMetTargetElement,
        inputFields.resultTextBoxElement
    ] : [
        inputFields.targetAmountElement,
        inputFields.percentageOfStudentMeTargetElement,
        inputFields.resultTextBoxElement
    ];


    for (let currTextField of inputTextFields) {
           
        const currTextFieldValue = currTextField.value;

        if (currTextFieldValue != emptyString || currTextFieldValue.trim() != emptyString) {
            
            filledInputFields.push(currTextField);

        }   

    }

    return filledInputFields;
}




//Reveals the error of a selector where they haven't selected something besides the default option.
function revealUnselectedSelectorError(selector) {

    if (selector == null) return null;

    selector.style.borderColor = "#dc3545";

    const parentNode = selector.parentElement;
    const unfilledErrorContainer = parentNode.children[1];

    unfilledErrorContainer.style.display = "flex";

}



//Reveals and error for input field elements that have not been filled with any input.
function revealUnfilledInputFieldError(inputField) {
    
    if (inputField == null) return null;

    inputField.style.borderColor = "#dc3545";

    const parentNode = inputField.parentElement;
    const unfilledErrorContainer = parentNode.children[2];

    unfilledErrorContainer.style.display = "flex";

}




//reveals any unfilled selector errors. 
function showErrorUnfilledInputFields(inputFields) {

    const unfilledSelectors = getAllUnselectedSelectors(inputFields);
    const unfilledTextFields = getAllUnfilledTextFields(inputFields);


    unfilledSelectors.forEach(revealUnselectedSelectorError);
    unfilledTextFields.forEach(revealUnfilledInputFieldError);
}



//Hides the unfilled selector errors 
function hideErrorUnfilledInputFields(inputFields) {
    
    const filledTextFields = getAllFilledTextFields(inputFields);

    filledTextFields.forEach(hideUnfilledTextFieldError);

}



//Hides the invalid Input field errors
function hideErrorInvalidInputFields(inputFields) {
    
    const invalidInputFields = getAllValidInputFields(inputFields);

    invalidInputFields.forEach(hideInvalidTextFieldError);
    
}



//Returns an array of all the input field elements that currently have invalid inputs in them.
function getAllInvalidInputFields(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const invalidInputFields = [];
    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");
    
    const numericTextFields = (togglepercentageStudentsMetButtton.checked == false) ? [
        inputFields.targetAmountElement,
        inputFields.numberOfStudentsElement,
        inputFields.numberOfStudentsMetTargetElement,
    ] : [
        inputFields.targetAmountElement,
        inputFields.percentageOfStudentMeTargetElement,

    ];


    for (let currNumericTextField of numericTextFields) {

        const currNumericTextFieldValue = currNumericTextField.value;

        if (!isEmptyString(currNumericTextFieldValue)) {

            if (!numericInputIsValid(currNumericTextFieldValue)) {

                invalidInputFields.push(currNumericTextField);
            }
            
        }

    }

    return invalidInputFields;

}




//Returns an array of all the input field elements that currently have valid inputs in them.
function getAllValidInputFields(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const validInputFields = [];
    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");
    
    const numericTextFields = (togglepercentageStudentsMetButtton.checked == false) ? [
        inputFields.targetAmountElement,
        inputFields.numberOfStudentsElement,
        inputFields.numberOfStudentsMetTargetElement,
    ] : [
        inputFields.targetAmountElement,
        inputFields.percentageOfStudentMeTargetElement,

    ];


    for (let currNumericTextField of numericTextFields) {

        const currNumericTextFieldValue = currNumericTextField.value;

        if (!isEmptyString(currNumericTextFieldValue)) {

            if (numericInputIsValid(currNumericTextFieldValue)) {

                validInputFields.push(currNumericTextField);
            }
            
        }

    }

    return validInputFields;

}



//Displays any invalid input errors.
function revealInvalidInputError(inputField) {

    if (inputField == null) return null;

    inputField.style.borderColor = "#dc3545";

    const parentNode = inputField.parentElement;

    const invalidErrorContainer = parentNode.children[3];

    invalidErrorContainer.style.display = "flex";

}



//Shows the error for all input fields with invalid errors.
function showErrorInvalidInputFields(inputFields) {

    const invalidInputFields = getAllInvalidInputFields(inputFields);
    invalidInputFields.forEach(revealInvalidInputError);

}



//Starts the animations of what should happend after information is saved correctly.
async function saveTransition(inputFields,dashboardLogo,loadingElement,messageArea) {
    
    await closeInputModal();
    await hideDashboardLogo(dashboardLogo);
    await displayLoadingAnimation(loadingElement);
    await revealMessageArea(messageArea);

    setTimeout(async () => {
        await hideMessageArea(messageArea);
        await displayLoadingAnimation(loadingElement);
        await revealDashboardLogo(dashboardLogo);
        await clearAllInputModalData(inputFields);
        
    }, 5200);

}



//Hides all previous input field errors and then shows any new input field errors. 
function updateAllInputFieldErrors(inputFields) {

    hideErrorUnfilledInputFields(inputFields);
    hideErrorInvalidInputFields(inputFields);
    showErrorUnfilledInputFields(inputFields);
    showErrorInvalidInputFields(inputFields);

}



//Generates the object that we will input into the database, based on the input recieved.
function generateInputData(inputFields) {

    let data = {};

    const togglepercentageStudentsMetButtton = document.querySelector("#flexSwitchStudentPercentageCheck");
    const targetAmountInputField = inputFields.targetAmountElement;
    const numberOfStudentsInputField = inputFields.numberOfStudentsElement;
    const numberOfStudentsMetTargetInputField = inputFields.numberOfStudentsMetTargetElement;
    const percentageOfStudentsMetTargetInputField = inputFields.percentageOfStudentMeTargetElement;
    const resultInputField = inputFields.resultTextBoxElement;
    const targetAmount = targetAmountInputField.value;
    const descriptionValue = resultInputField.value;


    if (togglepercentageStudentsMetButtton.checked) {//toggle percentage of students met switch is checked.

        const percentageMet = percentageOfStudentsMetTargetInputField.value;

        data = {

            target: targetAmount,
            num_student: -1,
            num_student_met: -1,
            percentage: percentageMet,
            description: descriptionValue    

        };

    }
    else {//it is not checked

        const numberOfStudents = numberOfStudentsInputField.value;
        const numberOfStudentsMetTarget = numberOfStudentsMetTargetInputField.value;

        const percentageMetComputation = (parseInt(numberOfStudents) / parseInt(numberOfStudentsMetTarget)) * 100;
    

        data = {

            target: targetAmount,
            num_student: numberOfStudents,
            num_student_met: numberOfStudentsMetTarget,
            percentage: percentageMetComputation,
            description: descriptionValue
                
        };

    }

    return data;
}



//Creates a post request and pots the data in to the database and runs the save animation.
function postDataToDB(options, inputFields, dashboardLogo, loadingElement, confirmationMessageArea, errorMessageArea) {
                
    axios(options).then((response) => {
    
        saveTransition(inputFields, dashboardLogo, loadingElement, confirmationMessageArea);
        
    }).catch((error) => {
            
        const status = error.response.status;
        const genericMessage = error.message;

        saveTransition(inputFields, dashboardLogo, loadingElement, errorMessageArea);
        printErrorToConsole(status, genericMessage);
        
    });

}



//Creates a put request and puts the data into the database and runs the save animation.
function putDataToDB(options, inputFields, dashboardLogo, loadingElement, confirmationMessageArea, errorMessageArea) {
        
    axios(options).then((response) => {//handle what happends next based on status
        
        saveTransition(inputFields, dashboardLogo, loadingElement, confirmationMessageArea);

    }).catch((error) => {
        
       const status = error.response.status;
       const genericMessage = error.message;

       saveTransition(inputFields, dashboardLogo, loadingElement, errorMessageArea);
       printErrorToConsole(status, genericMessage);
        
    });

}



//Prints detailed error message to console based on status passed in.
//If the status isn't a 400 or 500 then a generic message is printed.
function printErrorToConsole(status, genericMessage) {
    
    if (isValid400Error(status)) {

            console.log(getErrorResponse400(status));

        }
        else if (isValid500Error(status)) {
            
            console.log(getErrorResponse500(status));

        }
        else {
            
            console.log(genericMessage);

        }

}



//Close input modal event listener
closeInputModalButton.addEventListener("click", () => {

    resetAllActiveInputFieldErrors(inputFields);
    clearAllInputModalData(inputFields);
    hideAllInputModalSelectorErrors(inputFields.sloSelector, inputFields.measureSelector, inputFields.targetSlector);
    closeInputModal();
      
});



//Save button event listener
saveButton.addEventListener("click", async () => {

    //If all input fields are filled and all have valid input.
    if (allInputFieldsFilled(inputFields) && allInputFieldsHasValidInput(inputFields))  {
 
        const sloSelectorInputModal = inputFields.sloSelector;
        const measureSelectorInputModal = inputFields.measureSelector;

        const currentSloSelectorValue = sloSelectorInputModal.options[sloSelectorInputModal.selectedIndex].text;
        const currentMeasureSelectorValue = measureSelectorInputModal.options[measureSelectorInputModal.selectedIndex].text;

        const currentDate = modalInputAcademicTermTag.textContent;

        const targetSelectorInputModal = inputFields.targetSlector;
        const currentTargetSelectorValue = targetSelectorInputModal.options[targetSelectorInputModal.selectedIndex].text;

        //Values are split into and array of string and they are initailized in our variables.
        const [action, target] = currentTargetSelectorValue.split(" ");
    
         //create function that generates the put/post data and returns that object based on toggle . generateInputData();// handle the toggle option too somewhere , maybe the get request.
        const dataEntry = generateInputData(inputFields);
        
        
        if (action == "Add") {

            //POST
            const options = {//keep options here get 

                url: `http://127.0.0.1:8000/input/${currentSloSelectorValue}/${currentMeasureSelectorValue}/${target}/${currentDate}`,

                method: 'POST',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },

                data: dataEntry

            };
            

            postDataToDB(options, inputFields, dashboardLogo, loadingElement, confirmationMessageArea, errorMessageArea);


        }
        else {

             //PUT
            const options = {

                url:` http://127.0.0.1:8000/edit/${currentSloSelectorValue}/${currentMeasureSelectorValue}/${target}/${currentDate}`,
                
                method: 'PUT',
                
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },

                data: dataEntry

            };
            
            putDataToDB(options,inputFields,dashboardLogo,loadingElement,confirmationMessageArea, errorMessageArea);

        }       

    }
    else {

        updateAllInputFieldErrors(inputFields);

    }       

});


export { revealUnselectedSelectorError,hideUnselectedSelectorError}