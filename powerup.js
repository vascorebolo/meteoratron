function Powerup(x, y) {
    this.src = 'power_ring.png'
    this.x = x
    this.y = y
    this.srcX = 0
    this.srcY = 0
    this.sheetWidth = 256
    this.sheetHeight = 64
    this.cols = 4
    this.width = this.sheetWidth / this.cols
    this.height = this.sheetHeight
    this.image = new Image()
    this.image.src = this.src
    this.currentFrame = 0
    this.rate = 0

    this.update = () => {
        this.currentFrame = ++this.currentFrame % this.cols
        this.srcX = this.currentFrame * this.width
    }

    this.draw = () => {
        if (this.rate > 5) {
            this.update()
            this.rate = 0
        }

        ctx.drawImage(
            this.image,
            this.srcX,
            this.srcY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height,
        )

        this.rate += 1
    }
}

export default Powerup