let recMode = false;
let can; 


function setup() {

  can = createCanvas(1920, 1080);
  frameRate(10);
  colorMode(HSB);
  angleMode(DEGREES);

  gc = new gcClass;
  gc.est();

}


function draw() {

  push();
  scale(1.8 - frameCount/1000);
  
    stage();
  
  pop();

  console.log(frameCount);
  recordit();

}

function stage() {

  gc.update();

  //2:58, 3:13, 3:49-4:03
  if (frameCount < 150) {
    gc.setBackground(color(0,0,20));
    gc.phase1();
  }
  else if (frameCount < 330) {
    frameRate(2);
    gc.setBackground(color(0,0,0));
    gc.phase2();
  }
  else {
    frameRate(10);
    gc.phase3();
  }

}


/////   CLASS   /////
class gcClass {

num;
range;
ax;
ay;
sym;
angle;
k;
b;
val;
p;
counter;
w;
h;

  constructor(cp) {
    this.num = 3000;
    this.range = 30;
    this.ax = [];
    this.ay = [];
    this.sym = 2;
    this.angle = 360;
    this.k = [];
    this.b = color(0,0,25);
    this.val = 0;
    this.p = cp;
    this.counter = 0;
    this.w = 960;
    this.h = 540;
  }

  est() {
    for ( let i = 0; i < this.num; i++ ) {
      this.ax[i] = this.w;
      this.ay[i] = this.h;
      this.k[i] = 0;
    }
  }

  update() {
    for ( let i = 1; i < this.num; i++ ) {
      this.ax[i - 1] = this.ax[i];
      this.ay[i - 1] = this.ay[i];
      this.k[i - 1] = this.k[i];
    }
    //changing x and y values within boundaries
    this.ax[this.num - 1] += random(-this.range, this.range);
    this.ay[this.num - 1] += random(-this.range, this.range);
    this.ax[this.num - 1] = constrain(this.ax[this.num - 1], 0, this.w * 2);
    this.ay[this.num - 1] = constrain(this.ay[this.num - 1], 0, this.h * 2);
    //changing color
    this.k[this.num - 1] += 0.1;
    this.k[this.num - 1] = constrain(this.k[this.num - 1], 0,255);
  }

  phase1() {
    noStroke();
    fill(this.b);
    rect(0,0,1920,1080);
    this.range = 30;

    push();
    translate(this.w,this.h);
      for ( let j = 1; j < this.num; j++ ) {
        this.val = j / this.num * 204.0 + 64;
        strokeWeight(1);
        stroke(this.val);
        line(this.ax[j - 1] - this.w, this.ay[j - 1] - this.h, this.ax[j] - this.w, this.ay[j] - this.h);
        //kaleidoscope reflection
        push();
        scale(-1,1);
          this.val = j / this.num * 204.0 + 64;
          strokeWeight(1);
          stroke(this.val);
          line(this.ax[j - 1] - this.w, this.ay[j - 1] - this.h, this.ax[j] - this.w, this.ay[j] - this.h);
        pop();
      }
    pop();
  }

  phase2() {
    noStroke();
    fill(this.b);
    rect(0,0,1920,1080);

      for ( let j = 1; j < this.num; j++ ) {
        strokeWeight(1);
        stroke(0,0,70);
        line(this.w + cos(j),this.h + sin(j), this.w + 500 * cos(this.ax[j - 1]), this.h + 500 * sin(this.ay[j - 1]))
      }
      for ( let j = 1; j < this.num; j++ ) {
        push();
        translate(this.w,this.h);
          this.piece(color(this.k[j - 1],100,100),this.ax[j - 1] - this.w, this.ay[j - 1] - this.h, 0.5);
          //kaleidoscope reflection
          push();
          scale(-1,1);
          fill(this.k[j - 1],100,100);
            this.piece(color(this.k[j - 1],100,100),this.ax[j - 1] - this.w, this.ay[j - 1] - this.h, 0.5);
          pop();
        pop();
      }
  }

  phase3() {
    noStroke();
    fill(color(0,0,this.counter));
    this.counter += 0.2;
    rect(0,0,1920,1080);

    push();
    translate(this.w,this.h);
        for ( let j = 1; j < this.num; j++ ) {
          strokeWeight(1);
          stroke(this.k[j - 1],100,100);
          noFill();
          rect(this.ax[j - 1] - this.w, this.ay[j - 1] - this.h, this.ax[j - 1] - this.ax[j], this.ay[j - 1] - this.ay[j]);
          //kaleidoscope reflection
          push();
          scale(-1,1);
            strokeWeight(1);
            stroke(this.k[j - 1],100,100);
            noFill();
            rect(this.ax[j - 1] - this.w, this.ay[j - 1] - this.h, this.ax[j - 1] - this.ax[j], this.ay[j - 1] - this.ay[j]);
          pop();
        }
    pop();
  }

  piece(k, ox,oy, s) {
    push();
    translate(ox,oy);
    scale(s);
      push();
        beginClip({invert: true})
          ellipse(65,55,13,13);
          ellipse(65,75,13,13);
        endClip();
        noStroke();
        fill(k);
        rect(50,50,30,30);
        ellipse(45,65,13,13);
        ellipse(85,65,13,13);
      pop();
    pop();
  }

  setBackground(k) {
    this.b = k
  }

}


/////   RECORDING STUFF   /////
function keyPressed() {

  if (keyIsPressed === true) {
      let k = key;
      console.log("k is " + k);

      if (k == 's' || k == 'S') {
          console.log("Stopped Recording");
          recMode = false;
          noLoop();
      }

      if (k == ' ') {
          console.log("Start Recording");
          recMode = true;
          loop();
      }
  }
}

function recordit() {  // new version
  if (recMode == true) {
      let ext = nf(frameCount, 4);
      saveCanvas(can, 'frame-' + ext, 'jpg');
      console.log("rec " + ext);
  }
}

// i give up <//3