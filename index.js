import Spaceship from './objects/spaceship'
import Life from './objects/life'
import Points from './points'
import Star from './objects/star'
import Meteor from './objects/meteor'
import Explosion from './objects/explosion'
import GameOver from './gameover'
import TextMiddle from './utils/textmiddle'
import Powerup from './objects/powerup'
import PowerupFeedback from './objects/powerup-feedback'
import LevelInfo from './objects/level-info'

// init canvas
const canvas = document.querySelector('#canvas')
window.ctx = canvas.getContext('2d')

const spaceshipDx = 15
const meteorInitFactor = 300

let life = null
let spaceship = null
let stars = null
let explosions = null
let meteors = null
let startTime = null
let points = null
let paused = false
let debug = false
let powerups = null
let powerHits = null
let levelInfos = null

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
    && spaceship.x > 0
  ) {
    spaceship.changeState('left')
    spaceship.x -= spaceshipDx
  }

  if (
    e.key === 'ArrowRight'
    && spaceship.x < innerWidth - spaceship.width
  ) {
    spaceship.changeState('right')
    spaceship.x += spaceshipDx
  }

  if (
    e.key === 'ArrowUp' &&
    spaceship.y > 0
  ) {
    spaceship.y -= spaceshipDx
  }

  if (
    e.key === 'ArrowDown' &&
    spaceship.y < innerHeight - 80
  ) {
    spaceship.y += spaceshipDx
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

  if (e.key === 'd') {
    debug = !debug
  }

  if (e.key === 'q') {
    Powerup.addPowerup(powerups)
  }
})

// main render function
function animate() {
  const now = new Date()
  const elapsedTime = now - startTime
  // Draw scene when still alive
  if (life.value > 0 && !paused) {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight) // clean scene

    // draw the stars
    for (let [key, star] of stars) {
      star.update()
    }

    // Draw meteors when elapsed time > 5000
    if (elapsedTime > 5000) {
      // if meteors are more than defined metric
      // reset meteors numbers and start over faster
      if (meteors.size > Points.getMetricToAdd()) {
        Meteor.resetMeteors(meteors, explosions, points, stars)
      }

      // if level updated add more meteors
      if (points.updatedLevel) {
        const levelInfo = new LevelInfo(points)
        Meteor.addMeteors(meteors, Meteor.getMeteorsToAdd(points))
        levelInfos.set(levelInfo.key, levelInfo)
      }

      // draw meteors loop
      for (let [key, meteor] of meteors) {
        if (meteor.timer < now.getTime()) {
          meteor.move()

          // detect meteor collision with spaceship
          if (Meteor.detectedCollision(meteor, spaceship)) {
            const explosion = new Explosion(meteor.x, meteor.y, explosions)

            explosions.set(
              explosion.id,
              explosion
            )
            life.hit(meteor.width === Meteor.getSize(true)) // subtract from live
            Meteor.destroyMeteor(meteors, key) // destroys and adds new meteor
          }
        }
      }
    }

    // powerups logic
    const addPowerup = Math.round(Math.random() * 500) < 1 // powerup probability 1/500
    addPowerup &&
      powerups.size === 0 &&
      meteors.size > 0 &&
      elapsedTime > 6000 &&
      Powerup.addPowerup(powerups)
    // ^ only add powerup if there are meteors, and there's no powerups yet

    for (let [key, powerup] of powerups) {
      powerup.move()

      // detect powerup collision
      if (Powerup.detectedCollision(powerup, spaceship)) {
        if (life.value < 100) {
          life.gain()
        }

        const powerHit = new PowerupFeedback(powerup.x, powerup.y, powerHits)
        powerHits.set(powerHit.id, powerHit)
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

    // render power hits
    for (let [key, powerHit] of powerHits) {
      powerHit.draw()
    }

    // render level info text
    for (let [key, levelInfo] of levelInfos) {
      if (levelInfo.counter < levelInfo.frames) {
        levelInfo.draw()
      } else {
        levelInfos.delete(levelInfo.key)
      }
    }

    // show debug bar
    if (debug) {
      TextMiddle(
        `
          metric: ${Points.getMetricToAdd()}
          meteors: ${meteors.size}
          life: ${life.value}
          updatedLevel: ${points.updatedLevel}
          subLevel: ${points.subLevel}
          has to add mtrs: ${Meteor.hasToAddMeteors(meteors)}
        `,
        {
          fontSize: 14,
          y: innerHeight - 14,
          color: 'lime'
        }
      )
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
  points = new Points(startTime.getTime())
  explosions = new Map()
  powerups = new Map()
  powerups = new Map()
  powerHits = new Map()
  levelInfos = new Map()

  const levelInfo = new LevelInfo(points)
  levelInfos.set(levelInfo.key, levelInfo)

  for (let i = 0; i < 500; i++) {
    Star.addStar(stars)
  }

  Meteor.addMeteors(meteors, Math.round(innerWidth / meteorInitFactor))

  spaceship = new Spaceship(
    innerWidth / 2 - 36,
    innerHeight - 80,
  )
}

init()
animate()