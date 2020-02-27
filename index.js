import Spaceship from './spaceship'
import Life from './life'
import Points from './points'
import Star from './star'
import Explosion from './explosion'
import { addMeteor, destroyMeteor, addMoreMeteors } from './utils'
import GameOver from './gameover'
import TextMiddle from './textmiddle'
import Powerup from './components/powerup'

// init canvas
const canvas = document.querySelector('#canvas')
window.ctx = canvas.getContext('2d')

const spaceshipDx = 15

let life = null
let spaceship = null
let stars = null
let explosions = null
let meteors = null
let startTime = null
let points = null
let paused = false
let powerup = null
let powerups = null

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  init()
})

// listener for keyboard unput
window.addEventListener('keydown', (e) => {
  if (
    e.key === 'ArrowLeft'
    && spaceship.x > -spaceshipDx
  ) {
    spaceship.changeState('left')
    spaceship.x -= spaceshipDx
  }

  if (
    e.key === 'ArrowRight'
    && spaceship.x < innerWidth - spaceship.width + spaceshipDx
  ) {
    spaceship.changeState('right')
    spaceship.x += spaceshipDx
  }

  if (
    e.key === 'Enter'
    && life.value <= 0
  ) {
    life.value = 100
    init()
    animate()
  }

  if (
    e.key === 'l'
    && life.value > 0
  ) {
    life.value = 0
  }
})

window.addEventListener('keyup', (e) => {
  spaceship.changeState(null)

  if (e.key === 'p') {
    paused = !paused
  }
})

// main render function
function animate() {
  // Draw scene when still alive
  if (life.value > 0 && !paused) {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight) // clean scene

    // draw the stars
    for (let [key, star] of stars) {
      star.update()
    }

    // Draw meteors when elapsed time > 5000
    const now = new Date()
    if (now - startTime > 5000) {
      // if level updated add more meteors
      points.updatedLevel
        && addMoreMeteors(meteors, points.level * 2)

      // draw meteors loop
      for (let [key, meteor] of meteors) {
        if (meteor.timer < now.getTime()) {
          meteor.update()

          // detect meteor collision with spaceship
          if (
            (
              meteor.y >= innerHeight - spaceship.height
              && meteor.y <= innerHeight
            )
            &&
            (
              meteor.x > spaceship.x //- spaceship.width / 2
              && meteor.x < spaceship.x + spaceship.width
            )
          ) {
            const explosionId = _.uniqueId()

            explosions.set(
              explosionId,
              new Explosion(meteor.x, meteor.y, explosionId, explosions)
            )
            life.hit() // subtract from live
            destroyMeteor(meteors, key) // destroys and adds new meteor
          }
        }
      }
    }

    // powerups logic
    const addPowerup = Math.round(Math.random() * 500) < 1
    addPowerup && Powerup.addPowerup(powerups)

    for (let [key, powerup] of powerups) {
      powerup.move()

      // detect powerup collision
      if (
        (
          powerup.y > innerHeight - spaceship.height
          && powerup.y <= innerHeight
        )
        &&
        (
          powerup.x >= spaceship.x
          && powerup.x <= spaceship.x + spaceship.width
        )
      ) {

        if (life.value < 100) {
          life.gain()
        }

        powerups.delete(powerup.key)
      } else if (powerup.y > innerHeight + powerup.height) {
        powerups.delete(powerup.key)
      }
    }

    // draw spaceship, life gauge and points
    spaceship.draw()
    points.draw()
    life.draw()

    // render explosions
    for (let [key, explosion] of explosions) {
      explosion.draw()
    }

  } else if (!paused) {
    // Draw scene when dead - GAME OVER
    GameOver(points)
  } else {
    // Draw paused scene
    requestAnimationFrame(animate)
    TextMiddle('Paused...', { y: innerHeight / 2, fontSize: 50 })
  }
}

function init() {
  life = new Life()
  startTime = new Date()
  stars = new Map()
  meteors = new Map()
  points = new Points(0, startTime.getTime())
  explosions = new Map()
  powerups = new Map()
  powerup = new Powerup(10, 10)
  powerups = new Map()

  for (let i = 0; i < 500; i++) {
    Star.addStar(stars)
  }

  for (let i = 0; i < innerWidth / 100; i++) {
    addMeteor(meteors, i)
  }

  spaceship = new Spaceship(
    innerWidth / 2 - 36,
    innerHeight - 80,
  )
}

init()
animate()