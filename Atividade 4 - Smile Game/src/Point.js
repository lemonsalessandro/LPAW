import Circle from "./geometries/Circle";

export default class Point extends Circle{
	constructor(x, y, size, speed = 0, color = "black") {
		super(x,y,size,speed,color)
		this.line = 1;
	}
}







