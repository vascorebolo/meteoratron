class DrawImage {
  constructor(src, x, y, width, height) {
    this.img = new Image()
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.img.src = src
  }

  draw() {
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

export default DrawImage