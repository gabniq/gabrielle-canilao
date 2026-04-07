/////   1: SPLASH SCREEN   /////
function splash() {
  // VARIABLES
    this.btnevent1 = false;
    this.btnevent2 = false;

  this.draw = function() {
    push();
      background(0);

      textFont(pixelsans);
      textSize(60);
      textAlign(CENTER);
      fill(255);
      text("A Totally Normal\nPong Game!", width/2,250);
    pop();
    
    btnevent1 = checkButtonPress("START",260,400,200,50,color(255),color(200),color(100),color(0)); 
      if (btnevent1) { // starting game
        btnevent1 = false;
        playbuttonsound();
        this.sceneManager.showScene(pong);
      } 
    btnevent2 = checkButtonPress("HELP",260,470,200,50,color(0),color(35),color(155),color(255));  
      if (btnevent2) { // help
        btnevent1 = false;
        playbuttonsound();
        this.sceneManager.showScene(help);
      }

  }
}





/////   2: HELP SCREEN   /////
function help() {
  //VARIABLE
    this.btnevent1 = false;

  this.draw = function() {
    push();
      background(0);
      textFont(pixelsans);
      textSize(60);
      textAlign(CENTER);
      fill(255);
        text(" - GUIDE - ", width/2,260);
      textSize(24);
        text("Control the paddle with your mouse and\ngain points each time you hit the\npong ball!", width/2,320);

        text("Try your best to keep the ball going!", width/2,460);
        
    pop();

    btnevent1 = checkButtonPress("START",260,500,200,50,color(255),color(200),color(100),color(0)); 
      if (btnevent1) { // starting game
        btnevent1 = false;
        playbuttonsound();
        this.sceneManager.showScene(pong);
      }
  }
}





/////   3: PONG   /////
function pong() {
  // VARIABLES
    this.ballx = 360;
    this.bally = 100;
    this.speedx = 5;
    this.speedy = 5;
    this.score = 0;
    this.fade = -100;

  this.enter = function() {
    if (!pongbgm.isPlaying()) {
      pongbgm.play();
    }
  }
  this.draw = function() {
    push();
      background(0);
      console.log("test");

      //BALL
      fill(255);
      if (this.score < 4) {
        ellipse(this.ballx,this.bally, 20);
      }

      //MOVEMENT
      this.ballx += this.speedx;
      this.bally += this.speedy;

      if (this.ballx < 20 || this.ballx > width - 20) {
        this.speedx *= -1;
      }
      if (this.bally < 20 || this.bally > height - 20) {
        this.speedy *= -1;
      }

      //PADDLE
      fill(255);
      rect(mouseX-50,685, 100,20);

      if (this.ballx > mouseX - 50 && this.ballx < mouseX + 50
          && this.bally + 15 >= 685) {
        this.speedx *= -1;
        this.speedy *= -1;
        this.score++;
      }

      //SCORE
      fill(255);
      textSize(48);
      textAlign(CENTER);
      textFont(pixelsans);
        text(this.score, width/2,50);


      //TEXT 
      textSize(24);
      if (this.score == 1) {
        text("Hey!", this.ballx,this.bally - 30);
      }
      else if (this.score == 2) {
        text("Ow!", this.ballx, this.bally - 30);
      }
      else if (this.score == 3) {
        text("That hurts", this.ballx, this.bally - 30);
      }
      else if (this.score == 4) {
        pongbgm.stop();
        ellipse(width/2, height/2, 20)
        text("I can't do this anymore!", width/2, height/2 - 30);
        this.fade += 2;
        fill(0,this.fade);
        rect(0,0,width,height);
          //to next scene after fade
          if (this.fade >= 255) {
            this.sceneManager.showScene(vn);
          }
      }
      else {
      }
    pop();
  }
}





/////   4: VISUAL NOVEL   /////
function vn() {
  // VARIABLES
    this.fade = 300;
    this.fade1 = -100;
    this.d = 0;
    this.dialogue;
    this.sprite = vn_1;

  this.enter = function() {
    pongbgm.stop();
    if (!vnbgm.isPlaying()) {
      vnbgm.play();
    }
  }
  this.draw = function() {
    push();
      image(vnbg, 0,0, 960,720);

      //SPRITE
      image(this.sprite, 270,140,400,400);

      //TEXT BOX
      fill(242,162,236, 200);
      stroke(100);
      strokeWeight(5);
        rect(65,470, 590,210);
      fill(255);
        rect(65,405, 85,53)
      noStroke();
      fill(0);
      textSize(34);
      textFont("Verdana");
      textAlign(LEFT);
        text("Ball", 75,444);
      fill(255);
      textSize(16);
        text("Press spacebar to continue", 405,660);

      //DIALOGUE
      if (this.d < 1) {
        this.dialogue = "I don't want to be a pong ball anymore!"
      }
      else if (this.d < 2) {
        this.dialogue = "It hurts, and I feel like I was meant to be more than this"
        this.sprite = vn_2;
      }
      else if (this.d < 3) {
        this.dialogue = "I could be anything--a doctor, a lawyer, even a struggling college student during finals week!"
      }
      else if (this.d < 4) {
        this.dialogue = "So I quit! And you can't stop me..."
      }
      else if (this.d < 5) {
        this.dialogue = "... unless you're ready to fight me over it!"
        this.sprite = vn_1;
      }
      fill(0);
      textSize(24);
        text(this.dialogue, 80,490, 570);

      //FADE IN
      this.fade -= 2;
      fill(0,this.fade);
      rect(0,0,width,height);

      //FADE OUT
      if (this.d == 5 && frameCount % 10 == 0) {
        this.fade1 += 30
      }
      fill(0,this.fade1);
      rect(0,0,width,height);
      if (this.fade1 >= 255) {
        this.sceneManager.showScene(fight);
      }
    pop();
  }
  this.keyPressed = function() {
    switch(key) {
      case ' ':
        fill(255);
        ellipse(100,100,50);
        rect(50,50,500,500);
        this.d ++;
        break;
    }
  }
}





/////   5: FIGHT   /////
function fight() {
  // VARIABLES
    this.fade = 255;
    this.choicemenu = true;
    this.ballhealth = 4;
    this.pchealth = 100;
    this.count = 0;
    this.attack = false;
    this.block = false;
    this.talk = false;

  this.enter = function() {
    vnbgm.stop();
    if (!fightbgm.isPlaying()) {
      fightbgm.play();
    }
  }
  this.draw = function() {
    push();
    image(fightbg, -260,0, 720 * 1.5,336 * 1.5);
    image(fightbg, -260,210, 720 * 1.5,336 * 1.5);

      //FADE IN
      if (frameCount % 10 == 0) {
        this.fade -= 30
      }
      fill(0,this.fade);
      rect(0,0,width,height);

      fight_sprite.visible = true;

      //TEXT BOX
      fill(255);
      stroke(0);
      strokeWeight(10);
        rect(65,470, 590,210);
      noStroke();
      fill(50);
      textSize(24);
      textFont(press2p);
      textAlign(LEFT);

      //MAIN CHOICE MENU
        if (this.choicemenu == true) {
          text("> ATTACK\n> BLOCK\n> TALK", 90,530);
          //hover color
          fill(255,80);
          if (mouseX > 90 && mouseX < 290 && mouseY > 501 && mouseY < 532) {
            rect(90,501, 200,30);
          }
          else if (mouseX > 90 && mouseX < 290 && mouseY > 532 && mouseY < 562) {
            rect(90,532, 200,30);
          }
          else if (mouseX > 90 && mouseX < 290 && mouseY > 563 && mouseY < 593) {
            rect(90,563, 200,30);
          }
        }

      //CHOICE DIALOGUE
        if (this.attack == true) {
          text("You attack the pong ball. It bounces away in pain and doesn't attack", 90,530,540);
        }
        if (this.block == true) {
          text("You block the pong ball. It softly bounces against your arm. You take no damage", 90,530,540);
        }
        if (this.talk == true) {
          text("You try to talk to the pong ball. It throws itself at you in attack. You take 1 damage", 90,530,540);
        }

      //BOTTOM TEXT
      textSize(12);
      fill(100);
        if (this.choicemenu == true) {
          text("Click an option to continue", 320,660);
          this.attack = false;
          this.block = false;
          this.talk = false;
        }
        else if (this.choicemenu == false) {
          text("Click here to return to menu", 310,660);

          if (mouseX > 310 && mouseX < 645 && mouseY > 645 && mouseY < 661) {
            fill(255,50);
            rect(310,645, 335,16);
          }
        }

      //HEALTH BARS
      fill(0); //black
        rect(65,90, 230,40);
        rect(65,170, 230,40);
      fill(50); //grey
        rect(75,98, 150,24);
        rect(75,178, 150,24);
      fill(255); //white
        rect(75,98, this.ballhealth * 37.5,24);
        rect(75,178, this.pchealth * 1.5,24);
      fill(255);//hp
      textSize(16);
        text(this.ballhealth * 25, 235,119);
        text(this.pchealth, 235,199)
      fill(0); //labels
      textSize(24);
        text("BALL'S HP:", 65,90);
        text("YOUR HP:", 65, 170)

    pop();
  }
  
  this.mousePressed = function() {
    if (this.choicemenu == true) {
      if (mouseX > 90 && mouseX < 290 && mouseY > 501 && mouseY < 532) {
        this.ballhealth--;
        this.attack = true;
        this.choicemenu = false;
        if (this.ballhealth == 0) {
          this.sceneManager.showScene(ending);
        }
      }
      else if (mouseX > 90 && mouseX < 290 && mouseY > 532 && mouseY < 562) {
        this.block = true;
        this.choicemenu = false;
      }
      else if (mouseX > 90 && mouseX < 290 && mouseY > 563 && mouseY < 593) {
        this.talk = true;
        this.pchealth--;
        this.choicemenu = false;
      }
    }
    else if (this.choicemenu == false) {
      if (mouseX > 310 && mouseX < 645 && mouseY > 645 && mouseY < 661)
      this.choicemenu = true;
    }
  }
}





/////   6: ENDING   /////
function ending() {
  // VARIABLE
  this.d = 0;

  this.enter = function() {
    fightbgm.stop();
    if (!pongbgm.isPlaying()) {
      pongbgm.play();
    }
    fight_sprite.visible = false;
  }
  this.draw = function() {
    push();
      background(0);

      fill(255);
      textFont(pixelsans);
      textAlign(CENTER);
      textSize(24);

        ellipse(width/2, height/2, 20) //ball
        rect(mouseX-50,685, 100,20); //paddle

      if (this.d < 1) {
        push();
        fill(50);
        textSize(16);
          text("Press spacebar to continue", width/2, height/2 - 60);
        pop();
        text("Wait!", width/2,height/2-30);
      }
      else if (this.d < 2) {
        text("I get it, I get it! You win", width/2, height/2 - 30);
      }
      else if (this.d < 3) {
        text("I guess I'm stuck being a pong ball", width/2, height/2 - 30);
      }
      else if (this.d < 4) {
        text("...", width/2, height/2 - 30);
      }
      else if (this.d < 5) {
        text("... Oh well!", width/2, height/2-30);
      }
      if (this.d >= 5) {
        fill(0);
          rect(0,0, width,height);
        fill(255);
        textSize(60);
          text("The End", width/2, height/2);
      }

    pop();
  }
  this.keyPressed = function() {
    switch(key) {
      case ' ':
        fill(255);
        ellipse(100,100,50);
        rect(50,50,500,500);
        this.d++;
        break;
    }
  }
}





/////   MISC.   /////
//BUTTON
function checkButtonPress(str,bx,by,boxW,boxH,upcolor,ovcolor,dncolor,textcolor) {

  let btnc = "";
  let btnstate = false;
  
  noStroke();

  // Test if the cursor is over the box
  if ( mouseX > bx && mouseX < bx + boxW &&
       mouseY > by && mouseY < by + boxH ) {

    overBox = true;

      if (!mouseIsPressed) {
        btnc = ovcolor;
        btnstate = false;
      }
      else {
        btnc = dncolor;
        btnstate = true;
      }
  }
  else {
    btnc = upcolor;
    overBox = false;
  }

  push();
  translate(bx,by);
    fill(btnc);
    rect(0, 0, boxW, boxH); // draw the box

    fill(textcolor);
    noStroke();
    textSize(boxH * 0.8);
    textFont(pixelsans);
    textAlign(CENTER);
    text(str,boxW/2,boxH/1.4);

  pop();

    return btnstate;
}

//SOUND
function playbuttonsound() {
  if ( !click.isPlaying() ) {
    push();
    outputVolume(0.5);
    click.play();
    pop();
  } else {
     click.stop();
 }

}