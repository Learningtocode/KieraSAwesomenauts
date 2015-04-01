/* 
 *  The Game Manager does a few things. 
 * 1) Removes the player when he is dead and resets him. 
 * 2) Adds gold  
 * 3) Manages creeps, making creeps reappear on a timer
 */ 

game.GameTimerManager = Object.extend ({
    //Runs all the timers that is not in player entities 
    //Not an entity and won't appear on screen  
    //Init function is still the constructer that we will use  
    //to make everything happen
    init: function(x, y, settings){
        //all these variables are global 
        this.now = new Date().getTime();  
        //Last creep that was made happen
        this.lastCreep = new Date().getTime(); 
        this.paused = false; 
        this.alwaysUpdate = true;
    }, 
     
     update: function(){
         this.now = new Date().getTime();  
          //global variables don't need to be in parameter
         this.goldTimerCheck(); 
         this.creepTimerCheck();  
          
         return true;
     }, 
      
      goldTimerCheck: function(){ 
          //Math.round will check if you have a multiple of ten 
         //Dividing it by a second
          if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
             game.data.gold += (game.data.exp1+1);
         }
      }, 
       
      creepTimerCheck: function(){
            if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
             //Creep's timer 
             this.lastCreep = this.now; 
             var creepe = me.pool.pull("EnemyCreep", 1000, 0, {}); 
             //Add creeps to the game screen 
             me.game.world.addChild(creepe, 5);
         } 
      }
}); 
 
game.HeroDeathManager = Object.extend({
    //Is he dead, if so we will execute some stuff  
    init: function(x, y, settings){
        this.alwaysUpdate = true;
    }, 
     
    update: function(){
        if(game.data.player.dead){ 
             me.game.world.removeChild(game.data.player);
             me.state.current().resetPlayer(10, 0);  
         } 
         return true;
    }
});
  
game.ExperienceManager = Object.extend({
     init: function(x, y, settings){
         this.alwaysUpdate = true; 
         this.gameover = false;
     },
     
     update: function(){
         if(game.data.win === true && !this.gameover){
             this.gameOver(true);
         }else if(game.data.win === false && !this.gameover){ 
             this.gameOver(false);
         } 
         
         return true;
     }, 
     
     gameOver: function(win){ 
         if(win){
             game.data.exp += 10;
         }else{
             game.data.exp += 1; 
         } 
         //Checking the variable not function
         this.gameover = true; 
         me.save.exp = game.data.exp; 
     } 
     
});
 
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
          return true;
      }, 
     //
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
                      this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, B TO EXIT. Current Gold: ", this.pos.x, this.pos.y);  
                      this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1) + 1 * 10),this.pos.x, this.pos.y + 40);  
                      this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level: " + game.data.skill2 + " Cost: " + ((game.data.skill2) + 1 * 10), this.pos.x, this.pos.y + 80);  
                      this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level:  " + game.data.skill3 + " Cost: " + ((game.data.skill3) + 1 * 10), this.pos.x, this.pos.y + 120);  
                      this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: " + game.data.ability1 + " Cost: " + ((game.data.ability1) + 1 * 10), this.pos.x, this.pos.y + 160);  
                      this.font.draw(renderer.getContext(), "W Ability: Eat Creep For Health: " + game.data.ability2 + " Cost: " + ((game.data.ability2) + 1 * 10), this.pos.x, this.pos.y + 200);   
                      this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear: " + game.data.ability3 + " Cost: " + ((game.data.ability3) + 1 * 10), this.pos.x, this.pos.y + 240); 
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
      }
      
      
});
       
             