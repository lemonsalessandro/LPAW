import Circle from "./geometries/Circle";

export default class Point extends Circle{
	constructor(x, y, size, speed = 0, color = "#808") {
		super(x,y,size,speed,color)
		this.line = 1
		// console.log('enemy',this) 
	}
	move(limits){
		this.y +=this.speed
		this.limits(limits)
	}

	limits(limits){

		if(this.y - this.size > limits.height ){
		this.y = -2*this.size
			this.x = Math.random()*limits.width;
		}	
	}
}







