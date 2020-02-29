import TextMiddle from '../utils/textmiddle'

class LevelInfo {
  constructor(points) {
    this.points = points
    this.frames = 100
    this.counter = 0
    this.key = _.uniqueId()
  }

  draw() {
    this.counter += 1

    if (this.counter < this.frames) {
      TextMiddle(
        `LEVEL: ${this.points.level}`,
        {
          y: innerHeight / 2 - 50,
          color: 'tomato'
        }
      )
    }
  }
}

export default LevelInfo