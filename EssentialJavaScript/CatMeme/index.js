import { catsData } from "./data.js"

const emotionRadios = document.getElementById('emotion-radios')

const getImageBtn = document.getElementById('get-image-btn')


// emotionRadios.addEventListener('change', function(e){
//     console.log(e.target.id)
// })

emotionRadios.addEventListener('change', highlightCheckedOption)
emotionRadios.addEventListener('change', highlightCheckedOption)


function getMatchingCatsArray(){

    // Add operation logic to prevent the function from running if no radio button is selected
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        console.log(selectedEmotion)
    }
}

function highlightCheckedOption(e) {
    // document.getElementById(e.target.id).classList.add('highlight')

    // console.log(e.target.id)

    const radiosArray = document.getElementsByClassName('radio')
    for (let radio of radiosArray) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function getEmotionsArray(cats) {

    const emotionsArray = []

    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            // console.log(emotion)

            // Remove duplicates from the array
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }

    }
    // console.log(emotionsArray)
    return emotionsArray

}

// getEmotionsArray(catsData)

const emotionRadios = document.getElementById('emotion-radios')

function renderEmotionsRadios(cats) {
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions) {
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input
                    type="radio"
                    id="${emotion}"
                    value="${emotion}"
                    name="emotions"
                >
            </div>`
    }
    emotionRadios.innerHTML = radioItems
}


renderEmotionsRadios(catsData)

