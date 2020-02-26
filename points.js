function Points(points, start) {
  this.points = 0
  this.start = start
  this.level = 1
  this.updatedLevel = false

  this.draw = () => {
    const nowTime = new Date().getTime()
    this.points += Math.floor((nowTime - this.start) / 1000)
    const levelUpdated = Math.round(this.points / 50000)

    if (this.level !== levelUpdated) {
      this.level = levelUpdated
      this.updatedLevel = true
    } else {
      this.updatedLevel = false
    }

    const text = this.points
    ctx.fillStyle = 'white'
    ctx.font = '20px sans-serif';
    const textM = ctx.measureText(text)
    ctx.fillText(`POINTS: ${text}`, 20, 30)
    ctx.fillText(`LEVEL: ${this.level + 1}`, 20, 50)
  }
}

export default Points