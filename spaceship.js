import SpriteDrawImage from './classes/sprite-draw-image'

class Spaceship extends SpriteDrawImage {
  constructor(x, y) {
    super('spaceship2.png', x, y, 72, 72, 288)

    this.state = null
    this.skew = 0
    this.xt = -20
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