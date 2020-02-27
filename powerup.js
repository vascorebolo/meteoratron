import SpriteDrawImage from './classes/sprite-draw-image'
class Powerup extends SpriteDrawImage {
  constructor(x, y) {
    super(
      'power.png',
      x,
      y,
      16,
      16,
      64,
      10
    )
  }
}

export default Powerup