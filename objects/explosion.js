import SpriteDrawImage from '../utils/sprite-draw-image'

class Explosion extends SpriteDrawImage  {
  constructor(x, y, id, explosions) {
    super(
      'explosion2.png',
      x,
      y,
      64,
      67,
      1536,
      0
    )

    this.id = id
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