function Circle(
  circles,
  addCircle,
  x,
  y,
  dx,
  dy,
  radius,
  key,
  alpha = 1
) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.alpha = alpha
  this.key = key

  this.draw = () => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
    ctx.fill()
  }

  this.update = () => {
    if (this.y > innerHeight || this.y + this.radius < 0) {
      const circle = circles.get(this.key)
      circle.y = -(circle.radius * 2)
    }

    this.x += this.dx
    this.y += this.dy
    this.alpha = Math.random()

    this.draw()
  }
}

export default Circle