console.log('%c HI', 'color: firebrick')

// Challenge 1
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
let results

fetch(imgUrl)
.then(resp => resp.json())
.then(json => results = json)

function addImagesToDom() {
    for (let i=0; i<results.message.length; i++) {
        let dogImage = document.createElement('img')
        dogImage.src = results.message[i]
        document.body.append(dogImage)
    }
}

setTimeout(() => addImagesToDom(), 1000)

// Challenge 2
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let allBreeds

fetch(breedUrl)
.then(resp => resp.json())
.then(json => allBreeds = json)

function addBreedsToList() {
    for (const breed in allBreeds.message) {
        let dogBreed = document.createElement('li')
        dogBreed.innerHTML = breed
        dogBreed.classList.add(breed)
        document.getElementById('dog-breeds').append(dogBreed)
    }
}

setTimeout(() => addBreedsToList(), 2000)


// Challenge 3
function addListenerToListObjects() {
    let listItems = document.querySelectorAll('ul#dog-breeds li')
    for (let i=0; i<listItems.length; i++) {
        listItems[i].addEventListener("click", changeColor)
    }
}
setTimeout(() => addListenerToListObjects(), 3000)

function changeColor(e) {
    document.querySelector(`li.${e.path[0].className}`).style.color = "red"
}


// Challenge 4
// select#breed-dropdown option

function addDropdownListener() {
    const breedFilter = document.querySelector('select#breed-dropdown')
    breedFilter.addEventListener('change', filterResults)
}

setTimeout(() => addDropdownListener(), 1000)

let filteredList = []

function filterResults(e) {
    console.log(e.target.value)
    filteredList = []
    document.getElementById('dog-breeds').innerHTML = ""
    addBreedsToList()
    let oldList = document.querySelectorAll('ul#dog-breeds li')
    let newList = [...oldList]
    for (let i=0; i<newList.length; i++) {
        if (newList[i].innerHTML[0] === `${e.target.value}`) {
            filteredList.push(newList[i])
        }
    }
    updateList()
}

function updateList() {
    document.getElementById('dog-breeds').innerHTML = ""
    // for (const breed in filteredList) {
    //     let dogBreed = document.createElement('li')
    //     dogBreed.innerHTML = breed.value
    //     dogBreed.classList.add(breed.value)
    //     document.getElementById('dog-breeds').append(dogBreed)
    // }
    for (let i=0; i<filteredList.length; i++) {
        let dogBreed = document.createElement('li')
        dogBreed.innerHTML = filteredList[i].innerHTML
        dogBreed.classList.add(filteredList[i].innerHTML)
        document.getElementById('dog-breeds').append(dogBreed)
    }
    addListenerToListObjects()
}