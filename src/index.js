document.addEventListener('DOMContentLoaded', function() {
  const houseDiv = document.getElementById("houses")
  getHouses()

function getHouses() {
  fetch('http://localhost:3000/haunted_houses')
  .then(res => res.json())
  .then(json => console.log(json))
}

function renderHouses(json) {
  json.forEach(house => {

    const newHouse = new HauntedHouse(house)
    console.log(newHouse);
    const newHouseDiv = document.createElement('div')
    const houseImg = document.createElement('img')
    houseImg.setAttribute('src', `${newHouse.image}`)
    houseImg.setAttribute('height', 500)
    houseImg.setAttribute('width', 500)
    newHouseDiv.appendChild(houseImg)
    houseDiv.appendChild(newHouseDiv)

  })

}
})
