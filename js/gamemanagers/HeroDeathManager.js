/* 
 *Removes the player when he is dead and resets him. 
 */
game.HeroDeathManager = Object.extend({
    //Is he dead, if so we will execute some stuff  
    init: function(x, y, settings){
        this.alwaysUpdate = true;
    }, 
     
    update: function(){
        if(game.data.player.dead){ 
             me.game.world.removeChild(game.data.player);
             me.game.world.removeChild(game.data.miniPlayer);
             me.state.current().resetPlayer(10, 0);  
         } 
         return true;
    }
});

