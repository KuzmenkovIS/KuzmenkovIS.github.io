let listBanks = [

    {nameRus: 'Сбербанк',
     nameEng: 'Sber'},

    {nameRus: 'ВТБ',
     nameEng: 'VTB'},

    {nameRus: 'Тинькофф',
     nameEng: 'Tinkoff'}
]

let deposit = {

    base: 0,
    replenishment: 0,
    rate: 0,
    rateType: '',
    term: 0,

    calculate: function () {
        let result = 0;

        if (this.term === 0) {
            console.log('Задайте срок вклада больше 0');
            return this.base;
        } else if (this.rateType === 'capitalizationPerMonth') {
            for (let i = 1; i <= this.term; i++) {
                if (i === 1) {
                    result = this.base + this.replenishment + ((this.base * this.rate) / 12);
                } else {
                    result = result + this.replenishment + ((result * this.rate) / 12);
                }
            }
        } else if (this.rateType === 'percentInTheEnd') {
            result = this.base + (((this.base * this.rate) / 12) * (this.term));
        }
        
        return result;
    }
}

function addListBanksToSelect (event) {
    console.log('Event: ', event);
    console.log('Select Banks Step 1');
    if (event.type === 'focusin' && event.target.nodeName.toLowerCase() === 'select' && event.target.name === 'bank') {
        console.log('Select Banks Step 2');
        console.log('Select property options: ', event.target.options);
        console.log('Select property length: ', event.target.length);

        if (event.target.length > 1) {
            console.log('Delete old select options');
            event.target.length = 1;
        }

        for (let bank of listBanks) {
            let option = document.createElement('option');
            option.value = bank.nameEng;
            option.text = bank.nameRus;

            event.target.add(option);
        }
    }
}

class Converter {
    constructor () {

    }

    stringToNumberFractionDigits2 (value, event) {
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

    stringToNumberPercent (value) {
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
            console.log('Функции converter.stringToNumberPercent передана не строка');
        }
    
        return Number(valueConverted/100);
    }
}

let converter = new Converter();

let listDeposits = document.querySelector('table');

    listDeposits.formatInput = function (event) {

        console.log('Function formatInput start... on event: ', event);

        if (event.target.nodeName.toLowerCase() === 'input' && typeof (event.target.value) === 'string') {
            let valueLengthStart = event.target.value.length;
            let cursorStart = event.target.selectionStart;
            let cursorEnd = event.target.selectionEnd;

            if (event.target.className === 'currency') {

                if ((cursorStart === 0) && (converter.stringToNumberFractionDigits2(event.target.value, event) === 0) && (valueLengthStart > 6) && (event.type === 'input')) {
                    
                } else {
                    event.target.value = converter.stringToNumberFractionDigits2(event.target.value, event).toLocaleString('ru', {
                        style: 'currency',
                        currency: 'RUB',
                        minimumFractionDigits: 2
                    });
                    
                    if (event.target.value.length === 3) {
                        event.target.selectionStart = 1;
                        event.target.selectionEnd = 1;
                    } else if (cursorStart >= (event.target.value.length - 2)) {
                        event.target.selectionStart = event.target.value.length - 2;
                        event.target.selectionEnd = event.target.value.length - 2;
                    } else if (valueLengthStart > event.target.value.length) {
                        if (cursorStart === 0) {
                            event.target.selectionStart = cursorStart;
                            event.target.selectionEnd = cursorEnd;
                        } else if (event.target.value.length - cursorStart === 3) {
                            event.target.selectionStart = cursorStart;
                            event.target.selectionEnd = cursorEnd;
                        } else {
                            event.target.selectionStart = cursorStart - 1;
                            event.target.selectionEnd = cursorEnd - 1;
                        }
                    } else if (valueLengthStart < event.target.value.length) {
                        if (cursorStart === event.target.value.length - 5 && event.inputType === "deleteContentForward") {
                            event.target.selectionStart = cursorStart + 1;
                            event.target.selectionEnd = cursorEnd + 1;
                        } else if (cursorStart === event.target.value.length - 3 || cursorStart === event.target.value.length - 4 || cursorStart === event.target.value.length - 5) {
                            event.target.selectionStart = cursorStart;
                            event.target.selectionEnd = cursorEnd;
                        } else if (event.inputType === "deleteContentBackward") {
                            event.target.selectionStart = cursorStart;
                            event.target.selectionEnd = cursorEnd;
                        } else {
                            event.target.selectionStart = cursorStart + 1;
                            event.target.selectionEnd = cursorEnd + 1;
                        }
                    } else if ( valueLengthStart === 5 && cursorStart === 0) {
                        event.target.selectionStart = cursorStart + 1;
                        event.target.selectionEnd = cursorEnd + 1;
                    } else {
                        event.target.selectionStart = cursorStart;
                        event.target.selectionEnd = cursorEnd;
                    }
                }

            } else if (event.target.className === 'rate') {
                event.target.value = converter.stringToNumberPercent(event.target.value).toLocaleString('ru', {
                    style: 'percent',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });

                if (cursorStart >= (event.target.value.length - 2)) {
                    event.target.selectionStart = event.target.value.length - 2;
                    event.target.selectionEnd = event.target.value.length - 2;
                } else if ((event.target.value.replace(/\s/g, '') === '0%') && event.inputType === 'deleteContentForward') {
                    event.target.selectionStart = 1;
                    event.target.selectionEnd = 1;
                } else {
                    event.target.selectionStart = cursorStart;
                    event.target.selectionEnd = cursorEnd;
                }
            } else if (event.target.className === 'term') {
                event.target.value = Number(event.target.value.replace(/[^0-9]/g,''));

                if (event.target.value >= 999) {
                    event.target.value = 999;
                }
            }
        }
    };

    listDeposits.calculateDeposit = function (event) {
        console.log('Function calculateDeposit start... on event ', event);
    
        if (event.target.nodeName.toLowerCase() === 'input' || event.target.nodeName.toLowerCase() === 'select') {
            tr = event.target.closest('tr');
            td = event.target.closest('td');

            deposit.base = converter.stringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[2].querySelector('input').value);
            deposit.replenishment = converter.stringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[3].querySelector('input').value);
            deposit.rate = converter.stringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[4].querySelector('input').value) / 100;
            deposit.term = listDeposits.rows[tr.rowIndex].cells[5].querySelector('select').value === 'months' ? 
                converter.stringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[5].querySelector('input').value) :
                converter.stringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[5].querySelector('input').value) * 12;
            deposit.rateType = listDeposits.rows[tr.rowIndex].cells[6].querySelector('select').value;

            console.log('Select value =', listDeposits.rows[tr.rowIndex].cells[5].querySelector('select'));
            console.log('Select value =', listDeposits.rows[tr.rowIndex].cells[5].querySelector('select').value);
            console.log('Deposit term =', deposit.term);

            listDeposits.rows[tr.rowIndex].cells[7].querySelector('input').value = deposit.calculate().toLocaleString('ru', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    };

    listDeposits.addEventListener('input', listDeposits.formatInput);
    listDeposits.addEventListener('change', listDeposits.calculateDeposit);
    listDeposits.addEventListener('focusin', addListBanksToSelect);



    let sectionMain = document.querySelector('.main');
    function showScrollLeftOnMain (event) {
        console.log('Main scroll left:', event.target.scrollLeft);
        console.log('Main offset left:', event.target.offsetLeft);
    }

    sectionMain.addEventListener('scroll', showScrollLeftOnMain);