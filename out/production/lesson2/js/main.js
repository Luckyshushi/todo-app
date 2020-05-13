var actionClicked = false;
var commaClicked = false;
var firstNumber = 0;
var tempAction = "";


function addNumber(number) {

    console.log(number);

    var inputValue = document.getElementById('result').value;
    if (inputValue == 0 && number === "."  || actionClicked && number == ".") {
        document.getElementById('result').value = "0.";
        actionClicked = false;
    } else if (inputValue.includes(".") && number === ".") {
        document.getElementById('result').value = inputValue;
        commaClicked = false;
    }else if (inputValue === "0" || actionClicked === true) {
        console.log(actionClicked, inputValue);
        document.getElementById('result').value = number;
        actionClicked = false;
    } else {
        document.getElementById('result').value = inputValue + number;
    }


}

function Action(action) {
    actionClicked = true;
    firstNumber = document.getElementById('result').value;
    tempAction = action;
}

function equal() {
    var secondNumber = document.getElementById('result').value;
    var result = 0;
    if (tempAction == "+") {
        result = parseFloat(secondNumber) + parseFloat(firstNumber);
        document.getElementById('result').value = result;
    } else if (tempAction == "-") {
        result = parseFloat(firstNumber) - parseFloat(secondNumber);
        document.getElementById('result').value = result;
    } else if (tempAction == "*") {
        result = parseFloat(firstNumber) * parseFloat(secondNumber);
        document.getElementById('result').value = result;
    } else if (tempAction == "/") {
        result = parseFloat(firstNumber) / parseFloat(secondNumber);
        document.getElementById('result').value = result;
    }


}

function AC() {
    actionClicked = false;
    tempAction = "";
    firstNumber = 0;
    document.getElementById('result').value = "0";
}

function Comma() {
    commaClicked = true;
    console.log(commaClicked)
}


window.onkeyup = function (event) {
    if (event.which == 49 || event.keyCode == 49) {
        addNumber("1");
    } else if (event.which == 50 || event.keyCode == 50) {
        addNumber("2");
    } else if (event.which == 51 || event.keyCode == 51) {
        addNumber("3");
    } else if (event.which == 52 || event.keyCode == 52) {
        addNumber("4");
    } else if (event.which == 53 || event.keyCode == 53) {
        addNumber("5");
    } else if (event.which == 54 || event.keyCode == 54) {
        addNumber("6");
    } else if (event.which == 55 || event.keyCode == 55) {
        addNumber("7");
    } else if (event.which == 56 || event.keyCode == 56) {
        addNumber("8");
    } else if (event.which == 57 || event.keyCode == 57) {
        addNumber("9");
    } else if (event.which == 48 || event.keyCode == 48) {
        addNumber("0");
    } else if (event.which == 97 || event.keyCode == 97) {
        addNumber("1");
    } else if (event.which == 98 || event.keyCode == 98) {
        addNumber("2");
    } else if (event.which == 99 || event.keyCode == 99) {
        addNumber("3");
    } else if (event.which == 100 || event.keyCode == 100) {
        addNumber("4");
    } else if (event.which == 101 || event.keyCode == 101) {
        addNumber("5");
    } else if (event.which == 102 || event.keyCode == 102) {
        addNumber("6");
    } else if (event.which == 103 || event.keyCode == 103) {
        addNumber("7");
    } else if (event.which == 104 || event.keyCode == 104) {
        addNumber("8");
    } else if (event.which == 105 || event.keyCode == 105) {
        addNumber("9");
    } else if (event.which == 96 || event.keyCode == 96) {
        addNumber("0");
    }
};
