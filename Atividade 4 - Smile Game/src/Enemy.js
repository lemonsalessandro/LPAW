import Circle from "./geometries/Circle";

export default class Enemy extends Circle{
	constructor(x, y, size, speed = 10, color = "#00f") {
		super(x,y,size,speed,color)
		this.line = 1;
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

	mudaCor(){
		this.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
	}
}







