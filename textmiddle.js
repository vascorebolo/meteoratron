function TextMiddle(text, options = null) {
  let fontSize = 50
  let color = 'white'
  let y = 0

  if (options) {
    fontSize = options.fontSize || fontSize
    color = options.color || color
    y = options.y || y
  }

  ctx.fillStyle = color
  ctx.font = `${fontSize}px sans-serif`
  const textM = ctx.measureText(text)
  ctx.fillText(text, innerWidth / 2 - textM.width / 2, y)
}

export default TextMiddle