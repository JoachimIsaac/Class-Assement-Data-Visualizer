import { clearPlotMeasureSelector, clearPlotStartDateSelector, clearPlotEndDateSelector, modalPlotSloDescriptionContainer, modalPlotMeasureDescriptionContainer} from '/js/plotModal.js';

import {revealUnselectedSelectorError,} from '/js/inputting.js';
import {clearInputSloSelector } from "/js/inputModal.js";


//Resets selected SLO to it's default selection.
var clearPlotSloSelector = clearInputSloSelector;

const dashboardLogo = document.getElementById('dashboard-logo');
const chartContainer = document.getElementById('chart-div');
const loadingElement = document.getElementById('loading-element');


///////////////////////////////////////////////Plotting Modal Elements////////////////////////////////////
const closeButton = document.querySelector("#plottingModal > div > div > div.modal-header > button")
const plottingModalPlotButton  = document.getElementById('plotting-button');
const plottingModalCloseButton = document.querySelector("#plottingModal > div > div > div.modal-footer > button.btn.btn-secondary");
const sloSelectorElement = document.getElementById('SLO-selector-plt');
const measureSelectorElement = document.getElementById('measure-selector-plt');
const startDateSelectorElement = document.getElementById('start-selector-plt');
const endDateSelectorElement = document.getElementById('end-selector-plt');
const plotSettingsContainer = document.getElementById('settings-container');
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////Options Containers For Radio Buttons On Plot Setttings//////////////////////////
const targetPlotOptionButtonBoth = document.querySelector("#settings-container > div.option.\\31 ");
const targetPlotOptionButtonT1 = document.querySelector("#settings-container > div.option.\\32 ");
const targetPlotOptionButtonT2 = document.querySelector("#settings-container > div.option.\\33 ");
const targetPlotColorOptionButtonT1 = document.querySelector("#settings-container > div.option.t1.color");
const targetPlotColorOptionButtonT2 = document.querySelector("#settings-container > div.option.t2.color");
/////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////// Radio Buttons On Plot Settings/////////////////////////////////////
const targetPlotRadioButtonBoth = document.querySelector("#\\=target-radio-1");
const targetPlotRadioButtonT1 = document.querySelector("#\\=target-radio-2");
const targetPlotRadioButtonT2 = document.querySelector("#\\=target-radio-3");
const targetPlotColorRadioButtonT1 = document.querySelector("#t1-color-selector");
const targetPlotColorRadioButtonT2 = document.querySelector("#t2-color-selector");
const pointSizeSelector = document.querySelector("#point-size-selector");
const lineSizeSelector = document.querySelector("#line-size-selector");
///////////////////////////////////////////////////////////////////////////////////////////////////////////


//plot based input fields, (all selector elments)
const inputFields = {
    sloSelector: sloSelectorElement,
    measureSelector: measureSelectorElement,
    startDateSelector: startDateSelectorElement,
    endDateSelector:endDateSelectorElement
};


//All elements that have to do with the display, logo, plot settings etc.
const displayElements = {

    dashboardLogo: dashboardLogo,
    plottingModalCloseButton: plottingModalCloseButton,
    chartContainer: chartContainer,
    loadingElement:loadingElement,
    plotSettingsContainer: plotSettingsContainer,
    targetPlotOptionButtonBoth: targetPlotOptionButtonBoth,
    targetPlotOptionButtonT1:targetPlotOptionButtonT1,
    targetPlotOptionButtonT2: targetPlotOptionButtonT2,
    targetPlotColorOptionButtonT2: targetPlotColorOptionButtonT2,
    targetPlotRadioButtonBoth: targetPlotRadioButtonBoth,
    targetPlotRadioButtonT1: targetPlotRadioButtonT1 

};


var chartObj; //Variable which holds the different instances of the graph.

google.load("visualization", "1", { packages: ["corechart"] });



// (i.e SLO, Measure) filters selectors based on the ones that are unselected and returns them in an array.
function getAllUnslectedSelectors(inputFields) {
    
    if (inputFields == null) {
        return [];
    }

    const unselectedInputSelectors = [];
    
    const inputSelectors = [
        inputFields.sloSelector,
        inputFields.measureSelector,
        inputFields.startDateSelector,
        inputFields.endDateSelector
    ];

    for (let currSelector of inputSelectors) {

        const defaultSelectorValue = currSelector.options[0].text;
        const selectorValue = currSelector.options[currSelector.selectedIndex].text;
            
        if (defaultSelectorValue == selectorValue) {

            unselectedInputSelectors.push(currSelector);

        }

    }

    return unselectedInputSelectors;
}



//Hides all selector errors SLO selector, measure Selector etc.
function hideAllSelectorErrors(sloSelector, measureSelector, startDateSelector, endDateSelector) {
    
    hideUnselectedSelectorError(sloSelector);
    hideUnselectedSelectorError(measureSelector);
    hideUnselectedSelectorError(startDateSelector);
    hideUnselectedSelectorError(endDateSelector);

}



//Hides the dashboard logo.
function hideDashboardLogo(dashboardLogo) {

    dashboardLogo.style.display = "none";

}



//Closes plotting modal.
function closePlottingModal() {
    
    closeButton.click();

}



//Hides both description text boxes (slo and measure).
function hideAllPlotSelectorDescriptions(sloSelectorDesContainer,measureSelectorDesContainer){

    sloSelectorDesContainer.style.display = 'none';
    measureSelectorDesContainer.style.display = 'none';

}



//Return all SLO selectors into their default state.
function clearPlotModalSelectors(inputFields) {
  
    clearPlotSloSelector(inputFields.sloSelector);
    clearPlotMeasureSelector(inputFields.measureSelector);
    clearPlotStartDateSelector(inputFields.startDateSelector,);
    clearPlotEndDateSelector(inputFields.endDateSelector);
    
}



//Displays the plot settings area.
function displayPlotSettingsArea(plotSettingsContainer) {

    plotSettingsContainer.style.display = "flex";

}



//Returns Boolean on whether the t1 button is checked or not.
function target1RadioButtonChecked(targetPlotRadioButtonT1) {

    if (targetPlotRadioButtonT1.checked) {
        
        return true;

    }

    return false;
    
}



//Returns a boolean on whether or not the both target button is checked.
function bothTargetsRadioButttonChecked(targetPlotRadioButtonBoth){

    if (targetPlotRadioButtonBoth.checked) {
        
        return true;

    }

    return false;

}



//Handles plotting when user selects a radio button that controls which targets should be plotted.
async function plotTransitionEditedTargets(plotDataUrl,displayElements) {
  
    //If chart container is filled 
    if (displayElements.chartContainer.children.length > 0) {

        await removeChartElement(displayElements.chartContainer);
        
    }
     
    await displayLoadingAnimation(displayElements.loadingElement);

    
    if (bothTargetsRadioButttonChecked(displayElements.targetPlotRadioButtonBoth)) {
        
        await plotChartWithBothTargets(plotDataUrl);

    }
    else {//If a single target radio button is checked

        //If T1 radio button is checked, plot for T1
        if (target1RadioButtonChecked(displayElements.targetPlotRadioButtonT1)) {
           
            await plotChartBasedOnTargets(plotDataUrl, "T1");

        }
        else {//otherwise plot for T2
            
            await plotChartBasedOnTargets(plotDataUrl, "T2");

        }

    }

    await displayChartElement(displayElements.chartContainer);
    
}



//Handles plotting when plotting both targets.
async function plotTransitionBothTargets(plotDataUrl,displayElements) {

    await hideDashboardLogo(displayElements.dashboardLogo);
   
    await closePlottingModal();
  
    //If chart container is filled 
    if (displayElements.chartContainer.children.length > 0) {

        await removeChartElement(displayElements.chartContainer);

    }
     
    await displayLoadingAnimation(displayElements.loadingElement);

    await plotChartWithBothTargets(plotDataUrl);

    await displayChartElement(displayElements.chartContainer);

    setTimeout(() => {//Displays plot settings area and the buttons which can edit charts

        displayPlotSettingsArea(displayElements.plotSettingsContainer);
        revealBothTargetRadioButton(displayElements.targetPlotOptionButtonBoth);
        revealTargetT1RadioButton(displayElements.targetPlotOptionButtonT1);
        revealTargetT2RadioButton(displayElements.targetPlotOptionButtonT2);
        revealTargetColorSelectorT2(displayElements.targetPlotColorOptionButtonT2);
        checkRadioButton(displayElements.targetPlotRadioButtonBoth);

    }, 2100);
    
}



//Handles plotting when there is only one target.
async function plotTransitionSingleTarget(plotDataUrl,displayElements) {
    
    await hideDashboardLogo(displayElements.dashboardLogo);
   
    await closePlottingModal();

    if (displayElements.chartContainer.children.length > 0) {

        await removeChartElement(displayElements.chartContainer);

    }

    await displayLoadingAnimation(displayElements.loadingElement);

    await plotChartBasedOnTargets(plotDataUrl, "T1");

    await displayChartElement(displayElements.chartContainer);

    setTimeout(() => {//Displays plotting area and hides all other options beside T1 options

        displayPlotSettingsArea(displayElements.plotSettingsContainer);
        hideBothTargetRadioButton(displayElements.targetPlotOptionButtonBoth);
        hideTargetT2RadioButton(displayElements.targetPlotOptionButtonT2);
        hideTargetColorSelectorT2(displayElements.targetPlotColorOptionButtonT2);
        checkRadioButton(displayElements.targetPlotRadioButtonT1);
        hideTargetT1RadioButton(displayElements.targetPlotOptionButtonT1);
    
    }, 2100);

}



//Handles plotting when a color is selected/changed.
async function plotTransitionEditedTargetColors(plotDataUrl,displayElements) {

    if (bothTargetsRadioButttonChecked(displayElements.targetPlotRadioButtonBoth)) {

        await plotChartWithBothTargets(plotDataUrl);

    }
    else {

        if (target1RadioButtonChecked(displayElements.targetPlotRadioButtonT1)) {

            await plotChartBasedOnTargets(plotDataUrl, "T1" );

        }
        else {

            await plotChartBasedOnTargets(plotDataUrl, "T2");
   
        }

    }

    await displayChartElement(displayElements.chartContainer);
    
}



//Handles plotting when the linesize of a target is selected/changed.
async function plotTransitonEditedGraphLineSize(plotDataUrl,displayElements) {

    if (bothTargetsRadioButttonChecked(displayElements.targetPlotRadioButtonBoth)) {

        await plotChartWithBothTargets(plotDataUrl);
       
    }
    else {

        if (target1RadioButtonChecked(displayElements.targetPlotRadioButtonT1)) {

            await plotChartBasedOnTargets(plotDataUrl, "T1");
        
        }
        else {

            await plotChartBasedOnTargets(plotDataUrl, "T2");
            
        }

    }

    await displayChartElement(displayElements.chartContainer);

}



//Handles plotting when the point size of a target is selected/changed.
async function plotTransitionEditedGraphPointSize(plotDataUrl,displayElements) {

    if (bothTargetsRadioButttonChecked(displayElements.targetPlotRadioButtonBoth)) {

        plotChartWithBothTargets(plotDataUrl);    
        
    }
    else {

        if (target1RadioButtonChecked(displayElements.targetPlotRadioButtonT1)) {

            await plotChartBasedOnTargets(plotDataUrl, "T1");
     
        }
        else {

            await plotChartBasedOnTargets(plotDataUrl, "T2");
            
        }

    }

    await displayChartElement(displayElements.chartContainer);

}
 



//Loads a 2D array with the data needed to plot the graph for both targets.
function loadDataTableBothTargets(plotDataObj){
    
    if (plotDataObj == null || typeof(plotDataObj) !== 'object' ) {

        return [];

    }


    const numberOfKeysInObj = Object.keys(plotDataObj).length;

    if (numberOfKeysInObj == 0){
        
        return [];
    
    }

    let result = [
      
      ['X', 'Percentage Met for T1', 'Percentage Met for T2', plotDataObj.mostRecentT1Des, plotDataObj.mostRecentT2Des]
      
    ];

    const cols = plotDataObj.dates.length;

    for (let index = 0; index < cols; index++){
      
      let rowArray = [];
      
        rowArray.push(plotDataObj.dates[index]);
        rowArray.push(plotDataObj.percentagesMetT1[index]);
        rowArray.push(plotDataObj.percentagesMetT2[index]);
        rowArray.push(plotDataObj.T1[index]);
        rowArray.push(plotDataObj.T2[index]);
        result.push(rowArray);
    }

    return result;
    
}



//Loads a 2D array with the data needed to plot the graph for a single target.
function loadDataTableBasedOnTargets(plotDataObj, target) {

    if (plotDataObj == null || typeof(plotDataObj) !== 'object' ) {

        return [];

    }


    const numberOfKeysInObj = Object.keys(plotDataObj).length;

    if (numberOfKeysInObj == 0){
        
        return [];
    
    }
    
    if (target == "T1") { 

        let result = [
        
            ['X','Percentage Met for T1',plotDataObj.mostRecentT1Des]
    
        ];
  

        const cols = plotDataObj.dates.length; 
 
        for(let index = 0; index < cols; index++){
            
            let rowArray = [];

            rowArray.push(plotDataObj.dates[index]);
            rowArray.push(plotDataObj.percentagesMetT1[index]);
            rowArray.push(plotDataObj.T1[index]);
            result.push(rowArray);

        }
        
        return result; 
            
    }
    else {
        
        

        let result = [

            ['X', 'Percentage Met for T2', plotDataObj.mostRecentT2Des]
            
        ];

        const cols = plotDataObj.dates.length; 

        for (let index = 0; index < cols; index++){
            
            let rowArray = [];
            
            rowArray.push(plotDataObj.dates[index]);
            rowArray.push(plotDataObj.percentagesMetT2[index]);
            rowArray.push(plotDataObj.T2[index]);
            
            result.push(rowArray);
        }

        return result;
    
    }

}



//Displays the element where the graph is rendered.
function displayChartElement(chartContainer) {

    chartContainer.style.display = "block";

}



//Removes the element that the chart is plotted on.
function removeChartElement(chartContainer) {

    let child = chartContainer.children[0];

    chartContainer.removeChild(child);
    chartContainer.style.display = 'none'; 

}



//Displays the T1 color selector in the settings section. 
function displayColorSelectorT1(targetPlotColorSelectorButtonT1) {

    targetPlotColorSelectorButtonT1.style.display = "block";

}



//Displays the T2 color selector in the settings section. 
function displayColorSelectorT2(targetPlotColorSelectorButtonT2) {

    targetPlotColorSelectorButtonT2.style.display = "block";

}



//Hides the T1 color selector in the settings section. 
function hideColorSelectorT1(targetPlotColorOptionButtonT1) { 

    targetPlotColorOptionButtonT1.style.display = "none";

}



//Hides the T2 color selector in the settings section. 
function hideColorSelectorT2(targetPlotColorOptionButtonT2) { 

    targetPlotColorOptionButtonT2.style.display = "none";

}



function plotChartWithBothTargets(requestUrl) {

    let t1Color = document.querySelector("#t1-color-selector").value;
    let t2Color = document.querySelector("#t2-color-selector").value;
    let pointSize = parseInt(document.querySelector("#point-size-selector").value);
    let lineSize = parseInt(document.querySelector("#line-size-selector").value);

    setTimeout(() => {

        let plottingDataObj;
        let pickedColors = [t1Color, t2Color];

        axios.get(requestUrl).then(response => {
        
        plottingDataObj = response.data;
  
       
        google.setOnLoadCallback(drawChart);

        function drawChart() {

            let data = google.visualization.arrayToDataTable(loadDataTableBothTargets(plottingDataObj));

            let options = {
                title: plottingDataObj.title,
                hAxis: { title: 'School Term', minValue: 0, maxValue: 15 },
                vAxis: { title: 'Percentage-met', minValue: 0, maxValue: 15 },
                legend: 'none',
                interpolateNulls: true,
                pointSize: pointSize,
                colors: pickedColors,
                
                series: {
                        0:{pointShape:{type:'square'}},
                        1:{pointShape:{type:'star', sides:5,dent:0.6}},
                        2: { lineWidth: lineSize, pointSize: 0 },
                        3:  { lineWidth: lineSize, pointSize: 0 }
                    },
                    width: '100%',
                    height: '100%',
                    backgroundColor: { fill: 'transparent' },
                    legend:'right'
            };

            chartObj = new google.visualization.ScatterChart(document.getElementById('chart-div'));
            chartObj.draw(data, options);   
        }
        
    });
        
    }, 2000);
   
}



//Plots based on the target that was passed in, T1 or T2 
function plotChartBasedOnTargets(requestUrl, target) {

    let t1Color = document.querySelector("#t1-color-selector").value;
    let t2Color = document.querySelector("#t2-color-selector").value;
    let pointSize = parseInt(document.querySelector("#point-size-selector").value);
    let lineSize = parseInt(document.querySelector("#line-size-selector").value);
    
    setTimeout(() => {
    
        let plottingDataObj;
        let pickedColors = target == "T1" ? [t1Color, t1Color] : [t2Color, t2Color];


    axios.get(requestUrl).then(response => {
        
        plottingDataObj = response.data;
      

        google.setOnLoadCallback(drawChartBasedOnTarget);

        function drawChartBasedOnTarget() {

            let data = google.visualization.arrayToDataTable(loadDataTableBasedOnTargets(plottingDataObj, target));
             
            let options = {
                
                title: plottingDataObj.title,
                hAxis: { title: 'School Term', minValue: 0, maxValue: 15 },
                vAxis: { title: 'Percentage-met', minValue: 0, maxValue: 15 },
                legend: 'none',
                interpolateNulls: true,
                pointSize: pointSize,
                colors: pickedColors,
                
                
                series: {
                    0:{pointShape:{type:'square'}},
                    1: { lineWidth: lineSize, pointSize: 0 }//The lines should not have points, hence why point size at zero.
                    
                },
                    width: '100%',
                    height: '100%',
                    backgroundColor: { fill: 'transparent' },
                    legend:'right'
                };

                chartObj = new google.visualization.ScatterChart(document.getElementById('chart-div'));
                chartObj.draw(data, options);   
         }
     
    });
        
    }, 2000);
}



//Remove the loading element from the screen (spinning element for loading screen)
function clearloadingElement(loadingElement) {

    loadingElement.style.display = "none";

}



//Display the loading element from the screen (spinning element for loading screen)
function displayLoadingAnimation(loadingElement) {

    loadingElement.style.display = "block";

    setTimeout(() => {
         
        clearloadingElement(loadingElement);

     }, 2000);
    
}
 


//Returns an endpoint (url string) based on all the selected information for plotting. 
function generatePlotDataQueryUrl() {

    const currentSelectedSlo = sloSelectorElement.options[sloSelectorElement.selectedIndex].text;
    const currentSelectedMeasure = measureSelectorElement.options[measureSelectorElement.selectedIndex].text;
    const currentSelectedStartDate = startDateSelectorElement.options[startDateSelectorElement.selectedIndex].text;
    const currentSelectedEndDate = endDateSelectorElement.options[endDateSelectorElement.selectedIndex].text;

    const url = `http://127.0.0.1:8000/plot?slo=${currentSelectedSlo}&measure=${currentSelectedMeasure}&start_date=${currentSelectedStartDate}&end_date=${currentSelectedEndDate}`;

    return url;
}


 
//Return a boolean based on whether all the plotting data is selected or not. 
function allPlottingInfoIsSelected(sloSelectorElement, measureSelectorElement, startDateSelectorElement, endDateSelectorElement) {
    
    let defaultSelectedSlo = sloSelectorElement.options[0].text;
    let defaultSelectedMeasure = measureSelectorElement.options[0].text;
    let defaultSelectedStartDate = startDateSelectorElement.options[0].text;
    let defaultSelectedEndDate = endDateSelectorElement.options[0].text;

    let currentSelectedSlo = sloSelectorElement.options[sloSelectorElement.selectedIndex].text;
    let currentSelectedMeasure = measureSelectorElement.options[measureSelectorElement.selectedIndex].text;
    let currentSelectedStartDate = startDateSelectorElement.options[startDateSelectorElement.selectedIndex].text;
    let currentSelectedEndDate = endDateSelectorElement.options[endDateSelectorElement.selectedIndex].text;
    
    
    //All selected info is not equal to their default selections
    if (currentSelectedSlo != defaultSelectedSlo && currentSelectedMeasure != defaultSelectedMeasure && currentSelectedStartDate != defaultSelectedStartDate && currentSelectedEndDate != defaultSelectedEndDate) {

        return true;

    }
   
    return false;

}



//Sets a radio button to checked
function checkRadioButton(radioButton) {
    
    radioButton.checked = true;

}



function hideBothTargetRadioButton(targetPlotOptionButtonBoth) {

    targetPlotOptionButtonBoth.style.display = "none";
    
}



function revealBothTargetRadioButton(targetPlotOptionButtonBoth) {

    targetPlotOptionButtonBoth.style.display = "block";
    
}



//Hides target 1 radio button.
function hideTargetT1RadioButton(targetPlotOptionButtonT1) {

    targetPlotOptionButtonT1.style.display = "none";

}



//Displays target 1 radio button.
function revealTargetT1RadioButton(targetPlotOptionButtonT1) {

    targetPlotOptionButtonT1.style.display = "block";

}



//Hides target 2 radio button.
function hideTargetT2RadioButton(targetPlotOptionButtonT2) {

    targetPlotOptionButtonT2.style.display = "none";

}



//Displays target 2 radio button.
function revealTargetT2RadioButton(targetPlotOptionButtonT2) {

    targetPlotOptionButtonT2.style.display = "block";

}


//Hides the target 2 color selector.
function hideTargetColorSelectorT2(targetPlotColorOptionButtonT2) {

    targetPlotColorOptionButtonT2.style.display = "none";
    
}



//Displays the target 2 color selector.
function revealTargetColorSelectorT2(targetPlotColorOptionButtonT2) {
    
     targetPlotColorOptionButtonT2.style.display = "block";

}



//On Change Event listener for when the the bothTarget radio button is selected.
targetPlotRadioButtonBoth.addEventListener('change', async () => {

    let plotDataUrl = await generatePlotDataQueryUrl();

    plotTransitionEditedTargets(plotDataUrl,displayElements);
    displayColorSelectorT1(targetPlotColorOptionButtonT1);
    displayColorSelectorT2(targetPlotColorOptionButtonT2);
    
});



//On Change Event listener for when the the T1 radio button is selected.
targetPlotRadioButtonT1.addEventListener('change', async () => {

    let plotDataUrl = await generatePlotDataQueryUrl();

    plotTransitionEditedTargets(plotDataUrl,displayElements);
    displayColorSelectorT1(targetPlotColorOptionButtonT1);
    hideColorSelectorT2(targetPlotColorOptionButtonT2);
    
});



//On Change Event listener for when the the T2 radio button is selected.
targetPlotRadioButtonT2.addEventListener('change', async () => {

    let plotDataUrl = await generatePlotDataQueryUrl();

    plotTransitionEditedTargets(plotDataUrl,displayElements);
    hideColorSelectorT1(targetPlotColorOptionButtonT1); 
    displayColorSelectorT2(targetPlotColorOptionButtonT2);

});



//On Change Event listener for when the the T1 color radio button is selected.
targetPlotColorRadioButtonT1.addEventListener('change', async () => {

    let plotDataUrl = await generatePlotDataQueryUrl();

    plotTransitionEditedTargetColors(plotDataUrl,displayElements);
    
});



//On Change Event listener for when the the T2 color radio button is selected.
targetPlotColorRadioButtonT2.addEventListener('change', async () => {
    
    let plotDataUrl = await generatePlotDataQueryUrl();

    plotTransitionEditedTargetColors(plotDataUrl,displayElements);
    
});



//On Change Event listener for when the the point size radio button is selected.
pointSizeSelector.addEventListener('change', async () => {
    
    let plotDataUrl = await generatePlotDataQueryUrl();

    plotTransitionEditedGraphPointSize(plotDataUrl,displayElements);
    
});



//On Change Event listener for when the the line size radio button is selected.
lineSizeSelector.addEventListener('change', async () => {

    let plotDataUrl = await generatePlotDataQueryUrl();

    plotTransitonEditedGraphLineSize(plotDataUrl,displayElements);
    
});



//Onclick event listener for modal close button.
plottingModalCloseButton.addEventListener("click", () => {

        hideAllPlotSelectorDescriptions(modalPlotSloDescriptionContainer, modalPlotMeasureDescriptionContainer);
        hideAllSelectorErrors(inputFields.sloSelector, inputFields.measureSelector, inputFields.startDateSelector, inputFields.endDateSelector);
        clearPlotModalSelectors(inputFields);
        closePlottingModal();

});



//Event listener that plots selected data.
plottingModalPlotButton.addEventListener('click', async () => {

    if (allPlottingInfoIsSelected(sloSelectorElement,measureSelectorElement,startDateSelectorElement,endDateSelectorElement)) {

        let plotDataUrl = await generatePlotDataQueryUrl();

        const currentSelectedSlo = sloSelectorElement.options[sloSelectorElement.selectedIndex].text;

        const currentSelectedMeasure = measureSelectorElement.options[measureSelectorElement.selectedIndex].text;


        axios.get(`http://127.0.0.1:8000/target/T2/exist/${currentSelectedSlo}/${currentSelectedMeasure}`).then((response) => {
            
            const hasBothTargets = response.data;

            console.log(`Has both targets: ${hasBothTargets} for : ${currentSelectedSlo} and ${currentSelectedMeasure}`);

            if (hasBothTargets) {//If the current selection has both target plot both.
                
                plotTransitionBothTargets(plotDataUrl,displayElements);

            }
            else {//Otherwise plot the single target.
                
                plotTransitionSingleTarget(plotDataUrl,displayElements);
                
            }
            
        });
       
    }
    else {//If all selectors are not selected then reveal the unselected errors for them.
        
        const unfilledSelectors = getAllUnslectedSelectors(inputFields);

        unfilledSelectors.forEach(revealUnselectedSelectorError);

    }

});




export {loadingElement,displayLoadingAnimation,dashboardLogo,hideDashboardLogo};