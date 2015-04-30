/* 
 * Control death of enemy hero
 */
game.EnemyHeroDeathManager = Object.extend({
    //Is he dead, if so we will execute some stuff  
    init: function(x, y, settings){
        this.alwaysUpdate = true;
    }, 
     
    update: function(){
        if(game.data.enemyhero.dead){ 
             me.game.world.removeChild(game.data.enemyhero);
             me.game.world.removeChild(game.data.miniEnemyHero);
             me.state.current().resetEnemyHero(10, 0);  
         } 
         return true;
    }
});

