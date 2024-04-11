let listBanks = [

    {nameRus: 'Сбербанк',
     nameEng: 'Sber'},

    {nameRus: 'ВТБ',
     nameEng: 'VTB'},

    {nameRus: 'Тинькофф',
     nameEng: 'Tinkoff'}
]

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

class Deposit {
    constructor (base, replenishment, rate, rateType, term) {
        this.base = base;
        this.replenishment = replenishment;
        this.rate = rate;
        this.rateType = rateType;
        this.term = term;
        this.sumInvested = 0;
        this.sumProfit = 0;
        this.sumTotal = 0;
    }

    calculate () {
        let sumInvested = 0;
        let sumProfit = 0;
        let sumTotal = 0;

        if (this.term <= 0) {
            console.log('Задайте срок вклада больше 0');
            return this.base;
        } else if (this.rateType === 'capitalizationPerMonth') {
            for (let i = 1; i <= this.term; i++) {
                if (i === 1) {
                    sumInvested = this.base + this.replenishment;
                    sumProfit = ((this.base * this.rate) / 12);
                    sumTotal = this.base + this.replenishment + ((this.base * this.rate) / 12);
                } else {
                    sumInvested = sumInvested + this.replenishment;
                    sumProfit = sumProfit + ((sumTotal * this.rate) / 12);
                    sumTotal = sumTotal + this.replenishment + ((sumTotal * this.rate) / 12);
                }
            }
        } else if (this.rateType === 'percentInTheEnd') {
            sumInvested = this.base;
            sumProfit = (((this.base * this.rate) / 12) * (this.term));
            sumTotal = this.base + (((this.base * this.rate) / 12) * (this.term));
        }
        
        this.sumInvested = sumInvested;
        this.sumProfit = sumProfit;
        this.sumTotal = sumTotal; 
    }
}

let converter = new Converter();

let deposit = new Deposit(0,0,0,0,0);

let listDeposits = document.querySelector('table');

    // При реализации форматирования денежных сумм были учтены 2 особенности языка JavaScript, которые установили определенные ограничения.
    // 1. JS нормально не воспринимает дисятичные числа, начинающиеся с 0. Следовательно, числа вида "005000" сразу форматируются, отбрасывая нули в начале,
    // приводясь к виду "5000". Данное поведение свойственно всем встроенным методам обработки и приведения чисел, а т.к. я решил использоваться только нативные
    // методы JS, указанное ограничение унаследовано и моим методом форматирования. Если нужно допустить вариант ввода чисел начинающихся с нуля, то нужно писать
    // полностью свой метод форматирования и использовать его вместо toLocalString.
    // 2. По этой же причине реализованный метод форматирования не дает ввести много нулей без цифры 1-9 в начале: 00000 сразу преабразуется в 0.
    listDeposits.formatInput = function (event) {

        if (event.target.nodeName.toLowerCase() === 'input' && typeof (event.target.value) === 'string') {
            let valueLengthStart = event.target.value.length;
            let cursorStart = event.target.selectionStart;
            let cursorEnd = event.target.selectionEnd;

            if (event.target.className === 'currency') {

                if ((cursorStart === 0) && (converter.stringToNumberFractionDigits2(event.target.value, event) === 0) && (valueLengthStart > 6) && (event.type === 'input')) {
                    
                } else if (event.target.value === '') {
                    event.target.value = converter.stringToNumberFractionDigits2('0', event).toLocaleString('ru', {
                        style: 'currency',
                        currency: 'RUB',
                        minimumFractionDigits: 2
                    });

                    event.target.selectionStart = 1;
                    event.target.selectionEnd = 1;
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
                if (event.target.value === '') {
                    event.target.value = converter.stringToNumberPercentFractionDigits2('0').toLocaleString('ru', {
                        style: 'percent',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                } else {
                    event.target.value = converter.stringToNumberPercentFractionDigits2(event.target.value).toLocaleString('ru', {
                        style: 'percent',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                }
                // Закоментированный код ниже для случая процентов без долей "100 %". Он может еще пригодиться, поэтому пока сохраняю
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

    listDeposits.addListBanksToSelect = function (event) {
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

    // Из-за особенностей срабатывания событий в браузере Safari, метод расчета депозита необходимо усложненным образом назначать на несколько обработчиков событий,
    // вместо одного самого логичного "change". А особенность Safari заключается в том, что он не инициирует событие "change" если изменения в элемент input было внесено
    // программно. А поскольку на поле для ввода валюты назначен обработчик на событие input, заменяющий введенное пользователем число на отформатированное число, как раз
    // получается случай, когда значение вводиться программно и событие change не инициируется. Следовательно, расчет депозита, назначенный на change не происходит.
    listDeposits.calculateDeposit = function (event) {

        if (((event.type === 'focusout' || (event.type === 'keydown' && event.keyCode === 13)) 
                && (event.target.className === 'currency' || event.target.className === 'rate')
            )
            || ((event.type === 'change')
                && (event.target.className === 'term' || event.target.className === 'termUnitOfMeasure' || event.target.className === 'rateType')
                )) {

            tr = event.target.closest('tr');
            td = event.target.closest('td');

            deposit.base = converter.stringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[2].querySelector('input').value);
            deposit.replenishment = converter.stringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[3].querySelector('input').value);
            deposit.rate = converter.stringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[4].querySelector('input').value) / 100;
            deposit.term = listDeposits.rows[tr.rowIndex].cells[5].querySelector('select').value === 'months' ? 
                converter.stringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[5].querySelector('input').value) :
                converter.stringToNumberFractionDigits2(listDeposits.rows[tr.rowIndex].cells[5].querySelector('input').value) * 12;
            deposit.rateType = listDeposits.rows[tr.rowIndex].cells[6].querySelector('select').value;

            deposit.calculate();
            
            listDeposits.rows[tr.rowIndex].cells[7].querySelector('input').value = deposit.sumInvested.toLocaleString('ru', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            listDeposits.rows[tr.rowIndex].cells[8].querySelector('input').value = deposit.sumProfit.toLocaleString('ru', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            listDeposits.rows[tr.rowIndex].cells[9].querySelector('input').value = deposit.sumTotal.toLocaleString('ru', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            }
    
    };

    listDeposits.createDeposit = function (event) {
        let tr = document.createElement('tr');

        let tdNameBank = document.createElement('td');

            let tdNameBank_selectWrapper = document.createElement('div');
                tdNameBank_selectWrapper.className = 'selectWrapper';

                let tdNameBank_select = document.createElement('select');
                    tdNameBank_select.className = 'bank';
                    tdNameBank_select.name = 'nameBank';

                    let tdNameBank_option = document.createElement('option');
                        tdNameBank_option.text = 'Выберите банк';
                        tdNameBank_select.append(tdNameBank_option);

                        for (let i=0; i<listBanks.length; i++) {
                            let tdNameBank_option= document.createElement('option');
                            tdNameBank_option.text = listBanks[i].nameRus;
                            tdNameBank_option.value = listBanks[i].nameEng;

                            tdNameBank_select.append(tdNameBank_option);
                        }

            
            tdNameBank_selectWrapper.append(tdNameBank_select);
            tdNameBank.append(tdNameBank_selectWrapper);

        let tdNameDeposit = document.createElement('td');

            let tdNameDeposit_input = document.createElement('input');
                tdNameDeposit_input.type = 'text';
                tdNameDeposit_input.className = 'nameDeposit';
                tdNameDeposit_input.name = 'nameDeposit';
                tdNameDeposit_input.maxLength = 20;
                tdNameDeposit_input.placeholder = 'Название вклада';

            tdNameDeposit.append(tdNameDeposit_input);

        let tdBase = document.createElement('td');

            let tdBase_input = document.createElement('input');
                tdBase_input.type = 'text';
                tdBase_input.className = 'currency';
                tdBase_input.name = 'sumBase';
                tdBase_input.maxLength = 26;
                tdBase_input.value = '0,00 \u20BD';

            tdBase.append(tdBase_input);

        let tdReplenishment = document.createElement('td');

            let tdReplenishment_input = document.createElement('input');
                tdReplenishment_input.type = 'text';
                tdReplenishment_input.className = 'currency';
                tdReplenishment_input.name = 'sumReplenishment';
                tdReplenishment_input.maxLength = 26;
                tdReplenishment_input.value = '0,00 \u20BD';

            tdReplenishment.append(tdReplenishment_input);

        let tdRate = document.createElement('td');

            let tdRate_input = document.createElement('input');
                tdRate_input.type = 'text';
                tdRate_input.className = 'rate';
                tdRate_input.name = 'rate';
                tdRate_input.maxLength = 8;
                tdRate_input.value = '0,00 %';

            tdRate.append(tdRate_input);

        let tdTerm = document.createElement('td');

            let tdTerm_flexContainer = document.createElement('div');
                tdTerm_flexContainer.className = 'tdFlexContainer';

                let tdTerm_input = document.createElement('input');
                    tdTerm_input.type = 'number';
                    tdTerm_input.className = 'term';
                    tdTerm_input.name = 'term';
                    tdTerm_input.min = 0;
                    tdTerm_input.step = 1;
                    tdTerm_input.max = 1200;
                    tdTerm_input.value = 0;

                let tdTerm_selectWrapper = document.createElement('div');
                    tdTerm_selectWrapper.className = 'selectWrapper';

                    let tdTerm_select = document.createElement('select');
                        tdTerm_select.className = 'termUnitOfMeasure';
                        tdTerm_select.name = 'termUnitOfMeasure';

                        let tdTerm_option_months = document.createElement('option');
                            tdTerm_option_months.value = 'months';
                            tdTerm_option_months.text = 'месяцы';

                        let tdTerm_option_years = document.createElement('option');
                            tdTerm_option_years.value = 'years';
                            tdTerm_option_years.text = 'годы';

            tdTerm_select.append(tdTerm_option_months);
            tdTerm_select.append(tdTerm_option_years);
            tdTerm_selectWrapper.append(tdTerm_select);
            tdTerm_flexContainer.append(tdTerm_input);
            tdTerm_flexContainer.append(tdTerm_selectWrapper);
            tdTerm.append(tdTerm_flexContainer);


        let tdRateType = document.createElement('td');

            let tdRateType_selectWrapper = document.createElement('div');
                tdRateType_selectWrapper.className = 'selectWrapper';

                let tdRateType_select = document.createElement('select');
                    tdRateType_select.className = 'rateType';
                    tdRateType_select.name = 'rateType';
                
                    let tdRateType_option_capitalizationPerMonth = document.createElement('option');
                        tdRateType_option_capitalizationPerMonth.value = 'capitalizationPerMonth';
                        tdRateType_option_capitalizationPerMonth.text = 'Ежемесячная капитализация';

                    let tdRateType_option_percentInTheEnd = document.createElement('option');
                        tdRateType_option_percentInTheEnd.value = 'percentInTheEnd';
                        tdRateType_option_percentInTheEnd.text = 'Проценты в конце срока';

            tdRateType_select.append(tdRateType_option_capitalizationPerMonth);
            tdRateType_select.append(tdRateType_option_percentInTheEnd);
            tdRateType_selectWrapper.append(tdRateType_select);
            tdRateType.append(tdRateType_selectWrapper);

        let tdInvested = document.createElement('td');
        
            let tdInvested_input = document.createElement('input');
                tdInvested_input.type = 'text';
                tdInvested_input.className = 'currency';
                tdInvested_input.name = 'sumInvested';
                tdInvested_input.maxLength = 26;
                tdInvested_input.value = '0,00 \u20BD';
                tdInvested_input.disabled = true;

            tdInvested.append(tdInvested_input);

        let tdProfit = document.createElement('td');

            let tdProfit_input = document.createElement('input');
                tdProfit_input.type = 'text';
                tdProfit_input.className = 'currency';
                tdProfit_input.name = 'sumProfit';
                tdProfit_input.maxLength = 26;
                tdProfit_input.value = '0,00 \u20BD';
                tdProfit_input.disabled = true;

            tdProfit.append(tdProfit_input);

        let tdTotal = document.createElement('td');

            let tdTotal_input = document.createElement('input');
                tdTotal_input.type = 'text';
                tdTotal_input.className = 'currency';
                tdTotal_input.name = 'sumTotal';
                tdTotal_input.maxLength = 26;
                tdTotal_input.value = '0,00 \u20BD';
                tdTotal_input.disabled = true;

            tdTotal.append(tdTotal_input);

        let tdControl = document.createElement('td');

            let tdControl_flexContainer = document.createElement('div');
                tdControl_flexContainer.className = 'tdFlexContainer';

                let tdControl_button_add = document.createElement('button');
                    tdControl_button_add.type = 'button';
                    tdControl_button_add.className = 'btnAddDepositAfter';
                    tdControl_button_add.dataset.description = 'Добавить новый вклад';

                let tdControl_img_add = document.createElement('img');
                    tdControl_img_add.src = "images/plus-solid.svg";
                    tdControl_img_add.height = 20;
                    tdControl_img_add.width = 20;


                let tdControl_button_copy = document.createElement('button');
                    tdControl_button_copy.type = 'button';
                    tdControl_button_copy.className = 'btnCopyDeposit';
                    tdControl_button_copy.dataset.description = 'Скопировать вклад';

                    let tdControl_img_copy = document.createElement('img');
                        tdControl_img_copy.src = 'images/copy-solid.svg';
                        tdControl_img_copy.height = 16;
                        tdControl_img_copy.width = 16;
                
                let tdControl_button_delete = document.createElement('button');
                    tdControl_button_delete.type = 'button';
                    tdControl_button_delete.className = 'btnDeleteDeposit';
                    tdControl_button_delete.dataset.description = 'Удалить вклад';

                    let tdControl_img_delete = document.createElement('img');
                        tdControl_img_delete.src = 'images/xmark-solid.svg';
                        tdControl_img_delete.height = 24;
                        tdControl_img_delete.width = 24;

            tdControl_button_add.append(tdControl_img_add);
            tdControl_button_copy.append(tdControl_img_copy);
            tdControl_button_delete.append(tdControl_img_delete);
            tdControl_flexContainer.append(tdControl_button_add);
            tdControl_flexContainer.append(tdControl_button_copy);
            tdControl_flexContainer.append(tdControl_button_delete);
            tdControl.append(tdControl_flexContainer);

        tr.append(tdNameBank);
        tr.append(tdNameDeposit);
        tr.append(tdBase);
        tr.append(tdReplenishment);
        tr.append(tdRate);
        tr.append(tdTerm);
        tr.append(tdRateType);
        tr.append(tdInvested);
        tr.append(tdProfit);
        tr.append(tdTotal);
        tr.append(tdControl);

        return tr;
    }

    listDeposits.addDepositAfter = function (event) {
        if ((event.target.nodeName.toLowerCase() === 'button' && event.target.className === 'btnAddDepositAfter') ||
            (event.target.parentElement.nodeName.toLowerCase() === 'button' && event.target.parentElement.className === 'btnAddDepositAfter')) {
            
            let trCurrent = event.target;

            while (trCurrent.nodeName.toLowerCase() !== 'tr') {
                trCurrent = trCurrent.parentElement;
            }

            let depositNew = listDeposits.createDeposit();
            trCurrent.after(depositNew);

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

            let depositNew = listDeposits.createDeposit();
            trLast.before(depositNew);

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
                    sumInvested: String(listDeposits.rows[i].querySelector('[name=sumInvested]').value),
                    sumProfit: String(listDeposits.rows[i].querySelector('[name=sumProfit]').value),
                    sumTotal: String(listDeposits.rows[i].querySelector('[name=sumTotal]').value),
                };

                localStorage[key]=JSON.stringify(dataRow);
            }
        }

    }

    listDeposits.loadDeposits = function () {

        if (localStorage.length > 0) {
            for (let i=1; i < listDeposits.rows.length - 1; i++) {
                listDeposits.deleteRow(i);
            }
    
            for (let i=1; i <= localStorage.length; i++) {
    
                rowStorage = JSON.parse(localStorage.getItem('tr'+i));
    
                let rowCurrent = listDeposits.createDeposit();
    
                rowCurrent.querySelector('[name=nameBank]').selectedIndex = rowStorage.nameBank;
                rowCurrent.querySelector('[name=nameDeposit]').value = rowStorage.nameDeposit;
                rowCurrent.querySelector('[name=sumBase]').value = rowStorage.sumBase;
                rowCurrent.querySelector('[name=sumReplenishment]').value = rowStorage.sumReplenishment;
                rowCurrent.querySelector('[name=rate]').value = rowStorage.rate;
                rowCurrent.querySelector('[name=term]').value = rowStorage.term;
                rowCurrent.querySelector('[name=termUnitOfMeasure]').selectedIndex = rowStorage.termUnitOfMeasure;
                rowCurrent.querySelector('[name=rateType]').selectedIndex = rowStorage.rateType;
                rowCurrent.querySelector('[name=sumInvested]').value = rowStorage.sumInvested;
                rowCurrent.querySelector('[name=sumProfit]').value = rowStorage.sumProfit;
                rowCurrent.querySelector('[name=sumTotal]').value = rowStorage.sumTotal;
    
                let rowLast = listDeposits.rows.item(listDeposits.rows.length-1);
    
                rowLast.before(rowCurrent);
            }
        }
    }

    listDeposits.addEventListener('input', listDeposits.formatInput);
    listDeposits.addEventListener('change', listDeposits.calculateDeposit);
    listDeposits.addEventListener('focusout', listDeposits.calculateDeposit);
    listDeposits.addEventListener('focusout', listDeposits.saveDeposits);
    listDeposits.addEventListener('focusin', listDeposits.addListBanksToSelect);
    listDeposits.addEventListener('click', listDeposits.addDepositAfter);
    listDeposits.addEventListener('click', listDeposits.addDepositToTheEnd);
    listDeposits.addEventListener('click', listDeposits.copyDeposit);
    listDeposits.addEventListener('click', listDeposits.deleteDeposit);
    listDeposits.addEventListener('keydown', listDeposits.calculateDeposit);
    listDeposits.addEventListener('keydown', listDeposits.saveDeposits);

    window.addEventListener('load', listDeposits.loadDeposits);

