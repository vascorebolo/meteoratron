import Meteor from './objects/meteor'

class Points {
  constructor(start) {
    this.points = 0
    this.start = start
    this.level = 1
    this.subLevel = 1
    this.updatedLevel = false
    this.updateFactor = 50000
  }

  draw() {
    const nowTime = new Date().getTime()
    this.points += Math.floor((nowTime - this.start) / 1000)
    const levelUpdated = Math.round(this.points / this.updateFactor) + 1

    if (this.level !== levelUpdated) {
      this.level = levelUpdated
      this.subLevel += 1
      this.updatedLevel = true
    } else {
      this.updatedLevel = false
    }

    const text = this.points
    ctx.fillStyle = 'white'
    ctx.font = '20px sans-serif';
    const textM = ctx.measureText(text)
    ctx.fillText(`POINTS: ${text}`, 20, 30)
    ctx.fillText(`LEVEL: ${this.level}`, 20, 50)
  }

  static getMetricToAdd() {
    const metric = Math.round(innerWidth / Meteor.getSize())
    return metric - Math.floor(metric / 3)
  }
}

export default Points