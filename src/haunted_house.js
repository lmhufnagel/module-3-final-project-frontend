
class HauntedHouse {

  constructor(id, name, description, location, image, reviews){
    this.id = id
    this.name = name
    this.description = description
    this.location = location
    this.image = image
    this.reviews = reviews
    HauntedHouse.all.push(this)
  }

  scareFactor(){
    let scare_counter = 0
    this.reviews.forEach(review => {
      scare_counter += review.rating
    })
    const avgRating  = scare_counter / this.reviews.length
    return Math.round(avgRating)
  }

  // let all = []

}

HauntedHouse.all = []
