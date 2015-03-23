/* 
 *Write comment for what this file does
 */
game.GameManager = Object.extend ({
    //Runs all the timers that is not in player entities 
    //Not an entity and won't appear on screen  
    //Init function is still the constructer that we will use  
    //to make everything happen
    init: function(x, y, settings){
        this.now = new Date().getTime();  
        //Last creep that was maade happen
        this.lastCreep = new Date().getTime(); 
        this.paused = false;
         
        this.alwaysUpdate = true;
    }, 
     
     update: function(){
         this.now = new Date().getTime(); 
          
         //Math.round will check if you have a multiple of ten 
         //Dividing it by a second 
         
         //Is he dead, if so we will execute some stuff
         if(game.data.player.dead){ 
             me.game.world.removeChild(game.data.player);
             me.state.current().resetPlayer(10, 0);  
         }  
          
         if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
             game.data.gold += 1;
         }
         
         if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
             //Creep's timer 
             this.lastCreep = this.now; 
             var creepe = me.pool.pull("EnemyCreep", 1000, 0, {}); 
             //Add creeps to the game screen 
             me.game.world.addChild(creepe, 5);
         }  
          
          return true;
     }
});
        

