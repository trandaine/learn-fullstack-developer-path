// reference html elements
const form = document.getElementById('form');
const numOneInput = document.getElementById('num1');
const numTwoInput = document.getElementById('num2');
const resultText = document.getElementById('result');

// form event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const numOneVal = numOneInput.value;
    const numTwoVal = numTwoInput.value;
    
    // even though we put numbers into the input fields, they become strings in javascript
    console.log(`numOneVal is of type: ${typeof numOneVal}, with a value of ${numOneVal}`);
    console.log(`numTwoVal is of type: ${typeof numTwoVal}, with a value of ${numTwoVal}`);
    // if we add 2 numbers together, they concatinate, which is not what we want. We need to convert them to numbers
    resultText.innerText = `${numOneVal} + ${numTwoVal} = ${numOneVal + numTwoVal}`;
})
