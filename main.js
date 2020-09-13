let timer

let deleteFirstPhotoDelay

async function start(){
   try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message)
   } catch (e) {
    console.log("There was an unexpected error in fetching breed list data!")
   }
}

start()

function createBreedList(breedList){
    document.getElementById("breed").innerHTML =  `
    <select onchange="loadByBreed(this.value)">
        <option>Choose dog breed</option>
        ${Object.keys(breedList).map(function(breed){
            return `<option>${breed}</option>`
        }).join('')}
    </select>
    `
}

async function loadByBreed(breed){
    if (breed != "Choose dog breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideShow(data.message)
    }
}

function createSlideShow(images){
    let curretPos = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)

    if (images.length > 1) {

        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style = "background-image: url('${images[0]}');"></div>
        <div class="slide" style = "background-image: url('${images[1]}');"></div>
        `
    curretPos += 2
    if (images.length == 2) curretPos = 0
    timer = setInterval(nextSlide, 5000)
    } else {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style = "background-image: url('${images[0]}');"></div>
        <div class="slide"></div>
        `
    }

    function nextSlide(){
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style = "background-image: url('${images[curretPos]}');"></div>`)
        deleteFirstPhotoDelay = setTimeout(function(){
            document.querySelector(".slide").remove()
        }, 1000)
        if (curretPos + 1 >= images.length) {
            curretPos = 0
        } else {
            curretPos++
        }
    }
}