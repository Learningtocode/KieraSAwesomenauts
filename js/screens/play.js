game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		 // reset the score
		 game.data.score = 0; 
                 
                 //me.levelDirector is what to look at as far as maps 
                 //level01 is the name of what map will be loaded.
                 me.levelDirector.loadLevel("level01"); 
                  
                 this.resetPlayer(0, 420);
                  
                 var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {}); 
                 me.game.world.addChild(gameTimerManager, 0);
                    
                 var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {}); 
                 me.game.world.addChild(heroDeathManager, 0); 
                      
                 var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {}); 
                 me.game.world.addChild(experienceManager, 0);
                  
                 //These are the keys for moving the charater and attacks.
                 me.input.bindKey(me.input.KEY.RIGHT, "right"); 
                 me.input.bindKey(me.input.KEY.LEFT, "left"); 
                 me.input.bindKey(me.input.KEY.SPACE, "jump");
                 me.input.bindKey(me.input.KEY.A, "attack");
                
                  

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}, 
          
        // x and y tell you the parameters for the player on the screen, location
        resetPlayer: function(x, y){ 
                 game.data.player = me.pool.pull("player", x, y, {}); 
                 me.game.world.addChild(game.data.player, 5);        
        }
});
