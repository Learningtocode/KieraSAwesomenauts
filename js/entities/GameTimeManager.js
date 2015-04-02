/* 
 *
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

