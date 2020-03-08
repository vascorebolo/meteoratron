import TextMiddle from './utils/textmiddle'

export default function MainMenu(stars, animate) {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight) // clean scene

  // draw the stars
  for (let [key, star] of stars) {
    star.update()
  }
}