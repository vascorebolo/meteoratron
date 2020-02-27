import SpriteDrawImage from '../utils/sprite-draw-image'

class Powerup extends SpriteDrawImage {
  constructor(x, y) {
    super(
      'power.png',
      x,
      y,
      16,
      16,
      64,
      10
    )

    this.key = _.uniqueId()
    this.dy = 2
  }

  move() {
    this.y += this.dy
    this.draw()
  }

  static addPowerup(powerups) {
    const powerup = new this(
      Math.random() * innerWidth,
      0
    )

    powerups.set(powerup.key, powerup)
  }
}

export default Powerup