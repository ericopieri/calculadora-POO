class CalcController {

    constructor() {


        this._lastNumber;
        this._lastOperator;
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        
    }
    
    initialize() {
        
        this.setDisplayTimeAndDate();
        
        setInterval(() => {
            this.setDisplayTimeAndDate();
        }, 1000);

        this.showLastNumberOnDisplay();
        
    }

    setDisplayTimeAndDate() {

        this.displayDate = this.currentDate.toLocaleDateString(this.locale, {
            day: '2-digit', month: 'long', year: 'numeric'
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);

    }
    
    initButtonsEvents() {

        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach(button => {
            this.addEventListenerAll(button, 'click drag', e => {
                const textButton = button.classList[0].replace('btn-', '');
                this.execButton(textButton);
            });
        });

        buttons.forEach(button => {
            this.addEventListenerAll(button, 'mouseover mouseup mousedown', e => {
                button.style.cursor = 'pointer';
            });
        });

    }

    addEventListenerAll(button, eventList, fn) {

        eventList.split(' ').forEach(event => {
            button.addEventListener(event, fn, false);
        });

    }

    execButton(textButton) {

        switch (textButton) {
            case 'ac':
                this.clearAll();
                console.log(this._operation);
                break
            case 'ce':
                this.clearEntry();
                console.log(this._operation);
                break
            case 'soma':
                this.addOperator('+');
                console.log(this._operation);
                break
            case 'subtracao':
                this.addOperator('-');
                console.log(this._operation);
                break
            case 'multiplicacao':
                this.addOperator('*');
                console.log(this._operation);
                break
            case 'divisao':
                this.addOperator('/');
                console.log(this._operation);
                break
            case 'porcento':
                this.addOperator('%');
                console.log(this._operation);
                break
            case 'igual':
                this.calc();
                console.log(this._operation);
                break
            case 'ponto':
                this.addOperator('.');
                console.log(this._operation);
                break
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperator(parseInt(textButton));
                console.log(this._operation);
                break
            default:
                this.setError();
                break
        }

    }

    getLastOperator() {
        return this._operation[this._operation.length - 1];
    }

    isOperator(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }

    replaceLastIndex(newValue) {
        this._operation[this._operation.length - 1] = newValue;
    }

    pushOperator(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {
            this.calc();
        }

    }

    getCalcResult() {

        return eval(this._operation.join(''));

    }

    calc() {

        let lastOperator;

        this._lastOperator = this.getLastItem(); // guarda o último operador do array this._operation;

        if (this._operation.length < 3) {
            
            let firstNumber = this._operation[0];
            this._operation = [firstNumber, this._lastOperator, this._lastNumber];

        }
        
        if (this._operation.length > 3) {

            lastOperator = this._operation.pop();

            this._lastNumber = this.getCalcResult();

            console.log(this._lastNumber);
            console.log(this._lastOperator);

        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);

        }

        let result = [this.getCalcResult()];

        if (lastOperator == '%') {

            result[0] /= 100;

        } else {

            if (lastOperator) result.push(lastOperator);

        }

        this._operation = result;

        this.showLastNumberOnDisplay();

    }

    addOperator(value) {

        if (isNaN(this.getLastOperator())) {
            if (this.isOperator(value)) {
                if (this.getLastOperator()) {
                    this.replaceLastIndex(value);
                }
            } else if (isNaN(value)) {
                console.log(value);
            } else {
                this.pushOperator(value);
                this.showLastNumberOnDisplay();
            }
        } else {
            if (this.isOperator(value)) {
                this.pushOperator(value);
            } else if (isNaN(value)) {
                console.log(value)
            } else {
                let newValue = `${this.getLastOperator().toString()}${value.toString()}`;
                this.replaceLastIndex(parseInt(newValue));
                this.showLastNumberOnDisplay();
            }
        }

    }

    getLastItem(isOperator = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break
            }
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;

    }

    showLastNumberOnDisplay() {

        let lastItem = this.getLastItem(false);

        if (!lastItem) lastItem = 0;

        this.displayCalc = lastItem;

    }

    clearAll() {
        this._operation = [];
        this._lastNumber = 0;
        this.showLastNumberOnDisplay();
    }

    clearEntry() {
        this._operation.pop();
        this.showLastNumberOnDisplay();
    }

    setError() {
        this.displayCalc = 'Error';
    }

    get locale() {
        return this._locale;
    }
    
    set locale(value) {
        this._locale = value;
    }
    
    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }
    
    set currentDate(value) {
        this._currentDate = value;
    }

};