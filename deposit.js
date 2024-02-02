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
    if (event.type === 'focusin' && event.target.nodeName.toLowerCase() === 'select' && event.target.className === 'bank') {

        if (event.target.length > 1) {
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


class Deposit {
    constructor () {
        this.tr = document.createElement('tr');

        this.tdNameBank = document.createElement('td');

            this.tdNameBank_selectWrapper = document.createElement('div');
            this.tdNameBank_selectWrapper.className = 'selectWrapper';

                this.tdNameBank_select = document.createElement('select');
                this.tdNameBank_select.className = 'bank';
                this.tdNameBank_select.name = 'nameBank';

                    this.tdNameBank_option = document.createElement('option');
                    this.tdNameBank_option.text = 'Выберите банк';
                    this.tdNameBank_select.append(this.tdNameBank_option);

                    for (let i=0; i<listBanks.length; i++) {
                        this['tdNameBank_option_'+i] = document.createElement('option');
                        this['tdNameBank_option_'+i].text = listBanks[i].nameRus;
                        this['tdNameBank_option_'+i].value = listBanks[i].nameEng;

                        this.tdNameBank_select.append(this['tdNameBank_option_'+i]);
                    }

            
            this.tdNameBank_selectWrapper.append(this.tdNameBank_select);
            this.tdNameBank.append(this.tdNameBank_selectWrapper);

        this.tdNameDeposit = document.createElement('td');

            this.tdNameDeposit_input = document.createElement('input');
            this.tdNameDeposit_input.type = 'text';
            this.tdNameDeposit_input.className = 'nameDeposit';
            this.tdNameDeposit_input.name = 'nameDeposit';
            this.tdNameDeposit_input.maxLength = 20;
            this.tdNameDeposit_input.placeholder = 'Название вклада';

            this.tdNameDeposit.append(this.tdNameDeposit_input);

        this.tdBase = document.createElement('td');

            this.tdBase_input = document.createElement('input');
            this.tdBase_input.type = 'text';
            this.tdBase_input.className = 'currency';
            this.tdBase_input.name = 'sumBase';
            this.tdBase_input.maxLength = 26;
            this.tdBase_input.value = '0,00 \u20BD';

            this.tdBase.append(this.tdBase_input);

        this.tdReplenishment = document.createElement('td');

            this.tdReplenishment_input = document.createElement('input');
            this.tdReplenishment_input.type = 'text';
            this.tdReplenishment_input.className = 'currency';
            this.tdReplenishment_input.name = 'sumReplenishment';
            this.tdReplenishment_input.maxLength = 26;
            this.tdReplenishment_input.value = '0,00 \u20BD';

            this.tdReplenishment.append(this.tdReplenishment_input);

        this.tdRate = document.createElement('td');

            this.tdRate_input = document.createElement('input');
            this.tdRate_input.type = 'text';
            this.tdRate_input.className = 'rate';
            this.tdRate_input.name = 'rate';
            this.tdRate_input.maxLength = 8;
            this.tdRate_input.value = '0,00 %';

            this.tdRate.append(this.tdRate_input);

        this.tdTerm = document.createElement('td');

            this.tdTerm_flexContainer = document.createElement('div');
            this.tdTerm_flexContainer.className = 'tdFlexContainer';

                this.tdTerm_input = document.createElement('input');
                this.tdTerm_input.type = 'number';
                this.tdTerm_input.className = 'term';
                this.tdTerm_input.name = 'term';
                this.tdTerm_input.min = 0;
                this.tdTerm_input.step = 1;
                this.tdTerm_input.max = 1200;
                this.tdTerm_input.value = 0;

                this.tdTerm_selectWrapper = document.createElement('div');
                this.tdTerm_selectWrapper.className = 'selectWrapper';

                    this.tdTerm_select = document.createElement('select');
                    this.tdTerm_select.className = 'termUnitOfMeasure';
                    this.tdTerm_select.name = 'termUnitOfMeasure';

                        this.tdTerm_option_months = document.createElement('option');
                        this.tdTerm_option_months.value = 'months';
                        this.tdTerm_option_months.text = 'месяцы';

                        this.tdTerm_option_years = document.createElement('option');
                        this.tdTerm_option_years.value = 'years';
                        this.tdTerm_option_years.text = 'годы';

            this.tdTerm_select.append(this.tdTerm_option_months);
            this.tdTerm_select.append(this.tdTerm_option_years);
            this.tdTerm_selectWrapper.append(this.tdTerm_select);
            this.tdTerm_flexContainer.append(this.tdTerm_input);
            this.tdTerm_flexContainer.append(this.tdTerm_selectWrapper);
            this.tdTerm.append(this.tdTerm_flexContainer);


        this.tdRateType = document.createElement('td');

            this.tdRateType_selectWrapper = document.createElement('div');
            this.tdRateType_selectWrapper.className = 'selectWrapper';

                this.tdRateType_select = document.createElement('select');
                this.tdRateType_select.name = 'rateType';
                
                    this.tdRateType_option_capitalizationPerMonth = document.createElement('option');
                    this.tdRateType_option_capitalizationPerMonth.value = 'capitalizationPerMonth';
                    this.tdRateType_option_capitalizationPerMonth.text = 'Ежемесячная капитализация';

                    this.tdRateType_option_percentInTheEnd = document.createElement('option');
                    this.tdRateType_option_percentInTheEnd.value = 'percentInTheEnd';
                    this.tdRateType_option_percentInTheEnd.text = 'Проценты в конце срока';

            this.tdRateType_select.append(this.tdRateType_option_capitalizationPerMonth);
            this.tdRateType_select.append(this.tdRateType_option_percentInTheEnd);
            this.tdRateType_selectWrapper.append(this.tdRateType_select);
            this.tdRateType.append(this.tdRateType_selectWrapper);

        this.tdTotal = document.createElement('td');

            this.tdTotal_input = document.createElement('input');
            this.tdTotal_input.type = 'text';
            this.tdTotal_input.className = 'currency';
            this.tdTotal_input.name = 'sumTotal';
            this.tdTotal_input.maxLength = 26;
            this.tdTotal_input.value = '0,00 \u20BD';
            this.tdTotal_input.disabled = true;

            this.tdTotal.append(this.tdTotal_input);

        this.tdControl = document.createElement('td');

            this.tdControl_flexContainer = document.createElement('div');
            this.tdControl_flexContainer.className = 'tdFlexContainer';

                this.tdControl_button_add = document.createElement('button');
                this.tdControl_button_add.type = 'button';
                this.tdControl_button_add.className = 'btnAddDepositAfter';

                    this.tdControl_img_add = document.createElement('img');
                    this.tdControl_img_add.src = "images/plus-solid.svg";
                    this.tdControl_img_add.height = 20;
                    this.tdControl_img_add.width = 20;


                this.tdControl_button_copy = document.createElement('button');
                this.tdControl_button_copy.type = 'button';
                this.tdControl_button_copy.className = 'btnCopyDeposit';

                    this.tdControl_img_copy = document.createElement('img');
                    this.tdControl_img_copy.src = 'images/copy-solid.svg';
                    this.tdControl_img_copy.height = 16;
                    this.tdControl_img_copy.width = 16;
                
                this.tdControl_button_delete = document.createElement('button');
                this.tdControl_button_delete.type = 'button';
                this.tdControl_button_delete.className = 'btnDeleteDeposit';

                    this.tdControl_img_delete = document.createElement('img');
                    this.tdControl_img_delete.src = 'images/xmark-solid.svg';
                    this.tdControl_img_delete.height = 24;
                    this.tdControl_img_delete.width = 24;

            this.tdControl_button_add.append(this.tdControl_img_add);
            this.tdControl_button_copy.append(this.tdControl_img_copy);
            this.tdControl_button_delete.append(this.tdControl_img_delete);
            this.tdControl_flexContainer.append(this.tdControl_button_add);
            this.tdControl_flexContainer.append(this.tdControl_button_copy);
            this.tdControl_flexContainer.append(this.tdControl_button_delete);
            this.tdControl.append(this.tdControl_flexContainer);

        this.tr.append(this.tdNameBank);
        this.tr.append(this.tdNameDeposit);
        this.tr.append(this.tdBase);
        this.tr.append(this.tdReplenishment);
        this.tr.append(this.tdRate);
        this.tr.append(this.tdTerm);
        this.tr.append(this.tdRateType);
        this.tr.append(this.tdTotal);
        this.tr.append(this.tdControl);

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
            console.log('Функции stringToNumberFractionDigits2 передана не строка');
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

    stringToNumberPercentFractionDigits2 (value) {

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
            console.log('Функции stringToNumberPercentFractionDigits2 передана не строка');
        }

        if (Number(valueConverted) >= 100) {
            valueConverted = 100;
        }

        return Number(valueConverted/100);
    }
}

let converter = new Converter();

let listDeposits = document.querySelector('table');

    listDeposits.formatInput = function (event) {

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
                event.target.value = converter.stringToNumberPercentFractionDigits2(event.target.value).toLocaleString('ru', {
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                // Закоментированный код ниже для случая процентов без долей "100 %". Он может еще пригодиться, поэтому пока сохряняю
                // if (cursorStart >= (event.target.value.length - 2)) {
                //     event.target.selectionStart = event.target.value.length - 2;
                //     event.target.selectionEnd = event.target.value.length - 2;
                // } else if ((event.target.value.replace(/\s/g, '') === '0%') && event.inputType === 'deleteContentForward') {
                //     event.target.selectionStart = 1;
                //     event.target.selectionEnd = 1;
                // } else {
                //     event.target.selectionStart = cursorStart;
                //     event.target.selectionEnd = cursorEnd;
                // }

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
            } else if (event.target.className === 'term') {
                event.target.value = Number(event.target.value.replace(/[^0-9]/g,''));

                if (event.target.value >= 999) {
                    event.target.value = 999;
                }
            }
        }
    };

    listDeposits.calculateDeposit = function (event) {
    
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

            listDeposits.rows[tr.rowIndex].cells[7].querySelector('input').value = deposit.calculate().toLocaleString('ru', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    };

    listDeposits.addDepositAfter = function (event) {
        if ((event.target.nodeName.toLowerCase() === 'button' && event.target.className === 'btnAddDepositAfter') ||
            (event.target.parentElement.nodeName.toLowerCase() === 'button' && event.target.parentElement.className === 'btnAddDepositAfter')) {
            
            let trCurrent = event.target;

            while (trCurrent.nodeName.toLowerCase() !== 'tr') {
                trCurrent = trCurrent.parentElement;
            }

            let depositNew = new Deposit();
            trCurrent.after(depositNew.tr);

            listDeposits.saveDeposits();
        };
    };

    listDeposits.addDepositToTheEnd = function (event) {

        if ((event.target.nodeName.toLowerCase() === 'button' && event.target.className === 'btnAddDepositToTheEnd') ||
            (event.target.parentElement.nodeName.toLowerCase() === 'button' && event.target.parentElement.className === 'btnAddDepositToTheEnd')) {

            let trLast = event.target;

            while (trLast.nodeName.toLowerCase() !== 'tr') {
                trLast = trLast.parentElement;
            }

            let depositNew = new Deposit();
            trLast.before(depositNew.tr);

            listDeposits.saveDeposits();
        };
    };

    listDeposits.copyDeposit = function (event) {
        if ((event.target.nodeName.toLowerCase() === 'button' && event.target.className === 'btnCopyDeposit') ||
            (event.target.parentElement.nodeName.toLowerCase() === 'button' && event.target.parentElement.className === 'btnCopyDeposit')) {

            let trCurrent = event.target;

            while (trCurrent.nodeName.toLowerCase() !== 'tr') {
                trCurrent = trCurrent.parentElement;
            }

            let trCurrentCopy = trCurrent.cloneNode(true);

            trCurrentCopy.querySelector('[name=nameBank]').selectedIndex = trCurrent.querySelector('[name=nameBank]').selectedIndex;
            trCurrentCopy.querySelector('[name=termUnitOfMeasure]').selectedIndex = trCurrent.querySelector('[name=termUnitOfMeasure]').selectedIndex;
            trCurrentCopy.querySelector('[name=rateType]').selectedIndex = trCurrent.querySelector('[name=rateType]').selectedIndex;

            trCurrent.after(trCurrentCopy);

            listDeposits.saveDeposits();
        };
    }

    listDeposits.deleteDeposit = function (event) {
        if ((event.target.nodeName.toLowerCase() === 'button' && event.target.className === 'btnDeleteDeposit') ||
            (event.target.parentElement.nodeName.toLowerCase() === 'button' && event.target.parentElement.className === 'btnDeleteDeposit')) {
            
            if (listDeposits.rows.length > 3) {
                let trCurrent = event.target;

                while (trCurrent.nodeName.toLowerCase() !== 'tr') {
                    trCurrent = trCurrent.parentElement;
                }

                trCurrent.remove();

                listDeposits.saveDeposits();
            }
        };
    }
// **************************************************** 
    listDeposits.saveDeposits = function () {
        localStorage.clear();

        if (listDeposits.rows.length > 2) {
            for (let i=1; i < (listDeposits.rows.length - 1); i++) {
                
                let key = 'tr'+i;
                let dataRow = {
                    nameBank: String(listDeposits.rows[i].querySelector('[name=nameBank]').selectedIndex),
                    nameDeposit: String(listDeposits.rows[i].querySelector('[name=nameDeposit]').value),
                    sumBase: String(listDeposits.rows[i].querySelector('[name=sumBase]').value),
                    sumReplenishment: String(listDeposits.rows[i].querySelector('[name=sumReplenishment]').value),
                    rate: String(listDeposits.rows[i].querySelector('[name=rate]').value),
                    term: String(listDeposits.rows[i].querySelector('[name=term]').value),
                    termUnitOfMeasure: String(listDeposits.rows[i].querySelector('[name=termUnitOfMeasure]').selectedIndex),
                    rateType: String(listDeposits.rows[i].querySelector('[name=rateType]').selectedIndex),
                    sumTotal: String(listDeposits.rows[i].querySelector('[name=sumTotal]').value),
                };

                localStorage[key]=JSON.stringify(dataRow);
            }
        }

    }

    listDeposits.loadDeposits = function () {
        console.log('*** loadDeposits started...');
        for (let i=1; i < listDeposits.rows.length - 1; i++) {
            listDeposits.deleteRow(i);
        }

        for (let i=1; i <= localStorage.length; i++) {
            console.log('tr'+i+':', JSON.parse(localStorage.getItem('tr'+i)));
            rowStorage = JSON.parse(localStorage.getItem('tr'+i));

            let rowCurrent = new Deposit();

            console.log('*** rowCurrent.tr.nameBank.options', rowCurrent.tr);

            rowCurrent.tr.querySelector('[name=nameBank]').selectedIndex = rowStorage.nameBank;
            rowCurrent.tr.querySelector('[name=nameDeposit]').value = rowStorage.nameDeposit;
            rowCurrent.tr.querySelector('[name=sumBase]').value = rowStorage.sumBase;
            rowCurrent.tr.querySelector('[name=sumReplenishment]').value = rowStorage.sumReplenishment;
            rowCurrent.tr.querySelector('[name=rate]').value = rowStorage.rate;
            rowCurrent.tr.querySelector('[name=term]').value = rowStorage.term;
            rowCurrent.tr.querySelector('[name=termUnitOfMeasure]').selectedIndex = rowStorage.termUnitOfMeasure;
            rowCurrent.tr.querySelector('[name=rateType]').selectedIndex = rowStorage.rateType;
            rowCurrent.tr.querySelector('[name=sumTotal]').value = rowStorage.sumTotal;

            let rowLast = listDeposits.rows.item(listDeposits.rows.length-1);

            rowLast.before(rowCurrent.tr);
        }
    }
// **************************************************** 
    console.log('*** listDeposits.rows', listDeposits.rows);
    console.log('*** listDeposits.rows[1]', listDeposits.rows[1]);
    console.log('*** listDeposits.rows[1].nameBank', listDeposits.rows[1].querySelector('[name=nameBank]'));
    console.log('*** listDeposits.rows[1].nameDeposit', listDeposits.rows[1].querySelector('[name=nameDeposit]').value);
// ****************************************************

    listDeposits.addEventListener('input', listDeposits.formatInput);
    listDeposits.addEventListener('change', listDeposits.formatInput);
    listDeposits.addEventListener('change', listDeposits.calculateDeposit);
    listDeposits.addEventListener('focusin', addListBanksToSelect);
    listDeposits.addEventListener('click', listDeposits.addDepositAfter);
    listDeposits.addEventListener('click', listDeposits.addDepositToTheEnd);
    listDeposits.addEventListener('click', listDeposits.copyDeposit);
    listDeposits.addEventListener('click', listDeposits.deleteDeposit);
// ****************************************************
    window.addEventListener('load', listDeposits.loadDeposits);
    listDeposits.addEventListener('change', (event) => {
        console.log('--- EVENT:', event);
        console.log('--- Event.target.nodeName:', event.target.nodeName );
        console.log('--- Event.type:', event.type );
        if (event.target.nodeName === "SELECT" && event.type === "change") {
            console.log('!!! listDeposits.rows[1].nameBank', listDeposits.rows[1].querySelector('[name=nameBank]'));
        } else if (event.target.nodeName === "INPUT" && event.type === "change") {
            console.log('*** listDeposits.rows[1].nameDeposit', listDeposits.rows[1].querySelector('[name=nameDeposit]').value);
        }

        listDeposits.saveDeposits();

        console.log('localStorage:', localStorage);
    })



let sectionMain = document.querySelector('.main');
function showScrollLeftOnMain (event) {
    console.log('Main scroll left:', event.target.scrollLeft);
    console.log('Main offset left:', event.target.offsetLeft);
}

sectionMain.addEventListener('scroll', showScrollLeftOnMain);





