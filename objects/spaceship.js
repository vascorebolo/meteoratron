import SpriteDrawImage from '../utils/sprite-draw-image'

class Spaceship extends SpriteDrawImage {
  constructor(x, y) {
    super('spaceship.png', x, y, 64, 64, 192)

    this.state = null
    this.skew = 0
    this.xt = -8
    this.xAdjust = 0
  }

  draw() {
    if (this.frameStepper > this.frameInterval) {
      this.update()
      this.frameStepper = 0
    }

    ctx.drawImage(
      this.img,
      this.srcX,
      0,
      this.width,
      this.height,
      this.x - this.xAdjust,
      this.y,
      this.width + this.skew,
      this.height
    )

    this.frameStepper++
  }

  changeState(state) {
    switch (state) {
      case 'left':
        this.skew = this.xt
        this.xAdjust = this.xt
        break
      case 'right':
        this.skew = this.xt
        break
      default:
        this.skew = 0
        this.xAdjust = 0
    }

    this.state = state
  }
}

export default Spaceship