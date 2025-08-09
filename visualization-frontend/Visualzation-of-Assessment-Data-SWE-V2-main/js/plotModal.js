import {hideUnselectedSelectorError} from '/js/inputting.js';

const allSloURL = 'http://127.0.0.1:8000/slo/all';


////////////////////////////////Plot Modal Selector Elements////////////////////////
const modalPlotSloSelector = document.getElementById('SLO-selector-plt');
const modalPlotMeasureSelector = document.getElementById('measure-selector-plt');
const modalPlotStartDateSelector = document.getElementById('start-selector-plt');
const modalPlotEndDateSelector = document.getElementById('end-selector-plt');
///////////////////////////////////////////////////////////////////////////////////


//////////////////////SLO description textbox & textbox container//////////////////
const modalPlotSloDescriptionContainer = document.getElementById('description-container-SLO-plt');
const modalPlotSloDescriptionTextbox = document.getElementById('modal-SLO-description-plt');
///////////////////////////////////////////////////////////////////////////////////


////////////////////Measure description textbox & textbox container////////////////
const modalPlotMeasureDescriptionContainer = document.getElementById('description-container-measure-plt');
const modalPlotMeasureDescriptionTextbox = document.getElementById('modal-measure-description-plt');
///////////////////////////////////////////////////////////////////////////////////



//Adds options to selector element i.e (SLO, Measure or Start date Selectors).
function addOptionToSelectorElement(contents, count, selectorElement) {
    
    let tempOption = document.createElement('option');
    tempOption.value = count;
    tempOption.textContent = contents;
    
    selectorElement.appendChild(tempOption);

}



//Loads SLO Selector with all current SLO Values i.e S1, S2 etc.
function loadSloSelector(allSloURL,sloSelector) {

    axios.get(allSloURL).then(response => {

        const slos = response.data;
        let count = 1;

        slos.forEach((slo) => {

            addOptionToSelectorElement(slo, count, sloSelector);
            count += 1;  

        });

    }).catch((error) => {

        const status = error.response.status;
        const genericMessage = error.message;
        alertUserOnApiCallError(status, genericMessage);

    });
    
}



//Loads measure selector with measures bases on url (endpoint)
function loadMeasureSelector(measureUrl,measureSelector) {

    axios.get(measureUrl).then(response => {

        if (response.status) {

            let count = 1;
            const measures = response.data;

            measures.forEach((measure) => {
                
                if (measure != "description") {

                    addOptionToSelectorElement(measure, count, measureSelector);
                    count += 1;

                }

            });

            measureSelector.selectedIndex = 0;
        }
    }).catch((error) => {

        const status = error.response.status;
        const genericMessage = error.message;
        alertUserOnApiCallError(status, genericMessage);

    });
}



//Loads start date selector with dates bases on url (endpoint)
function loadStartDateSelector(startDatesUrl) {

    axios.get(startDatesUrl).then(response => {
           
        if (response.status) {
                
            let count = 1;
            const dates = response.data;

            dates.forEach((date) => {
                    
                addOptionToSelectorElement(date, count, modalPlotStartDateSelector);
                count += 1;
            });
            
        }

    }).catch((error) => {

        const status = error.response.status;
        const genericMessage = error.message;
        alertUserOnApiCallError(status, genericMessage);

    });

}



//Loads end date selector with dates bases on url (endpoint)
function loadEndDateSelector(endDatesUrl) {
    
    axios.get(endDatesUrl).then(response => {

        let count = 1;
        const dates = response.data;

        dates.forEach((date) => {

            addOptionToSelectorElement(date, count, modalPlotEndDateSelector);
            count += 1;
            
        });

    }).catch((error) => {

        const status = error.response.status;
        const genericMessage = error.message;
        alertUserOnApiCallError(status, genericMessage);

    });

}



//Loads SLO description textbox with the description for a specific SLO.
function loadSloDescription(selectedSlo,sloDescriptionTextbox,sloDescriptionContainer) {

    let sloDescriptionUrl = `http://127.0.0.1:8000/slo/description/${selectedSlo}`;

    axios.get(sloDescriptionUrl).then(response => { 

        sloDescriptionTextbox.value = `SLO Description: ${response.data}`;
        sloDescriptionTextbox.style.height = "auto";
        sloDescriptionContainer.style.display = "flex";
        
    }).catch((error) => {

        const status = error.response.status;
        const genericMessage = error.message;
        alertUserOnApiCallError(status, genericMessage);

    });
    
}



//Loads Measure Description textbox with the description of a specific measure.
function loadMeasureDescription(selectedSlo, selectedMeasure,measureDescriptionTextbox, measureDescriptionContainer) {
    
    let measureDescriptionUrl = `http://127.0.0.1:8000/measure/description/${selectedSlo}/${selectedMeasure}`;

    axios.get(measureDescriptionUrl).then(response => {
            
        measureDescriptionTextbox.value = `Measure Description: ${response.data}`;
        measureDescriptionTextbox.style.height = "auto";
        measureDescriptionContainer.style.display = "flex";

    }).catch((error) => {

        const status = error.response.status;
        const genericMessage = error.message;
        alertUserOnApiCallError(status, genericMessage);

    });
 
}



//Clears Measure selector and adds default option "Choose Measure".
function clearPlotMeasureSelector(modalPlotMeasureSelector) {

    modalPlotMeasureSelector.textContent = null;

    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Measure";

    modalPlotMeasureSelector.appendChild(tempOption);

}



//Clears Start Date selector and adds default option "Start Date".
function clearPlotStartDateSelector(modalPlotStartDateSelector) {

    modalPlotStartDateSelector.textContent = null;

    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose Start Date";

    modalPlotStartDateSelector.appendChild(tempOption);

}



//Clears End Date selector and adds default option "End Date".
function clearPlotEndDateSelector(modalPlotEndDateSelector) {

    modalPlotEndDateSelector.textContent = null;

    let tempOption = document.createElement('option');
    tempOption.value = 0;
    tempOption.textContent = "Choose End Date";
   
    modalPlotEndDateSelector.appendChild(tempOption);

}



//Plot modal SLO selector event listener.
modalPlotSloSelector.addEventListener('change', () => {

    hideUnselectedSelectorError(modalPlotSloSelector);

    const currentSelectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;

    const measureUrl = `http://127.0.0.1:8000/measure/${currentSelectedSlo}`;

    clearPlotMeasureSelector(modalPlotMeasureSelector);
    clearPlotStartDateSelector(modalPlotStartDateSelector);
    clearPlotEndDateSelector(modalPlotEndDateSelector);
    
    modalPlotMeasureSelector.options[0].setAttribute("disabled","disabled");
    modalPlotMeasureDescriptionContainer.style.display = "none";

    loadMeasureSelector(measureUrl,modalPlotMeasureSelector);
    loadSloDescription(currentSelectedSlo,modalPlotSloDescriptionTextbox,modalPlotSloDescriptionContainer);
    
});



//Plot modal measure selector event listener.
modalPlotMeasureSelector.addEventListener('change', () => {

    hideUnselectedSelectorError(modalPlotMeasureSelector);
    clearPlotStartDateSelector(modalPlotStartDateSelector);
    clearPlotEndDateSelector(modalPlotEndDateSelector);

    const selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

    if (selectedMeasure != "Choose Measure") {
       
        const currentSelectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;
   
        const startDatesUrl = `http://127.0.0.1:8000/dates/${currentSelectedSlo}/${selectedMeasure}`;

        loadStartDateSelector(startDatesUrl);

        modalPlotStartDateSelector.selectedIndex = 0;
        modalPlotStartDateSelector.options[0].setAttribute("disabled", "disabled");

        loadMeasureDescription(currentSelectedSlo,selectedMeasure,modalPlotMeasureDescriptionTextbox,modalPlotMeasureDescriptionContainer);
        
    }

});



//Plot modal start date selector event listener.
modalPlotStartDateSelector.addEventListener('change', () => {

    hideUnselectedSelectorError(modalPlotStartDateSelector);

    clearPlotEndDateSelector(modalPlotEndDateSelector);

    const selectedStartDate = modalPlotStartDateSelector.options[modalPlotStartDateSelector.selectedIndex].textContent;
    
    if (selectedStartDate != "Choose Start Date") { 
        
        const currentSelectedSlo = modalPlotSloSelector.options[modalPlotSloSelector.selectedIndex].textContent;

        const selectedMeasure = modalPlotMeasureSelector.options[modalPlotMeasureSelector.selectedIndex].textContent;

        const endDatesUrl = `http://127.0.0.1:8000/startdate/${currentSelectedSlo}/${selectedMeasure}?start=${selectedStartDate}`;

        
        loadEndDateSelector(endDatesUrl);
        modalPlotEndDateSelector.selectedIndex = 0;
        modalPlotEndDateSelector.options[0].setAttribute("disabled", "disabled");

    }

});



//On Change event listener.
modalPlotEndDateSelector.addEventListener('change', () => {
    
    hideUnselectedSelectorError(modalPlotEndDateSelector);
    
});



//Window on load event listener
window.addEventListener("load", () => {

    loadSloSelector(allSloURL,modalPlotSloSelector);

});



// Gets the error message for 400 type response errors. 
function getErrorResponse400(code) {

    let message = '';
    
    if (code == 400) {
        message = `400 Bad Request – client sent an invalid request, such as lacking required request body or parameter`;
    }
    else if (code == 401) {
        message = `401 Unauthorized – client failed to authenticate with the server`;
    }
    else if (code == 403) {
        message = `403 Forbidden – client authenticated but does not have permission to access the requested resource`;
    }
    else if (code == 404) {
        message = `404 Not Found – the requested resource does not exist`;
    }
    else if (code == 412) {
        message = `412 Precondition Failed – one or more conditions in the request header fields evaluated to false`;
    }
    
    return message;
}



//Gets the error message 500 type response errors 
function getErrorResponse500(code) {
    
    let message = '';
    
    if (code == 500) {

        message = `500 Internal Server Error – a generic error occurred on the server`;

    }
    else if (code == 503) {
        
        message = `503 Service Unavailable – the requested service is not available`;

    }

    return message;

}



//Check if response code is an identifiable 400 error.
function isValid400Error(code) {

    if ((code == 400) || (code == 401) || (code == 403) || (code == 404) || (code == 412)) {
        return true;
    }
   
    return false;
}



//Check if response code is an identifiable 500 error.
function isValid500Error(code) {
    
    if ((code == 500) || (code == 503)) {
        
        return true;
    }

    return false 
}



//Alerts user if there is a request error.
function alertUserOnApiCallError(status, genericMessage) {//add to other api calls
    
    if (isValid400Error(status)) {
            const message400 = getErrorResponse400(status);
            alert(message400);
        }
    else if (isValid500Error(status)) {
            const message500 = getErrorResponse500(status);
            alert(message500);
        }
    else {
            alert(`${genericMessage}`);
    }

}



export { addOptionToSelectorElement, loadSloSelector,loadMeasureSelector,loadSloDescription,loadMeasureDescription,clearPlotMeasureSelector,clearPlotStartDateSelector,clearPlotEndDateSelector,modalPlotSloDescriptionContainer,modalPlotMeasureDescriptionContainer,isValid500Error,isValid400Error,getErrorResponse500,getErrorResponse400};