/////   VARIABLES   /////
//let sound variables
var mgr;

let pixelsans,press2p;

let vnbg,fightbg;
let vn_1,vn_2;

let click;
let pongbgm,vnbgm,fightbgm;

var fight_sprite;

function preload() {
    pixelsans = loadFont("assets/pixel_sans.ttf");
    press2p = loadFont("assets/pressstart2p.ttf");

    vnbg = loadImage("assets/vnbg.png");
    fightbg = loadImage("assets/fightbg.png");
    vn_1 = loadImage("assets/vn_1.png");
    vn_2 = loadImage("assets/vn_2.png");

    click = loadSound("assets/click.mp3");
    pongbgm = loadSound("assets/pong.mp3");
    vnbgm = loadSound("assets/vn.mp3");
    fightbgm = loadSound("assets/fight.mp3");

}


function setup() {
    createCanvas(720,720);

    mgr = new SceneManager();

    fight_sprite = createSprite(550,300);
    let run_sprite = fight_sprite.addAnimation("normal", "assets/fight_1.png","assets/fight_4.png");  // first image, and last image
    run_sprite.frameDelay = 30;
    run_sprite.scale = 0.7;
    fight_sprite.visible = false;

    mgr.addScene (splash);
    mgr.addScene (help);
    mgr.addScene (pong);
    mgr.addScene (vn);
    mgr.addScene (fight);
    mgr.addScene (ending);
    mgr.showNextScene();
}


function draw() {
    mgr.draw();
   
}


function mousePressed() {
    mgr.mousePressed();
}


function keyPressed() {
    mgr.keyPressed();
}