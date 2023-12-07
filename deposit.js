let deposit = {

    base: 0,
    replenishment: 0,
    rate: 0,
    term: 0,

    calculate: function () {
        let result = 0;

        if (this.term === 0) {
            console.log('Задайте срок вклада больше 0');
            return this.base;
        } else {
            for (let i = 1; i <= this.term; i++) {
                if (i === 1) {
                    result = this.base + this.replenishment + ((this.base * this.rate) / 12);
                } else {
                    result = result + this.replenishment + ((result * this.rate) / 12);
                }
            }
        }
        
        return result;
    }
}

function convertStringToNumberFractionDigits2 (value, event) {
    let valueNumbersAndDots = '';
    let indexDotLast = '';
    let valueBeforeDot = '';
    let valueAfterDot = '';
    let valueConverted = '';

    if ( typeof(value)==='string' ) {
        valueNumbersAndDots = value.replace(/[^0-9,.]/g, '').replace(/,/g,'.');
        indexDotLast = valueNumbersAndDots.lastIndexOf('.');

        if ((!event && indexDotLast !== -1) || (event && indexDotLast !== -1)) {
            valueBeforeDot = valueNumbersAndDots.slice(0,indexDotLast).replace(/\./g, '');
            valueAfterDot = valueNumbersAndDots.slice(indexDotLast, indexDotLast + 3);
            valueConverted = valueBeforeDot + valueAfterDot;
        } else if ((event && indexDotLast === -1) 
                    && 
                   (event.type === "input" && (event.inputType === "deleteContentForward" || event.inputType === "deleteContentBackward"))) {

                valueBeforeDot = valueNumbersAndDots.slice(0,valueNumbersAndDots.length - 2);
                valueAfterDot = valueNumbersAndDots.slice(valueNumbersAndDots.length - 2);
                valueConverted = valueBeforeDot + '.' + valueAfterDot;
        } else {
            valueConverted = valueNumbersAndDots;
        }
    } else {
        console.log('Функции convertStringToNumberDecimalDotHundredths передана не строка');
    }
    
    return Number(valueConverted);
}

function convertStringToNumberPercent (value) {
    let valueNumbers = '';
    let valueConverted = '';

    valueNumbers = value.replace(/[^0-9]/g, '');

    if (typeof(value) === 'string') {
        if (Number(valueNumbers) >= 100) {
            valueConverted = 100;
        } else {
            valueConverted = valueNumbers
        }
    } else {
        console.log('Функции convertStringToNumberPercent передана не строка');
    }

    return Number(valueConverted/100);
}



let listDeposits = document.querySelector('table');

    listDeposits.formatInput = function (input, event) {
        if (typeof (input.value) === 'string') {

            let valueLengthStart = input.value.length;
            let cursorStart = input.selectionStart;
            let cursorEnd = input.selectionEnd;

            if (input.className === 'currency') {

                if ((cursorStart === 0) && (convertStringToNumberFractionDigits2(input.value, event) === 0) && (valueLengthStart > 6) && (event.type === 'input')) {
                    
                } else {
                    input.value = convertStringToNumberFractionDigits2(input.value, event).toLocaleString('ru', {
                        style: 'currency',
                        currency: 'RUB',
                        minimumFractionDigits: 2
                    });
                    
                    if (input.value.length === 3) {
                        input.selectionStart = 1;
                        input.selectionEnd = 1;
                    } else if (cursorStart >= (input.value.length - 2)) {
                        input.selectionStart = input.value.length - 2;
                        input.selectionEnd = input.value.length - 2;
                    } else if (valueLengthStart > input.value.length) {
                        if (cursorStart === 0) {
                            input.selectionStart = cursorStart;
                            input.selectionEnd = cursorEnd;
                        } else if (input.value.length - cursorStart === 3) {
                            input.selectionStart = cursorStart;
                            input.selectionEnd = cursorEnd;
                        } else {
                            input.selectionStart = cursorStart - 1;
                            input.selectionEnd = cursorEnd - 1;
                        }
                    } else if (valueLengthStart < input.value.length) {
                        if (cursorStart === input.value.length - 5 && event.inputType === "deleteContentForward") {
                            input.selectionStart = cursorStart + 1;
                            input.selectionEnd = cursorEnd + 1;
                        } else if (cursorStart === input.value.length - 3 || cursorStart === input.value.length - 4 || cursorStart === input.value.length - 5) {
                            input.selectionStart = cursorStart;
                            input.selectionEnd = cursorEnd;
                        } else if (event.inputType === "deleteContentBackward") {
                            input.selectionStart = cursorStart;
                            input.selectionEnd = cursorEnd;
                        } else {
                            input.selectionStart = cursorStart + 1;
                            input.selectionEnd = cursorEnd + 1;
                        }
                    } else if ( valueLengthStart === 5 && cursorStart === 0) {
                        input.selectionStart = cursorStart + 1;
                        input.selectionEnd = cursorEnd + 1;
                    } else {
                        input.selectionStart = cursorStart;
                        input.selectionEnd = cursorEnd;
                    }
                }

            } else if (input.className === 'percent') {
                input.value = convertStringToNumberPercent(input.value).toLocaleString('ru', {
                    style: 'percent',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });

                if (cursorStart >= (input.value.length - 2)) {
                    input.selectionStart = input.value.length - 2;
                    input.selectionEnd = input.value.length - 2;
                } else if ((input.value.replace(/\s/g, '') === '0%') && event.inputType === 'deleteContentForward') {
                    input.selectionStart = 1;
                    input.selectionEnd = 1;
                } else {
                    input.selectionStart = cursorStart;
                    input.selectionEnd = cursorEnd;
                }
            } else if (input.className === 'term') {
                input.value = Number(input.value.replace(/[^0-9]/g,''));
            }
            
        }

    };

    listDeposits.oninput = (event) => {
        
        console.log('Event INPUT: ', event);
        if (event.target.nodeName.toLowerCase() === 'input') {
            listDeposits.formatInput(event.target, event);
        }
    };

    listDeposits.onchange = (event) => {

        console.log('Event CHANGE ', event);
    
        if (event.target.nodeName.toLowerCase() === 'input' || event.target.nodeName.toLowerCase() === 'select') {
            tr = event.target.closest('tr');
            td = event.target.closest('td');

            if (typeof (event.target.value) === 'string')  {

                deposit.base = convertStringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[0].querySelector('input').value);
                deposit.replenishment = convertStringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[1].querySelector('input').value);
                deposit.rate = convertStringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[2].querySelector('input').value) / 100;
                deposit.term = listDeposits.rows[tr.rowIndex].cells[3].querySelector('select').value === 'months' ? 
                    convertStringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[3].querySelector('input').value) :
                    convertStringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[3].querySelector('input').value) * 12;

                console.log('Select value =', listDeposits.rows[tr.rowIndex].cells[3].querySelector('select'));
                console.log('Select value =', listDeposits.rows[tr.rowIndex].cells[3].querySelector('select').value);
                console.log('Deposit term =', deposit.term);

                listDeposits.rows[tr.rowIndex].cells[4].querySelector('input').value = deposit.calculate().toLocaleString('ru', {
                    style: 'currency',
                    currency: 'RUB',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
        
                listDeposits.formatInput(event.target, event);
            } else {
                event.target.value = 'Введите число';
            }
        }
    };