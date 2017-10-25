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
    console.log(newHouse);
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
    const reviewSubmit = document.createElement('input')
    reviewSubmit.setAttribute('type', 'submit')
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

    newHouseDiv.appendChild(houseTitle)
    newHouseDiv.appendChild(houseImg)
    newHouseDiv.appendChild(houseDesc)
    newHouseDiv.appendChild(reviewForm)
    houseDiv.appendChild(newHouseDiv)
    houseDiv.appendChild(showReviewsButton)


    reviewForm.addEventListener('submit', e => {
      e.preventDefault()
      fetch('http://localhost:3000/api/reviews', {
        method: "POST",
        body: JSON.stringify({name: e.target[0].value, body: e.target[1].value, haunted_house_id: reviewForm.dataset.id}),
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
