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

  static detectedCollision(obj1, obj2) {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    )
  }
}

export default DrawImage