function Meteor(src, x, y, dy, width, height, timer = new Date()) {
  this.img = new Image()
  this.img.src = src
  this.x = x
  this.y = y
  this.timer = timer
  this.dy = dy
  this.width = width
  this.height = height
  this.rotation = Math.random() * 360

  this.draw = () => {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation - (this.y / innerHeight))
    ctx.drawImage(this.img, 0, 0, this.width, this.height)
    ctx.restore()
  }

  this.update = () => {
    if (this.y > innerHeight + this.height) {
      this.x = Math.random() * innerWidth
      this.y = -this.height
    } else {
      this.y += this.dy
    }

    this.draw()
  }
}

export default Meteor