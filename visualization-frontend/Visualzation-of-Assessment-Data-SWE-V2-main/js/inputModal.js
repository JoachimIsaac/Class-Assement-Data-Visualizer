import {addOptionToSelectorElement,loadSloSelector,loadMeasureSelector,loadSloDescription,loadMeasureDescription} from "/js/plotModal.js"; 


const allSloURL = 'http://127.0.0.1:8000/slo/all';



////////////////////////////////// Input Field Containers/////////////////////////////
const numberOfStudentsContainer = document.getElementById('number-of-students-container');
const numberOfStudentsMetContainer = document.getElementById('number-of-students-met-container');
const percentageOfStudentsContainer = document.getElementById('percentage-of-students-met-container');
//////////////////////////////////////////////////////////////////////////////////////


////////////////////////////Input Modal Selector Elements/////////////////////////////
const modalInputSloSelector = document.getElementById('SLO-selector-data');
const modalInputMeasureSelector = document.getElementById('measure-selector-data');
const modalInputTargetSelector = document.getElementById('SLO-selector-target');
//////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////// Description Conatiners////////////////////////////////
const modalInputSloDescriptionContainer = document.getElementById('modal-SLO-description-data');
const modalInputMeasureDescriptionContainer = document.getElementById('modal-measure-description-data');
///////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////TextBox Elements /////////////////////////////////
const modalInputSloDescriptionTextBox = document.getElementById('modal-SLO-description-data');
const modalInputMeasureDescriptionTextbox = document.getElementById('modal-measure-description-data');
///////////////////////////////////////////////////////////////////////////////////////


const modalInputAcademicTermTag = document.getElementById('current-academic-year-tag');
const studentPecentageCheckSwitch = document.getElementById('flexSwitchStudentPercentageCheck');



//Returns current school term based on date and month passed.
function getCurrentSchoolTerm(currentMonth,currentYear){
    
    if (typeof (currentMonth) != "number" || typeof (currentYear) != "number") return "";

    if (currentMonth >= 13 || currentMonth < 1 || currentYear > 2200 || currentYear < 1992) return "";
    
    const MAY = 5;
    currentMonth = parseInt(currentMonth);
    currentYear = parseInt(currentYear);

  
    if(currentMonth < MAY){
        
        let startYear = currentYear-1;
        let endYear = currentYear;
        
        startYear = startYear.toString();
        endYear = endYear.toString();

        startYear = startYear.slice(2,4);
        endYear = endYear.slice(2,4);

        return `${startYear}-${endYear}`; 
        
    }
    else{
        
        let startYear = currentYear;
        let endYear = currentYear+1;
        
        startYear = startYear.toString();
        endYear = endYear.toString();

        startYear = startYear.slice(2,4);
        endYear = endYear.slice(2,4);

        return `${startYear}-${endYear}`;
    }
    
}



//Loads the academic year term tag with the current academic year.
function loadAcademicTermTag(modalInputAcademicTermTag) {

    const date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    modalInputAcademicTermTag.textContent = getCurrentSchoolTerm(currentMonth,currentYear); 
    
}



//Hides the error associated with a specifc selector element
function hideUnselectedSelectorError(selector) {

    if (selector == null) return null;

    selector.style.borderColor = "#0d6efd";

    const parentNode = selector.parentElement;
    const unfilledErrorContainer = parentNode.children[1];

    unfilledErrorContainer.style.display = "none";

}



//Set the slo selected  option to default option and hides description box.
function clearInputSloSelector(modalInputSloSelector) {

    modalInputSloSelector.selectedIndex = 0;

    modalInputSloDescriptionContainer.style.display = "none";

}



//Empties options, loads the default option and hides description box for the measure selector.
function clearInputMeasureSelector(modalInputMeasureSelector) {

    modalInputMeasureSelector.textContent = null;

    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Measure";

    modalInputMeasureSelector.appendChild(tempOption);
    modalInputMeasureDescriptionContainer.style.display = "none";

    tempOption.disabled = true;

}



//Empties options, loads the default option and hides description box for the target selector.
function clearInputTargetSelector(modalInputTargetSelector) {

    modalInputTargetSelector.textContent = null;

    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Target";
  
    modalInputTargetSelector.appendChild(tempOption);
    
}



//Loads the selector with SLO data e.i S1, S2, S3 etc.
function loadInputSloSelector(allSloURL, modalInputSloSelector) {

    loadSloSelector(allSloURL, modalInputSloSelector);

}



//Loads the SLO description box with a SlO's descritpion.
function loadSloDescriptionData(selectedSlo,sloDescriptionTextbox,sloDescriptionContainer) { 

    loadSloDescription(selectedSlo, sloDescriptionTextbox, sloDescriptionContainer);

}



//Loads the measure description box with a Measure's descritpion.
function loadMeasureDescriptionData(selectedSlo, selectedMeasure) {

    loadMeasureDescription(selectedSlo, selectedMeasure, modalInputMeasureDescriptionTextbox, modalInputMeasureDescriptionContainer);

}



//Hides all selector errors on the input modal.
function hideAllInputModalSelectorErrors(sloSelector, measureSelector, targetSelector) {
    
    hideUnselectedSelectorError(sloSelector);
    hideUnselectedSelectorError(measureSelector);
    hideUnselectedSelectorError(targetSelector);

}



//On change event event listener for modal input SLO selector.
//Which loads the Measure selector based on the previously selected slo.
modalInputSloSelector.addEventListener('change', () => {
    
    clearInputMeasureSelector(modalInputMeasureSelector);
    clearInputTargetSelector(modalInputTargetSelector);
    hideUnselectedSelectorError(modalInputSloSelector);
    
   let selectedSlo = modalInputSloSelector.options[modalInputSloSelector.selectedIndex].textContent;

    if (selectedSlo != "Choose SLO") {

        let measureUrl = `http://127.0.0.1:8000/measure/${selectedSlo}`;

        loadMeasureSelector(measureUrl, modalInputMeasureSelector);
        loadSloDescriptionData(selectedSlo, modalInputSloDescriptionTextBox, modalInputSloDescriptionContainer);
        
    }

});



//On change event event listener for modal input Measure selector.
//Which loads the target selector based on the the previously selected slo and measure.
modalInputMeasureSelector.addEventListener('change',() => {

    clearInputTargetSelector(modalInputTargetSelector);
    hideUnselectedSelectorError(modalInputMeasureSelector);

    const selectedSlo = modalInputSloSelector.options[modalInputSloSelector.selectedIndex].textContent;
    const selectedMeasure = modalInputMeasureSelector.options[modalInputMeasureSelector.selectedIndex].textContent;
    

    if (selectedMeasure!= "Choose Measure") {
        
        const currentDate = modalInputAcademicTermTag.textContent;

        let measureUrl = `http://127.0.0.1:8000/input/options/${selectedSlo}/${selectedMeasure}/${currentDate}`;

        axios.get(measureUrl).then(response => {

            const targets = response.data;
            let count = 1;
            
            targets.forEach((target) => {

                addOptionToSelectorElement(target, count, modalInputTargetSelector);
                count += 1;
                
            });   

        });

        modalInputTargetSelector.selectedIndex = 0;
        modalInputTargetSelector.options[0].setAttribute("disabled", "disabled");

        modalInputMeasureDescriptionContainer.style.display = "flex";
        loadMeasureDescriptionData(selectedSlo, selectedMeasure);

    }

});



//On change event listener for the target selector element.
//When target selector is changed and there is an unslected error displayed the error is removed.
modalInputTargetSelector.addEventListener('change', () => {

    hideUnselectedSelectorError(modalInputTargetSelector);
    
});



//Event listener for switch that hides the input between the number of 
//students & number of students that Met inputfields) & the 
//percentage of students that met the target inputfield.
studentPecentageCheckSwitch.addEventListener('change', () => {

    if (studentPecentageCheckSwitch.checked) {

        numberOfStudentsContainer.style.display = "none";
        numberOfStudentsMetContainer.style.display = "none";
        percentageOfStudentsContainer.style.display = "flex";

    }
    else {

        numberOfStudentsContainer.style.display = "flex";
        numberOfStudentsMetContainer.style.display = "flex";
        percentageOfStudentsContainer.style.display = "none";

    }

});



//OnLoad window event, loads SLO selector and the academic term tag.
window.addEventListener("load",  ()=> {
  loadAcademicTermTag(modalInputAcademicTermTag);
  loadInputSloSelector(allSloURL, modalInputSloSelector);
});


//All exportable functions to be reused. 
export {clearInputSloSelector,modalInputSloSelector,clearInputMeasureSelector,modalInputMeasureSelector,clearInputTargetSelector,modalInputTargetSelector,loadInputSloSelector,allSloURL,hideAllInputModalSelectorErrors,modalInputAcademicTermTag};