import DrawImage from '../utils/draw-image'
import Explosion from './explosion'
import Points from '../points'

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

  static dyCalculator(dyFactor = 5) {
    return Math.floor(Math.random() * 10) + dyFactor
  }

  static addMeteor(meteors, dy = this.dyCalculator()) {
    const meteor = new this(
      Math.random() * innerWidth,
      0,
      dy,
      (new Date()).getTime() + Math.random() * 3000
    )

    meteors.set(meteor.key, meteor)
  }

  static addMeteors(meteors, nr, dyFactor = 5) {
    for (let index = 0; index < nr; index++) {
      this.addMeteor(meteors, this.dyCalculator(dyFactor))
    }
  }

  static destroyMeteor(meteors, key) {
    meteors.delete(key)
    this.addMeteor(meteors)
  }

  static getSize(large = false) {
    return large ? 50 : 35
  }

  static resetMeteors(meteors, explosions, points, stars) {
    for (let [key, meteor] of meteors) {
      const explosion = new Explosion(meteor.x, meteor.y, explosions)

      explosions.set(
        explosion.id,
        explosion
      )
    }

    for (let [key, star] of stars) {
      star.dy = star.dy + (points.level / 30)
    }

    points.subLevel = 1
    meteors.clear()
    Meteor.addMeteors(meteors, Math.round(innerWidth / 300), points.level)
  }

  static hasToAddMeteors(points) {
    return this.getMeteorsToAdd(points) <= Points.getMetricToAdd()
  }

  static getMeteorsToAdd(points) {
    return points.subLevel + Math.round(points.subLevel / 2)
  }
}

export default Meteor