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

    const houseTitle = document.createElement('h3')
    houseTitle.innerText = newHouse.name

    const houseImg = document.createElement('img')
    houseImg.setAttribute('src', `${newHouse.image}`)
    houseImg.setAttribute('height', 200)
    houseImg.setAttribute('width', 350)

    const houseDesc = document.createElement('p')
    houseDesc.innerText = newHouse.description

    const reviewForm = document.createElement('form')
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

    const displayReviews = document.createElement('div')
    // const reviewBody =


    newHouseDiv.appendChild(houseTitle)
    newHouseDiv.appendChild(houseImg)
    newHouseDiv.appendChild(houseDesc)
    newHouseDiv.appendChild(reviewForm)
    houseDiv.appendChild(newHouseDiv)


  })

}
})
