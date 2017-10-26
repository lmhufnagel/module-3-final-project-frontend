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
    const newHouse = new HauntedHouse(house.id, house.name, house.description, house.location, house.image, house.reviews)
    const portfolioItem = document.createElement('div')
    portfolioItem.setAttribute('class', 'col-lg-6 portfolio-item')
    portfolioItem.innerHTML = `<div data-id="${newHouse.id}" class="card h-100" height="200" width="150">
            <a href="#"><img data-id="${newHouse.id}" class="card-img-top" height="300" width="200" src="${newHouse.image}" alt=""></a>
            <div data-id="${newHouse.id}" class="card-body">
              <h4 data-id="${newHouse.id}" class="card-title">
                <a href="#" data-id="${newHouse.id}">${newHouse.name}</a>
              </h4>
              <p data-id="${newHouse.id}" class="card-text">${newHouse.description}</p><br>

            </div>
          </div>`
    const rows = document.getElementById('rowDiv')
    rows.appendChild(portfolioItem)

  })
  const cardDiv = document.getElementsByClassName("card h-100")
  const cardDivArray = Array.from(cardDiv)
  cardDivArray.forEach(card => {
    card.addEventListener("click", e =>{
      document.getElementById("rowDiv").innerHTML = ""
      const houseObj = json.find(arr => arr.id === parseInt(e.target.dataset.id))
      document.getElementById("header").innerText = houseObj.name
      const newHouseDiv = document.createElement('div')
      newHouseDiv.setAttribute('class', 'showDiv')
      const houseImg = document.createElement('img')
      houseImg.setAttribute('src', `${houseObj.image}`)
      houseImg.setAttribute('height', 200)
      houseImg.setAttribute('width', 350)
      const houseInst = HauntedHouse.all.find(house => house.id === parseInt(e.target.dataset.id))
      const houseScareRating = document.createElement('div')

      if(houseInst.scareFactor() === 1) {
        houseScareRating.innerHTML = `<b>Scare Factor: </b><img src="stylesheets/skull2.png" width="40" height="40">`
        houseScareRating.setAttribute('class', 'scaryfont')
      } else if (houseInst.scareFactor() === 2) {
        houseScareRating.innerHTML = `<b>Scare Factor: </b><img src="stylesheets/skull2.png" width="40" height="40"><img src="stylesheets/skull2.png" width="40" height="40">`
        houseScareRating.setAttribute('class', 'scaryfont')
      } else if (houseInst.scareFactor() === 3) {
        houseScareRating.innerHTML = `<b>Scare Factor: </b><img src="stylesheets/skull2.png" width="40" height="40"><img src="stylesheets/skull2.png" width="40" height="40"><img src="stylesheets/skull2.png" width="40" height="40">`
        houseScareRating.setAttribute('class', 'scaryfont')
      } else if (houseInst.scareFactor() === 4) {
        houseScareRating.innerHTML = `<b>Scare Factor: </b><img src="stylesheets/skull2.png" width="40" height="40"><img src="stylesheets/skull2.png" width="40" height="40"><img src="stylesheets/skull2.png" width="40" height="40"><img src="stylesheets/skull2.png" width="40" height="40">`
        houseScareRating.setAttribute('class', 'scaryfont')
      } else if (houseInst.scareFactor() === 5) {
        houseScareRating.innerHTML = '<b>Scare Factor: </b><img src="stylesheets/skull2.png" width="40" height="40"><img src="stylesheets/skull2.png" width="40" height="40"><img src="stylesheets/skull2.png" width="40" height="40"><img src="stylesheets/skull2.png" width="40" height="40"><img src="stylesheets/skull2.png" width="40" height="40">'
        houseScareRating.setAttribute('class', 'scaryfont')
      } else {
        houseScareRating.innerHTML = "This attraction has no rating yet! Be the first to write a review!"
      }

      const houseDesc = document.createElement('p')
      houseDesc.innerText = houseObj.description


      const showReviewsButton = document.createElement("button")
      showReviewsButton.setAttribute("class", "showrevbtn")
      showReviewsButton.innerText = "Read all Reviews"
      showReviewsButton.dataset.id = houseObj.id

      showReviewsButton.addEventListener('click', e => {
        fetch(`http://localhost:3000/api/haunted_houses/${showReviewsButton.dataset.id}`)
        .then(res => res.json())
        .then(json => {
          json.reviews.forEach(review => {
            const reviewtag = document.createElement('p')
            const reviewBody = document.createElement('p')
            reviewtag.setAttribute("class", "stylename")
            reviewBody.setAttribute("class", "stylebody")
            reviewtag.innerHTML = `${review.name} says:`
            reviewBody.innerHTML = `${review.body}`
            newHouseDiv.appendChild(reviewtag)
            newHouseDiv.appendChild(reviewBody)
            showReviewsButton.style.display = 'none'
          })
        })
      })

      const writeReviewButton = document.createElement("button")
      writeReviewButton.setAttribute("class", "writerevbtn")
      writeReviewButton.innerText = "Write a Review"
      writeReviewButton.dataset.id = houseObj.id

      writeReviewButton.addEventListener('click', e => {
        newHouseDiv.innerHTML = ""
        const reviewForm = document.createElement('form')
        reviewForm.dataset.id = houseObj.id
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
        reviewSubmit.setAttribute('class', 'writereview')
        const starSpan = document.createElement('span')
        starSpan.setAttribute('class', 'rating')
        starSpan.innerHTML = `Scare Factor: <input id="house${houseObj.id}rating5" type="radio" name="rating" value="5">
        <label for="house${houseObj.id}rating5"></label>
        <input id="house${houseObj.id}rating4" type="radio" name="rating" value="4">
        <label for="house${houseObj.id}rating4"></label>
        <input id="house${houseObj.id}rating3" type="radio" name="rating" value="3">
        <label for="house${houseObj.id}rating3"></label>
        <input id="house${houseObj.id}rating2" type="radio" name="rating" value="2" >
        <label for="house${houseObj.id}rating2"></label>
        <input id="house${houseObj.id}rating1" type="radio" name="rating" value="1">
        <label for="house${houseObj.id}rating1"></label>`


        reviewForm.appendChild(nameInput)
        reviewForm.appendChild(br1)
        reviewForm.appendChild(br2)
        reviewForm.appendChild(bodyInput)
        reviewForm.appendChild(br3)
        reviewForm.appendChild(br4)
        reviewForm.appendChild(starSpan)
        reviewForm.appendChild(br5)
        reviewForm.appendChild(reviewSubmit)
        newHouseDiv.appendChild(reviewForm)
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
        newHouseDiv.innerHTML = ""
        window.alert("Thanks!")
        renderHouses(json)
      })
    })

      const iframeDiv = document.createElement('div')
      const fixedLocation = houseObj.location.split(" ").join("+")
      const iframeURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCatqH_xgBBnxAdoAvlkNdLRdTz4Go8JxU&q=" + fixedLocation

      iframeDiv.innerHTML = `<iframe width="540" height="405" frameborder="0" style="border:0" src='${iframeURL}' allowfullscreen> </iframe>`
      newHouseDiv.appendChild(houseImg)
      newHouseDiv.appendChild(houseScareRating)
      newHouseDiv.appendChild(houseDesc)
      newHouseDiv.appendChild(iframeDiv)
      newHouseDiv.appendChild(showReviewsButton)
      newHouseDiv.appendChild(writeReviewButton)
      houseDiv.appendChild(newHouseDiv)
      })
    })

}


})
