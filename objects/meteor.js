import DrawImage from '../utils/draw-image'
class Meteor extends DrawImage {
  constructor(
    x,
    y,
    dy,
    timer = new Date()
  ) {
    const drawPlanet = Math.round(Math.random() * 20) < 2
    super(
      drawPlanet ? 'planet.png' : 'meteor.png',
      x,
      y,
      drawPlanet ? 50 : 35, // if changed, update static class
      drawPlanet ? 50 : 35
    )

    this.dy = dy
    this.key = _.uniqueId()
    this.timer = timer
    this.rotation = Math.random() * 360
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation - (this.y / innerHeight))
    ctx.drawImage(this.img, 0, 0, this.width, this.height)
    ctx.restore()
  }

  move() {

    if (this.y > innerHeight + this.height) {
      this.x = Math.random() * innerWidth
      this.y = -this.height
    } else {
      this.y += this.dy
    }

    this.draw()
  }

  static addMeteor(meteors) {
    const dy =  Math.floor(Math.random() * 10) + 5

    const meteor = new this(
      Math.random() * innerWidth,
      0,
      dy,
      (new Date()).getTime() + Math.random() * 3000
    )

    meteors.set(meteor.key, meteor)
  }

  static addMeteors(meteors, nr) {
    for (let index = 0; index < nr; index++) {
      this.addMeteor(meteors)
    }
  }

  static destroyMeteor(meteors, key) {
    meteors.delete(key)
    this.addMeteor(meteors)
  }

  static getSize(large = false) {
    return large ? 50 : 35
  }

  static detectedCollision(meteor, spaceship) {
    return (
      meteor.x < spaceship.x + spaceship.width &&
      meteor.x + meteor.width > spaceship.x &&
      meteor.y < spaceship.y + spaceship.height &&
      meteor.y + meteor.height > spaceship.y
    )
  }
}

export default Meteor