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

function loadInput() {
    return {
        number: numberElem.value,
        separator: separatorElem.value,
        unit: unitElem.value
    }
}

function isInputValid(input) {
    // Required fields must be filled
    if (!input.number)
        return false;
    return true;
}

function buildQueryParams(data) {
    let output = [];

    // Don't check these fields (always included)
    output.push('number=' + data.number);

    // Check not empty (they have default values)
    if (data.separator)
        output.push('separator=' + data.separator);
    if (data.unit)
        output.push('unit=' + data.unit);

    return '?' + output.join('&');
}

function reload() {
    const data = loadInput();

    // Only fetch API when input is valid
    if (!isInputValid(data))
        return;

    const query = buildQueryParams(data);

    let result = '';
    let isError = false;
    fetch('/read' + query)
        .then(response => {
            isError = !response.ok;
            return response.json();
        })
        .then(jsonObj => {
            if (!isError)
                result = jsonObj.text;
            else
                result = jsonObj.error;
        })
        .finally(() => {
            if (isError)
                outputElem.style.color = 'red';
            else
                outputElem.style.color = '';
            outputElem.innerText = result;
        });
}
