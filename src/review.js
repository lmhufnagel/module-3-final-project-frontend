class Review {
  constructor(id, name, body, haunted_house_id){
    this.id = id
    this.name = name
    this.body = body
    this.hauntedHouseId = haunted_house_id
  }

  function getReviews() {
    fetch('http://localhost:3000/api/reviews')
    .then(res => res.json())
    .then(json => console.log(json))
  }

  


}
