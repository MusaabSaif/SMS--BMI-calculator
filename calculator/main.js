const calculator= document.getElementById("display");

function appendtoDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    display.value = eval(display.value);
}

function clearoneElement(){
    let currentValue = display.value
    display.value = currentValue.slice(0 , -1);
}
