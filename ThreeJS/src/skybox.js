import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    BackSide,
    TextureLoader
} from 'three'

const createPathStrings = (filename) => {
	const basePath = "img/skyboxes/";
	const baseFilename = basePath + filename;
	const fileType = ".png";
	const sides = ["ft", "bk", "up", "dn", "lf","rt"];
	const pathStings = sides.map(side => {
		return baseFilename + "/" + side + fileType;
	});
	console.log(pathStings)
	return pathStings;
}

const createSkyBoxMaterial = async (filename) => {
	const skyBoxImagePaths = createPathStrings(filename);
	console.log(skyBoxImagePaths)
	const materialArray = []
	for(let imagePath of skyBoxImagePaths){
		console.log(`Loading: ${imagePath}`)
		let loader = new TextureLoader();
		let texture = await loader.loadAsync(imagePath);
		materialArray.push(
			new MeshBasicMaterial(
				{ map: texture, side: BackSide }
			));
		console.log(`Loaded: ${imagePath}`)
	}
	return materialArray;
}

const createSkyBox = async (filename,size) => {
	const skyboxGeo = new BoxGeometry(size, size, size);
	const skyArrayMaterial = await createSkyBoxMaterial(filename)
	console.log("Material ready!")
	return new Mesh(skyboxGeo, skyArrayMaterial);
}

export { createSkyBox }