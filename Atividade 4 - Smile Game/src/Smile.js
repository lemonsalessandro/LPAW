import Circle from './geometries/Circle';

export default class Smile extends Circle {

	constructor(x, y, size, speed = 10, color = "#00f") {
		super(x, y, size, speed, color)
		this.status = 'ArrowRight';
	}

	paint(ctx) {
		ctx.fillStyle = "#fff";

		this.draw(ctx)

		//OLHOS
		this.circ(ctx,
			this.x - this.size / 2.5,
			this.y - this.size / 4,
			this.size * .1, 1, 'black', 'black')

		this.circ(ctx,
			this.x + this.size / 2.5,
			this.y - this.size / 4,
			this.size * .1, 1, 'black', 'black')

		//BOCA
		ctx.beginPath()
		ctx.lineWidth = 2
		ctx.arc(this.x, this.y + this.size / 4, this.size / 2, 0, Math.PI)
		ctx.strokeStyle = "#000"
		ctx.stroke()

		this.circ(ctx, this.x, this.y, this.size, 2, 'black')

	}

	move(limits, key) {
		let movements = {
			'ArrowDown': {
				sx: 0,
				sy: this.speed
			},
			'ArrowUp': {
				sx: 0,
				sy: -this.speed
			},
			'ArrowLeft': {
				sx: -this.speed,
				sy: 0
			},
			'ArrowRight': {
				sx: this.speed,
				sy: 0
			}
		}

		this.status = movements[key] ? key : this.status

		const { sx, sy } = movements[this.status]

		this.x += sx
		this.y += sy

		this.limits(limits)
	}

	limits(limits) {
		this.x = Math.max(this.size / 2, Math.min(this.x, limits.width - this.size / 2))
		this.y = Math.max(this.size / 2, Math.min(this.y, limits.height - this.size / 2))
	}

	aumenta() {
		this.size += 2;
	}

}