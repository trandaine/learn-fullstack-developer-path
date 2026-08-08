const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const consentForm = document.getElementById('consent-form')
const modalText = document.getElementById('modal-text')

setTimeout(function () {
  modal.style.display = 'inline'
}, 1500)

modalCloseBtn.addEventListener('click', function () {
  modal.style.display = 'none'
})

consentForm.addEventListener('submit', function (e) {
  e.preventDefault()
  modalCloseBtn.disabled = true



  const consentFormData = new FormData(consentForm)

  console.log(consentFormData)
  const fullName = consentFormData.get('fullName')



  modalText.innerHTML = `
        <div class="modal-inner-loading">
            <img src="images/loading.svg" class="loading">
            <p id="uploadText">
                Uploading your data to the dark web...
            </p>
        </div>
    `

  setTimeout(function () {
    document.getElementById('upload-text').innerText = "Making the sale..."

    setTimeout(function () {
      document.getElementById('modal-inner').innerHTML = `
            <h2>Thanks <span class="modal-display-name">${fullName}</span>, you sucker! </h2>
            <p>We just sold the rights to your eternal soul.</p>
            <div class="idiot-gif">
                <img src="images/pirate.gif">
            </div>
        `
      modalCloseBtn.disabled = false

    }, 1500)
  }, 1500)
})


