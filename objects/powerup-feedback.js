import SpriteDrawImage from '../utils/sprite-draw-image'

class PowerupFeedback extends SpriteDrawImage {
  constructor(x, y, hits) {
    super(
      'powerup_feedback.png',
      x,
      y,
      34,
      30,
      238,
      2
    )

    this.id = _.uniqueId()
    this.hits = hits
  }

  draw() {
    super.draw()

    if (this.currentFrame >= this.cols - 1) {
      this.hits.delete(this.id)
    }
  }
}

export default PowerupFeedback