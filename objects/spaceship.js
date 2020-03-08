import SpriteDrawImage from '../utils/sprite-draw-image'

class Spaceship extends SpriteDrawImage {
  constructor(x, y) {
    super('spaceship2.png', x, y, 64, 64, 192)

    this.state = null
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
      this.srcY,
      this.width,
      this.height,
      this.x - this.xAdjust,
      this.y,
      this.width,
      this.height
    )

    this.frameStepper++
  }

  changeState(state) {
    switch (state) {
      case 'left':
        this.xAdjust = this.xt
        this.srcY = 128
        this.srcX = 0
        this.cols = 1
        break
      case 'right':
        this.srcY = 64
        this.srcX = 0
        this.cols = 1
        break
      default:
        this.srcY = 0
        this.cols = this.sheetWidth / this.width
        this.skew = 0
        this.xAdjust = 0
    }

    this.state = state
  }
}

export default Spaceship