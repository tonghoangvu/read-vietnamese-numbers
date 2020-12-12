// Get elements
const numberElem = document.getElementById('numberElem');
const separatorElem = document.getElementById('separatorElem');
const unitElem = document.getElementById('unitElem');
const skipEmptyPartElem = document.getElementById('skipEmptyPartElem');

const readElem = document.getElementById('readElem');
const outputElem = document.getElementById('outputElem');

// Assign events
numberElem.addEventListener('change', reload);
separatorElem.addEventListener('change', reload);
unitElem.addEventListener('change', reload);
skipEmptyPartElem.addEventListener('change', reload);
readElem.addEventListener('click', reload);

// Functions

function loadInput() {
    return {
        number: numberElem.value,
        separator: separatorElem.value,
        unit: unitElem.value,
        skipEmptyPart: skipEmptyPartElem.checked ? 1 : 0
    }
}

function buildQueryParams(data) {
    let output = [];

    if (data.number)
        output.push('number=' + data.number);
    if (data.separator)
        output.push('separator=' + data.separator);
    if (data.unit)
        output.push('unit=' + data.unit);
    if (data.skipEmptyPart)
        output.push('skip-empty-part=' + data.skipEmptyPart);

    return '?' + output.join('&');
}

function reload() {
    const data = loadInput();
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
