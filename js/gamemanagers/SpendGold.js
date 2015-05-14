/* 
 * 
 */
game.SpendGold = Object.extend({ 
     //This is to spend gold when you are playing the game. 
     //It is a pause screen where you can spend gold on skills. 
     init: function(x, y, settings){
        //all these variables are global 
        this.now = new Date().getTime();  
        //variable that will know when the last time we recently bought gold 
        //the this.lastBuy will only register once
        this.lastBuy = new Date().getTime(); 
        this.paused = false; 
        this.alwaysUpdate = true; 
        this.updateWhenPaused = true; 
        //When the game begins, we will not be buying.
         this.buying = false;
     }, 
      
      update: function(){ 
          this.now = new Date().getTime(); 
          //If that buy key is pressed and it has been over a second
          if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >= 1000){
               this.lastBuy = this.now;
               if(!this.buying){
                  this.startBuying(); 
               }else{
                   this.stopBuying();
               }
          }  
           
         this.checkBuyKeys();
         
          return true;
      }, 
     
      startBuying: function(){ 
        //Keeps track of what i am opening
        this.buying = true;  
        //When the game will stop
        me.state.pause(me.state.PLAY);  
        //Take the position we are currently paused at  
        game.data.pausePos = me.game.viewport.localToWorld(0, 0); 
        //When you add spend gold screen, gold will know where to put itself
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen')); 
        //Make sure my screen is updating   
        game.data.buyscreen.updateWhenPaused = true;
        //When user is buying, the user can see what is happening in the background
        game.data.buyscreen.setOpacity(0.8);
        //34 is a z factor making the screen go in front (depth)
        me.game.world.addChild(game.data.buyscreen, 34); 
        //Player is not moving, no jumping, running, ect.
        game.data.player.body.setVelocity(0, 0); 
        me.input.bindKey(me.input.KEY.F1, "F1", true); 
        me.input.bindKey(me.input.KEY.F1, "F2", true); 
        me.input.bindKey(me.input.KEY.F1, "F3", true); 
        me.input.bindKey(me.input.KEY.F1, "F4", true); 
        me.input.bindKey(me.input.KEY.F1, "F5", true); 
        me.input.bindKey(me.input.KEY.F1, "F6", true);
        this.setBuyText();
      },   
       
      setBuyText: function(){
           game.data.buytext = new (me.Renderable.extend({  
                 init: function(){
                     this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]); 
                     this.font = new me.Font("Arial", 26, "white");  
                     this.updateWhenPaused = true;
                     //Listening for the mouuse to be clicked down  
                     //true is telling us to use screen cordinates
                     this.alwaysUpdate = true;
                 },  
                 
                  //set exps points
                  draw: function(renderer){ 
                      //Draw its on screen
                      this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, B TO EXIT. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);  
                      this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1+1)*10),this.pos.x, this.pos.y + 40);  
                      this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level: " + game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);  
                      this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level:  " + game.data.skill3 + " Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);  
                      this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: " + game.data.ability1 + " Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 160);  
                      this.font.draw(renderer.getContext(), "W Ability: Eat Creep For Health: " + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);   
                      this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear: " + game.data.ability3 + " Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y + 240); 
                  } 
                  
               })); 
               me.game.world.addChild(game.data.buytext, 35);
      },
      
      //When we take all the variables within this function to be taken away
      stopBuying: function(){ 
          //Keeps track when i am closing
          this.buying = false;
          //Unpause the game
          me.state.resume(me.state.PLAY);  
          //Go back to player's ability to move again
          game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
          //Removing our buy screen 
          me.game.world.removeChild(game.data.buyscreen); 
          me.input.bindKey(me.input.KEY.F1, "F1", true); 
          me.input.unbindKey(me.input.KEY.F1, "F2", true); 
          me.input.unbindKey(me.input.KEY.F1, "F3", true); 
          me.input.unbindKey(me.input.KEY.F1, "F4", true); 
          me.input.unbindKey(me.input.KEY.F1, "F5", true); 
          me.input.unbindKey(me.input.KEY.F1, "F6", true); 
          //Remove the ext on buy screen once you resume game 
          me.game.world.removeChild(game.data.buytext);
      },
      
      checkBuyKeys: function() {
           if(me.input.isKeyPressed("F1")){ 
               //If I can afford it, I will buy it.
               if(this.checkCost(1)){
                   this.makePurchase(1);
               }
           }else if(me.input.isKeyPressed("F2")){
               if(this.checkCost(2)){
                   this.makePurchase(2);
               }
           }else if(me.input.isKeyPressed("F3")){
               if(this.checkCost(3)){
                   this.makePurchase(3);
               }
           }else if(me.input.isKeyPressed("F4")){
               if(this.checkCost(4)){
                   this.makePurchase(4);
               }
           }else if(me.input.isKeyPressed("F5")){
               if(this.checkCost(5)){
                   this.makePurchase(5);
               }
           }else if(me.input.isKeyPressed("F6")){
               if(this.checkCost(6)){
                   this.makePurchase(6);
               }
           }
       }, 
        
      checkCost: function(skill) { 
     //If i have more gold than the cost to level up one and I have skill one 
     //Then I am going to return true. If not it's going to return false.
         if(skill===1 && (game.data.gold >= ((game.data.skill1+1)*10))){
            return true; 
         }else if(skill===2 && (game.data.gold >= ((game.data.skill2+1)*10))){
            return true; 
         }else if(skill===3 && (game.data.gold >= ((game.data.skill3+1)*10))){
            return true; 
         }else if(skill===4 && (game.data.gold >= ((game.data.ability1+1)*10))){
            return true; 
         }else if(skill===5 && (game.data.gold >= ((game.data.ability2+1)*10))){
            return true; 
         }else if(skill===6 && (game.data.gold >= ((game.data.ability3+1)*10))){
            return true; 
         }else{
             return false;
         }
        }, 
          
    //This is actually where we are going to make our changes base our purchase.
      makePurchase: function(skill) { 
            if(skill === 1){
            game.data.gold -= ((game.data.skill1 +1)* 10); 
            game.data.skill1 += 1; 
            game.data.playerAttack += 1;  
          }else if(skill ===2){
            game.data.gold -= ((game.data.skill2 + 1) * 10);
            game.data.skill2 += 1; 
          }else if(skill ===3){
            game.data.gold -= ((game.data.skill3 +1)* 10); 
            game.data.skill3 += 1; 
          }else if(skill ===4){
            game.data.gold -= ((game.data.ability1 +1)* 10); 
            game.data.ability1 += 1; 
          }else if(skill ===5){
            game.data.gold -= ((game.data.ability2 +1)* 10); 
            game.data.ability2 += 1; 
          }else if(skill ===6){
            game.data.gold -= ((game.data.ability3 +1)* 10); 
            game.data.ability3 += 1; 
          }
      }
});
       
            
