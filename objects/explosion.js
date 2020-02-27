import SpriteDrawImage from '../utils/sprite-draw-image'

class Explosion extends SpriteDrawImage  {
  constructor(x, y, explosions) {
    super(
      'explosion.png',
      x,
      y,
      64,
      67,
      1536,
      0
    )
    this.id = _.uniqueId()
    this.explosions = explosions
  }

  draw() {
    super.draw()

    if (this.currentFrame >= this.cols - 1) {
      this.explosions.delete(this.id)
    }
  }
}

export default Explosion