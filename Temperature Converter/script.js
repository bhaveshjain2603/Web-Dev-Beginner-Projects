const celsius = document.querySelector("#celsius"),
  farenheit = document.querySelector("#farenheit");

// When the page loads set focus to the Celsius input field
// window.addEventListener("load", () => celsius.focus());

//Convert Celsius to Farenheit when Celsius value changes
celsius.addEventListener("input", () => {
  farenheit.value = ((celsius.value * 9) / 5 + 32).toFixed(2);
    
  //When Celsius input is empty clear farenheit input
  if(!celsius.value){
    farenheit.value = " ";
  }
}) 

//Convert Farenheit to Celsius when Farenheit value changes
farenheit.addEventListener("input", () => {
  celsius.value = (((farenheit.value - 32) * 5) / 9).toFixed(2);

  //When farenheit input is empty clear celsius input
  if(!farenheit.value){
    celsius.value = " ";
  }
})

