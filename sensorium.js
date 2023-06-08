const shapeStrings = [
  // "1F;2R;3B;4L;5U",
  ",X,X|X,X,",
  ",X,|X,X,X",
  ",X,|,,/X,X,R|,,X",
  ",X,5U|,,X/X,X,|,,",
  ",,R|,,/X,X,X|,1L,X",
  "B,,|,,|,,/X,X,|X,,|,,/,X,|,X,|X,X,X",
  ",2L;B,|X,,|,,/X,X,X|X,X,|3F,,/,,X|L,X,X|,,",
  "U,X,B|,X,|,,/X,X,|,L,|,,/,R,|X,X,X|,4F;5U,",
  ",,|U,,|,,/X,X,B|X,X,X|2R,,/,X,X|L,X,X|,,F",
  "X,X,|X,F,X|,,X/X,,B|X,,|,,X/X,X,X|,X,X|,X,",
  ",,|3U,,X|,,6L;U/X,X,F|X,X,|,X,6R/X,X,|L,X,X|,,F",
  "X,X,R|X,U,|X,,/X,X,|L,X,|X,X,X/,X,|X,X,3B|,F,",
  "X,X,|X,,|,U,R/X,B,X|L,X,X|X,,6F/X,X,|X,,X|,X,X",
  "1F,X,X|,U,X|,,4L/R,,B|X,X,R|5U,X,X/X,X,|X,X,X|,,"
];
const shapes = shapeStrings.map(cube => (
  cube.split("/").map(sheet => (
    sheet.split("|").map(row => row.split(","))
  ))
));
const images = [];

function preload() {
  for (let i = 0; i < 7; i++) {
    images.push(loadImage(i+'.png'));
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  createEasyCam();
  textSize(40);
  textFont('Helvetica');
  textAlign(CENTER);
  // document.oncontextmenu = ()=>false;
}

const side = 60;
let shapeIdx = 0;

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    shapeIdx = (shapeIdx+shapeStrings.length-1) % shapeStrings.length;
  } else if (keyCode == RIGHT_ARROW) {
    shapeIdx = (shapeIdx+1) % shapeStrings.length;
  }
}

function draw() {
  rotateY(-PI/4);
  for (let i = 0; i < 200; i++) {
    rotateX(-PI/2000);
    rotateZ(PI/2000);
  }
  background(255);
  // normalMaterial();
  // lights();
  ambientLight(128, 128, 128);
  directionalLight(128,128,128,-1,-1,-1);
  // directionalLight(128, 128, 128, sin(frameCount/50)*sqrt(2)/2, sin(frameCount/50)*sqrt(2)/2, cos(frameCount/50));
  // fill(0);
  // box(10)
  fill(200,245);
  stroke(0);
  const shape = shapes[shapeIdx];
  const h1 = shape.length;
  const h2 = shape[0].length;
  const h3 = shape[0][0].length;
  // console.log(h1,h2,h3)
  translate(-side*(h3-1)/2,-side*(h1-1)/2,-side*(h2-1)/2);
  for (let i = 0; i < h2; i++) {
    for (let j = 0; j < h1; j++) {
      for (let k = 0; k < h3; k++) {
        const cell = shape[j][i][k];
        if (!!cell) {
          push();
          translate(side*k,side*j,side*i);
          box(side);
          if (cell != "X") {
            const symbols = cell.split(";");
            for (let symbol of symbols) {
              const dir = symbol.length == 1 ? symbol[0] : symbol[1];
              const char = symbol.length == 1 ? "0" : symbol[0];
              // console.log(dir)
              push();
              noStroke();
              texture(images[parseInt(char)]);
              switch (dir) {
                case "U":
                  rotateZ(-PI/2);
                  translate(side/2+0.01,0);
                  rotateX(PI/2);
                  break;
                case "F":
                  rotateY(-PI/2);
                  translate(side/2+0.01,0);
                  break;
                case "B":
                  rotateY(PI/2);
                  translate(side/2+0.01,0);
                  break;
                case "L":
                  rotateY(PI);
                  translate(side/2+0.01,0);
                  break;
                case "R":
                  translate(side/2+0.01,0);
              }
              rotateZ(PI/2);
              rotateY(PI/2);
              rotateX(PI/2);
              plane(side,side);
              pop();
            }
          }
          pop();
        }
      }
    }
  }
}