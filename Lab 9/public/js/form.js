//form submit stuff
const primeForm = document.getElementById('primeForm');
const primeInput = document.getElementById('number');
const errorDiv = document.getElementById('error');
const attempts = document.getElementById('attempts');


(function () {
function primes(num) {
    //checks if number is prime or not
    if (typeof num != 'number'){ //input check
      return false;
    }
    if (!num) {
        return false;
    }
    if (num <= 1){
        return false;
    }
    for (let i = 2; i<num; i++){
        if (num % i === 0){
            return false; // its composite
        }
    }
    return true;
}



if (primeForm) { // confused
  primeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(primeInput.value);
    if (primeInput.value.trim()) { // get the value of the element
      errorDiv.hidden = true; 
      let li = document.createElement('li');
      li.innerHTML = primeInput.value;
      //determine whether or not the number is a prime number
      if (parseInt(primeInput.value) < 0) {
        errorDiv.innerHTML = 'Error: Value cannot be negative';
        attempts.appendChild(errorDiv);
      }
      if (primes(parseInt(primeInput.value))){ // calling the prime function 
        li.classList.add("is-prime"); // add list item to attempts
        li.innerHTML = primeInput.value + " is a prime number";
        attempts.appendChild(li);
      } else {
        console.log( typeof parseInt(primeInput.value));
        li.classList.add("not-prime");// add list item to attempts
        li.innerHTML = primeInput.value + " is NOT a prime number";
        attempts.appendChild(li);
      }
      primeForm.reset();
      primeInput.focus();
    } else {
      primeInput.value = '';
      errorDiv.hidden = false;
      errorDiv.innerHTML = 'Error: You must enter a value!';
      errorDiv.className = 'error';
      primeInput.focus();
      primeInput.className = 'inputClass';
    }
  });
}

})();