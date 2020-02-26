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
    c.save()
    c.translate(this.x, this.y)
    c.rotate(this.rotation - (this.y / innerHeight))
    c.drawImage(this.img, 0, 0, this.width, this.height)
    c.restore()
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