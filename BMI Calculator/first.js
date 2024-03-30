// accessing all the divs through their id's //

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight"); 
const result = document.getElementById("results");
const calculateBtn = document.querySelector("button");
const resetBtn = document.querySelector("button");

// adding the event listeners //

/*resetBtn.addEventListener ("click" , function(event) {
    display.value = "";
});*/

calculateBtn.addEventListener ("click" , function(event){
    event.preventDefault();

    const height = parseFloat(heightInput.value) / 100;
    const weight = parseFloat(weightInput.value);

    if (!isNaN (height) && !isNaN (weight)) {
        const bmi = calculateBMI(height,weight);
        result.textContent = `BMI : ${bmi.toFixed(1)}`;

        displayBMIResult (bmi);
    } else {
        result.textContent = "Invalid Input";
    }
});

function calculateBMI(height,weight) {
    return weight / (height * height);
}

function displayBMIResult (bmi) {
    const weightGuide = document.getElementById("weight-guide");
    if (bmi < 18.6) {
        weightGuide.textContent = "Underweight";
    }  else if (bmi > 18.6 && bmi <= 24.9) {
        weightGuide.textContent = "Normal weight";
    }  else {
        weightGuide.textContent = "Overweight";
    }
};

