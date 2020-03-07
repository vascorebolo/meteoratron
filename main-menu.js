import TextMiddle from './utils/textmiddle'

export default function MainMenu(stars, animate) {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight) // clean scene

  // draw the stars
  for (let [key, star] of stars) {
    star.update()
  }

  TextMiddle(
    'AVOID METEORS', {
      fontSize: 80,
      color: 'red',
      y: innerHeight / 2 - 40
    }
  )

  TextMiddle(
    '(press Enter to play...)', {
      fontSize: 20,
      color: 'tomato',
      y: innerHeight / 2 + 10
    }
  )
}