class Star {
  constructor(
    y,
    dx,
    dy,
    key,
    alpha = 1
  ) {
    this.key = key
    this.radius = Math.random() * 3
    this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius
    this.y = y
    this.dx = dx
    this.dy = dy
    this.key = key
    this.alpha = alpha
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
    ctx.fill()
  }

  update() {
    if (this.y > innerHeight || this.y + this.radius < 0) {
      this.y = -(this.radius * 2)
      this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius
    }

    this.x += this.dx
    this.y += this.dy
    this.alpha = Math.random()

    this.draw()
  }

  static addStar(stars, randomY = true) {
    const radius = Math.random() * 3
    const y = randomY
      ? Math.random() * (innerHeight - radius * 2) + radius
      : 0
    const star = new this(
      y,
      0,
      5,
      _.uniqueId(),
      Math.random()
    )

    stars.set(star.key, star)
  }
}

export default Star