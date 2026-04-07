let currentkey = '1';
let bgc;
let c;
let s;
let rx = 400;
let ry = 300;
let h;


function preload() {

  h = loadImage("asset/house_md.png");

}

function setup() {

  createCanvas(800, 600);
  background(255);
  smooth();

  bgc = color(255);
  gkcount = 20;

  /////   COLOR PICKER   /////
  myPicker = createColorPicker(255);
  myPicker.position(745,165);
  myPicker.size(75,50);

  /////   SIZE SLIDER   /////
  slider = createSlider(1,100);
  slider.position(400,180);
  slider.size(300);

}


function draw() {

  let c = myPicker.value();
  let s = slider.value();

  if( keyIsPressed) {
    clear_print();
  }
  
  if(mouseIsPressed) {
     drawChoice();
  }
  

}


function drawChoice() {

  let currentkey = key;
  let c = myPicker.color();
  console.log("Color is " + c);

  switch(currentkey) {
    case '1':
      console.log("1");
      gcstandard(color(c), mouseX, mouseY, pmouseX, pmouseY); //reg mouseX/Y being current value, pmouseX/Y being previous value
      break;
    case '2':
      console.log("2");  // red line
      gchalftone(color(c), mouseX, mouseY);
      break;
    case '3':
      console.log("3");  // green line
      gcairbrush(color(c), mouseX, mouseY);
      break;
    case '4':
      console.log("4");  // fat teal line
      gcranspeedlines(color(c), mouseX, mouseY, pmouseX, pmouseY);
      break;
    case '5':
      console.log("5");  // erase with bg color
      gchouse(color(c), mouseX, mouseY);
      break;
    case '6': 
      console.log("6");
      gceraser(color(255), mouseX,mouseY, pmouseX,pmouseY);
      break;

  default:
    console.log("None"); 
    break;  
  }

}

function gcstandard(k, lx,ly, px,py) {
  
  let s = slider.value();
  console.log("Size is " + s);

  strokeWeight(s);
  stroke(k);
  line(lx,ly,px,py);

}


function gchalftone(k, lx,ly) {
  
  let s = slider.value();
  console.log("Size is " + s);

  push();
  beginClip();
    noFill();
    ellipse(lx,ly, s);
  endClip();

    for (ix = 0; ix < width; ix += 6) {
      for(iy = 0; iy < height; iy += 6) {
        fill(k);
        noStroke();
        ellipse(ix,iy,3);
      }
    }
  pop();

}


function gcairbrush( k,  lx, ly) {

  let s = slider.value();
  console.log("Size is " + s);
  
  fill(k,100);
  noStroke();
  for (let i = 0; i < 100; i++) {
    ellipse(lx + random(-s,s),ly + random(-s,s),1);
  }

}


function gcranspeedlines(k, lx, ly) {

  let s = slider.value();
  console.log("Size is " + s);
  
  if (frameCount % 240 == 0 || frameCount == 0) {
    rx = random(width);
    ry = random(height);
  }
  if (frameCount % 5 == 0) {
    strokeWeight(s/3);
    stroke(k);
    line(lx,ly, rx,ry);
  }

}


function gchouse(k, lx,ly) {

  let s = slider.value();
  console.log("Size is " + s);

  tint(k);
  image(h, lx - s/2,ly - s/2, s,s);

}


function gceraser(k, lx, ly, px,py) {
  
  let s = slider.value();
  console.log("Size is " + s);

  strokeWeight(s);
  stroke(k);
  line(lx,ly,px,py);

}


function clear_print() {

  // these 2 options let you choose between clearing the background
  // and saveing the current image as a file.
  if (key == 'x' || key == 'X') {
    background(255);
  } else if (key == 'p' || key == 'P') {
    saveFrames('image-0', 'png', 1, 1);
    key = '';  // resets the key so it does not make more than one image.
  }

}
