/*
Challenge:
1. Take control of the close button.
2. Use an event listener to set the display 
   property of the modal to 'none' when the
   close button is clicked.
*/

const modal = document.getElementById('modal')
const modalButton = document.getElementById('modal-close-btn')

modalButton.addEventListener('click', () => { 
  modal.style.display = 'none'; 
});
 
setTimeout(function(){
    modal.style.display = 'inline'
}, 1500)


const consentForm = document.getElementById('consent-form') 

consentForm.addEventListener('submit', function(e) {
    e.preventDefault()
    
    console.log('form submitted')
})