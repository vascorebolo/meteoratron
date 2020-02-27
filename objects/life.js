class Life {
  constructor() {
    this.value = 100
    this.hitValue = 10
    this.bigHitValue = 20
  }

  draw() {
    ctx.fillStyle = 'green'
    ctx.fillRect(innerWidth - 40, 20, 20, 200);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.fillRect(innerWidth - 40, 20, 20, 200 - this.value * 2);
  }

  hit(big = false) {
    this.value -= big
      ? this.bigHitValue
      : this.hitValue
  }

  gain() {
    this.value += this.hitValue
  }
}

export default Life