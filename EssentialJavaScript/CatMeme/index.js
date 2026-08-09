import {catsData} from "./data.js"


function getEmotionsArray(cats){
/*
Challenge:
1. Set up a const and initialise it with 
   an empty array.
2. Instead of logging out each emotion, 
   push each one to the new array.
3. At the end of the function, log out the 
   const holding the new array.
*/ 

    const emotionsArray = []

    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            // console.log(emotion)
            emotionsArray.push(emotion)
        }
        
    }
    // console.log(emotionsArray)
    return emotionsArray
    
}

// getEmotionsArray(catsData)

const emotionRadios = document.getElementById('emotion-radios')

function renderEmotionsRadios(cats){
    const emotions = getEmotionsArray(cats)
    // console.log(emotions)
    let radioItems = ''
    
    for (let emotion of emotions){
        radioItems += `<p>${emotion}</p>`
    }
    
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)

