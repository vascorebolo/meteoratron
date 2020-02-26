import TextMiddle from './textmiddle'

function GameOver(points) {
    const text = `GAME OVER MAN`
    const hint = '(press enter to retry)'
    c.fillStyle = 'rgba(0, 0, 0, 0.6)'
    c.fillRect(0, 0, innerWidth, innerHeight)

    TextMiddle('GAME OVER', {
        y: (innerHeight / 2) - 60
    })

    TextMiddle(
        `Points: ${points.points} | Level: ${points.level + 1}`, {
            y: (innerHeight / 2) - 20,
            fontSize: 20,
            color: 'red'
        }
    )

    TextMiddle(
        hint, {
            y: (innerHeight / 2) + 20,
            color: 'white',
            fontSize: 18
        }
    )
}

export default GameOver