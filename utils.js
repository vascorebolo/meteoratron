// import Circle from './star'
import Meteor from './meteor'

export function addMeteor(meteors, key) {
  const drawPlanet = Math.random() * 20 < 2
  const meteor = new Meteor(
    drawPlanet ? 'planet.png' : 'meteor.png',
    Math.random() * innerWidth,
    0,
    Math.floor(Math.random() * 10) + 5,
    drawPlanet ? 50 :25,
    50,
    (new Date()).getTime() + Math.random() * 3000
  )

  meteors.set(key, meteor)
}

export function addMoreMeteors(meteors, nr) {
  for (let index = 0; index < nr; index++) {
    addMeteor(meteors, _.uniqueId())
  }
}

export function destroyMeteor(meteors, key) {
  meteors.delete(key)
  addMeteor(meteors, _.uniqueId())
}