/* 
 *
 */
game.PauseScreen = Object.extend({ 
     //This is to pause when you are playing the game.  
     init: function(x, y, settings){
        //all these variables are global 
        this.now = new Date().getTime();  
        //variable that will know when the last time we recently Paused
        //the this.lastPause will only register once
        this.lastPause = new Date().getTime(); 
        this.paused = false; 
        this.alwaysUpdate = true; 
        this.updateWhenPaused = true; 
        //When the game begins, we will not be pause.
         this.pausing = false;
     }, 
      
      update: function(){ 
          this.now = new Date().getTime(); 
          //If that buy key is pressed and it has been over a second
          if(me.input.isKeyPressed("pause") && this.now - this.lastPause){
               this.lastPause = this.now;
               if(!this.pausing){
                  this.pause(); 
               }else{
                   this.resume();
               }
          }  
          return true;
      }, 
     
      pause: function(){ 
        //Keeps track of what i am opening
        this.pausing = true;  
        //When the game will stop
        me.state.pause(me.state.PLAY);  
        //Take the position we are currently paused at  
        game.data.pausePos = me.game.viewport.localToWorld(0, 0); 
        //When you add spend gold screen, gold will know where to put itself
        game.data.pausescreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('pause-screen')); 
        //Make sure my screen is updating   
        game.data.buyscreen.updateWhenPaused = true;
        //The user can see what is happening in the background
        game.data.buyscreen.setOpacity(0.8);
        //34 is a z factor making the screen go in front (depth)
        me.game.world.addChild(game.data.buyscreen, 69); 
        //Player is not moving, no jumping, running, ect.
        this.setPause();
      },   
       
      setPauseText: function(){
           game.data.pausetext = new (me.Renderable.extend({  
                 init: function(){
                     this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]); 
                     this.font = new me.Font("Arial", 26, "black");  
                     this.updateWhenPaused = true;
                     //Listening for the mouuse to be clicked down  
                     //true is telling us to use screen cordinates
                     this.alwaysUpdate = true;
                 },  
                 
                  //set exps points
                  draw: function(renderer){ 
                      //Draw its on screen
                      this.font.draw(renderer.getContext(), "PAUSE", this.pos.x, this.pos.y);  
                  } 
                  
               })); 
            //   me.game.world.addChild(game.data.buytext, 35);
      },
      
      //When we take all the variables within this function to be taken away
      resume: function(){ 
          //Keeps track when i am closing
          this.pausing = false;
          //Unpause the game
          me.state.resume(me.state.PLAY);  
          //Go back to player's ability to move again
          game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
          //Removing our pause screen 
          me.game.world.removeChild(game.data.pausescreen);  
          //Remove the ext on pause screen once you resume game 
          me.game.world.removeChild(game.data.pausetext);
      },
      
});
       
            

    
