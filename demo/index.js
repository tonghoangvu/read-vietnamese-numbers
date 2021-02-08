'use strict';

// Get elements
const numberElem = document.getElementById('numberElem');
const separatorElem = document.getElementById('separatorElem');
const unitElem = document.getElementById('unitElem');
const readElem = document.getElementById('readElem');
const outputElem = document.getElementById('outputElem');

// Assign events
numberElem.addEventListener('change', reload);
separatorElem.addEventListener('change', reload);
unitElem.addEventListener('change', reload);
readElem.addEventListener('click', reload);

// Functions

function loadInputData() {
    return {
        number: numberElem.value,
        separator: separatorElem.value,
        unit: unitElem.value
    }
}

function isInputDataValid(inputData) {
    // Required fields
    if (!inputData.number)
        return false;
    return true;
}

function buildQueryParams(inputData) {
    let queryParams = [];

    // Required params
    queryParams.push('number=' + inputData.number);

    // Optional params (have default values)
    if (inputData.separator)
        queryParams.push('separator=' + inputData.separator);
    if (inputData.unit)
        queryParams.push('unit=' + inputData.unit);

    return '?' + queryParams.join('&');
}

function reload() {
    // Prepare request data
    const inputData = loadInputData();
    if (!isInputDataValid(inputData))
        return;
    const queryParams = buildQueryParams(inputData);

    // Call API
    let result = '';
    let failed = false;
    fetch('/read' + queryParams)
        .then(response => {
            failed = !response.ok;
            return response.json();
        })
        .then(parsedJSON => {
            result = failed ? parsedJSON.error : parsedJSON.text;
        })
        .finally(() => {
            outputElem.style.color = failed ? 'red' : '';
            outputElem.innerText = result;
        });
}
