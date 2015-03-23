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
        //Last creep that was maade happen
        this.lastCreep = new Date().getTime(); 
        this.paused = false;
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
             game.data.gold += 1;
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
 
 
       
             