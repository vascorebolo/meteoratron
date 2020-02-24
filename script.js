const canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')

function Circle(x, y, dx, dy, radius, alpha = 1) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.alpha = alpha

  this.draw = () => {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
    c.fill()
  }

  this.update = () => {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }

    this.x += this.dx
    this.y += this.dy
    this.alpha = Math.random()

    this.draw()
  }
}

let circle = new Circle(200, 200, 4, 4, 30, 0.6)


const radius = 30

const circleArray = []
for (let i = 0; i < 200; i++) {
  const radius = Math.random() * 3
  const x = Math.random() * (innerWidth - radius * 2) + radius
  const y = Math.random() * (innerHeight - radius * 2) + radius
  const dx = (Math.random() - 0.5) * 4
  const dy = (Math.random() - 0.5) * 4
  const alpha = Math.random()

  circleArray.push(new Circle(x, y, dx, dy, radius, alpha))
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)

  circleArray.forEach(circle => {
    circle.update()
  });

}

animate()