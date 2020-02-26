function Life() {
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

export default Life