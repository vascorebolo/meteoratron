function sLife() {
  this.hit = () => {
    life -= 10
  }

  this.draw = () => {
    ctx.fillStyle = 'green'
    ctx.fillRect(innerWidth - 40, 20, 20, 200);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.fillRect(innerWidth - 40, 20, 20, 200 - life * 2);
  }
}

class Life {
  constructor() {
    this.value = 100
    this.hitValue = 10
  }

  draw() {
    ctx.fillStyle = 'green'
    ctx.fillRect(innerWidth - 40, 20, 20, 200);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.fillRect(innerWidth - 40, 20, 20, 200 - this.value * 2);
  }

  hit() {
    this.value -= this.hitValue
  }

  gain() {
    this.value += this.hitValue
  }

}

export default Life