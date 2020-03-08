import DrawImage from './draw-image'

class SpriteDrawImage extends DrawImage {
  constructor(
    src,
    x,
    y,
    width,
    height,
    sheetWidth,
    frameInterval = 8
  ) {
    super(src, x, y, width, height)

    this.srcX = 0
    this.srcY = 0
    this.sheetWidth = sheetWidth
    this.cols = sheetWidth / width
    this.frameInterval = frameInterval
    this.currentFrame = 0
    this.frameStepper = 0
  }

  update() {
    this.currentFrame = ++this.currentFrame % this.cols
    this.srcX = Math.round(this.currentFrame * this.width)
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
      this.x,
      this.y,
      this.width,
      this.height
    )

    this.frameStepper++
  }
}

export default SpriteDrawImage