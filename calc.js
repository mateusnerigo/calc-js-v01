const upVisor = document.appForm.appInput;
const visor = document.appForm.appOutput;

window.onload = reset();

var dotOn = false;
var operationOn = false;
var canReset = false;
var operation = '';

window.onclick = e => {
    let clickedValue = e.target.getAttribute("value");
    
    if (clickedValue == '.' 
    || (clickedValue != null 
    && clickedValue != '=' 
    && clickedValue != '←' 
    && clickedValue != 'C')) {
        button(clickedValue);
    };
    
    switch (clickedValue) {
        case '←': 
            buttonBackspace(upVisor);
            break;
        case '=':
            if (visor.value == 0) {
                reset();
                break;
            } else {
                visor.value = upVisor.value;
                calculateVisor();
                upVisor.value = visor.value;
                visor.value = '';
                canReset = true;
                break;
            }
        case 'C': 
            reset();
            break;
    }

};

function button(num) {
    let textArea = upVisor.value;
    
    if (num == '+'
    || num == '-'
    || num == '/'
    || num == '*') {
        calculateVisor();
        dotOn = false;
        canReset = false;
       
        if (num != operation && operationOn == true) {

            buttonBackspace(upVisor);
            operationOn = true;
            operation = num;
        }
        
        if (operationOn == false) {
            upVisor.value = textArea + num;
        }

        operationOn = true;
    } else if (num == '.'){
        if (dotOn == false) {
            upVisor.value = textArea + num;
            dotOn = true;
        }
        canReset = false;
    } else {
        if (canReset) {
            upVisor.value = num;
            canReset = false;
        } else {
            upVisor.value = textArea + num;
        }
    }
};

function buttonBackspace(selectedVisor) {
    let textArea = selectedVisor.value;
    
    if (operationOn) {
        operationOn = false;
    }

    if (textArea.length > 1) {
        selectedVisor.value = textArea.toString().slice(0, -1);;
    } else {
        reset();
    }  
}

function reset() {
    upVisor.value = '';
    visor.value = 0;
    dotOn = false;
    canReset = false;
}

function calculateVisor() {
    // console.clear();
    //visor.value = eval(upVisor.value) || 0;
}

function verifyVisor() {
    if (upVisor.value.length >= 1) {
        upVisor.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    } else {
        upVisor.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
    }
    
    if (upVisor.value.length >= 11) {
        upVisor.style.fontSize = '20px';
    } else {
        upVisor.style.fontSize = '40px';
    }

    if (upVisor.value.length >= 44) {
        upVisor.style.height = "80px";
    } else {
        upVisor.style.height = "60px";
    }

    if (visor.value.length >= 16) {
        buttonBackspace(visor);
    }
    
    if (upVisor.value.length >= 66) {
        buttonBackspace(upVisor);
    }
        
}

setInterval(calculateVisor, 10);
setInterval(verifyVisor, 10);