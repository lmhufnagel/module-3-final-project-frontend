document.addEventListener('DOMContentLoaded', function() {
  const houseDiv = document.getElementById("houses")
  getHouses()

function getHouses() {
  fetch('http://localhost:3000/api/haunted_houses')
  .then(res => res.json())
  .then(json => renderHouses(json))
}



function renderHouses(json) {
  json.forEach(house => {

    const newHouse = new HauntedHouse(house.id, house.name, house.description, house.location, house.image)
    const newHouseDiv = document.createElement('div')
    newHouseDiv.setAttribute('id', `div-${newHouse.id}`)

    const houseTitle = document.createElement('h3')
    houseTitle.innerText = newHouse.name

    const houseImg = document.createElement('img')
    houseImg.setAttribute('src', `${newHouse.image}`)
    houseImg.setAttribute('height', 200)
    houseImg.setAttribute('width', 350)

    const houseDesc = document.createElement('p')
    houseDesc.innerText = newHouse.description

    const reviewForm = document.createElement('form')
    reviewForm.dataset.id = newHouse.id
    reviewForm.setAttribute('class', 'reviewForm')
    const nameInput = document.createElement('input')
    nameInput.setAttribute('placeholder', 'Your Name:')
    const bodyInput = document.createElement('textarea')
     bodyInput.setAttribute('placeholder', 'Your Review:')
    const br1 = document.createElement('br')
    const br2 = document.createElement('br')
    const br3 = document.createElement('br')
    const br4 = document.createElement('br')
    const br5 = document.createElement('br')
    const reviewSubmit = document.createElement('input')
    reviewSubmit.setAttribute('type', 'submit')
    const starSpan = document.createElement('span')
    starSpan.setAttribute('class', 'rating')
    starSpan.innerHTML = `<input id="house${newHouse.id}rating5" type="radio" name="rating" value="5">
    <label for="house${newHouse.id}rating5">5</label>
    <input id="house${newHouse.id}rating4" type="radio" name="rating" value="4">
    <label for="house${newHouse.id}rating4">4</label>
    <input id="house${newHouse.id}rating3" type="radio" name="rating" value="3">
    <label for="house${newHouse.id}rating3">3</label>
    <input id="house${newHouse.id}rating2" type="radio" name="rating" value="2" >
    <label for="house${newHouse.id}rating2">2</label>
    <input id="house${newHouse.id}rating1" type="radio" name="rating" value="1">
    <label for="house${newHouse.id}rating1">1</label>`
    reviewForm.appendChild(starSpan)
    reviewForm.appendChild(br5)
    reviewForm.appendChild(nameInput)
    reviewForm.appendChild(br1)
    reviewForm.appendChild(br2)
    reviewForm.appendChild(bodyInput)
    reviewForm.appendChild(br3)
    reviewForm.appendChild(br4)
    reviewForm.appendChild(reviewSubmit)

    // const displayReviews = document.createElement('div')
    // const reviewBody =

    const showReviewsButton = document.createElement("button")
    showReviewsButton.innerText = "Reviews"
    showReviewsButton.dataset.id = newHouse.id

    showReviewsButton.addEventListener('click', e => {
      fetch(`http://localhost:3000/api/haunted_houses/${reviewForm.dataset.id}`)
      .then(res => res.json())
      .then(json => {
        json.reviews.forEach(review => {
          const reviewtag = document.createElement('p')
          reviewtag.innerHTML = `${review.name} <br> ${review.body}`
          const divPointer = document.getElementById(`div-${reviewForm.dataset.id}`)
          divPointer.appendChild(reviewtag)
        })
      })
    })

    const iframeDiv = document.createElement('div')
    const fixedLocation = newHouse.location.split(" ").join("+")
    const iframeURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCatqH_xgBBnxAdoAvlkNdLRdTz4Go8JxU&q=" + fixedLocation

    iframeDiv.innerHTML = `<iframe width="540" height="405" frameborder="0" style="border:0" src='${iframeURL}' allowfullscreen> </iframe>`
    newHouseDiv.appendChild(houseTitle)
    newHouseDiv.appendChild(houseImg)
    newHouseDiv.appendChild(houseDesc)
    newHouseDiv.appendChild(reviewForm)
    newHouseDiv.appendChild(iframeDiv)
    houseDiv.appendChild(newHouseDiv)
    houseDiv.appendChild(showReviewsButton)


    reviewForm.addEventListener('submit', e => {
      e.preventDefault()
      let counter = 0
      const targetArr = Array.from(e.target)
      const ratingCounters = targetArr.slice(0,5)
      ratingCounters.forEach(tinydot => {
        if (tinydot.checked === true) {
          counter = tinydot.value
        }
      })
      fetch('http://localhost:3000/api/reviews', {
        method: "POST",
        body: JSON.stringify({name: e.target[5].value, body: e.target[6].value, rating: counter, haunted_house_id: reviewForm.dataset.id}),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
    })
    e.target[0].value = ""
    e.target[1].value = ""
    })

// <button onclick="toggleClock()" id="clockButton">Show clock</button>
  })
//   showReviewsButton.addEventListener('click', e => displayReviews())
//
// function displayReviews() {
//
//   fetch(`http://localhost:3000/api/${reviewForm.dataset.id}`)
//   .then(res => res.json())
//   .then(json => )
//
//     // get the clock
//     const allReviews = ;
//
//     // get the current value of the clock's display property
//     var displaySetting = myClock.style.display;
//
//     // also get the clock button, so we can change what it says
//     var clockButton = document.getElementById('clockButton');
//
//     // now toggle the clock and the button text, depending on current state
//     if (displaySetting == 'block') {
//       // clock is visible. hide it
//       myClock.style.display = 'none';
//       // change button text
//       clockButton.innerHTML = 'Show clock';
//     }
//     else {
//       // clock is hidden. show it
//       myClock.style.display = 'block';
//       // change button text
//       clockButton.innerHTML = 'Hide clock';
//     }
//   }
}

})


// https://emojipedia.org/skull/
