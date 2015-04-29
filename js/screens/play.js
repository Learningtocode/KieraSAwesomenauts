game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
                me.audio.playTrack("begin");
            
		 // reset the score
		 game.data.score = 0; 
                 
                 //me.levelDirector is what to look at as far as maps 
                 //level01 is the name of what map will be loaded.
                 me.levelDirector.loadLevel("level01"); 
                  
                 this.resetPlayer(10, 0);
                  
                 var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {}); 
                 me.game.world.addChild(gameTimerManager, 0);
                    
                 var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {}); 
                 me.game.world.addChild(heroDeathManager, 0); 
                      
                 var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {}); 
                 me.game.world.addChild(experienceManager, 0);
                   
                 var spendGold = me.pool.pull("SpendGold", 0, 0, {});  
                 me.game.world.addChild(spendGold, 0); 
                 
                 var pauseScreen = me.pool.pull("PauseScreen", 0, 0, {});  
                 me.game.world.addChild(pauseScreen, 0); 
                 
                 //z level is high so we don't have to worry if our background is covering it.
                 game.data.minimap = me.pool.pull("minimap", 10, 10, {}); 
                 me.game.world.addChild(game.data.minimap, 30);
                 
                 //These are the keys for moving the charater and attacks. 
                 me.input.bindKey(me.input.KEY.B, "buy"); 
                 me.input.bindKey(me.input.KEY.Q, "skill1"); 
                 me.input.bindKey(me.input.KEY.W, "skill2"); 
                 me.input.bindKey(me.input.KEY.E, "skill3");
                 me.input.bindKey(me.input.KEY.RIGHT, "right"); 
                 me.input.bindKey(me.input.KEY.LEFT, "left"); 
                 me.input.bindKey(me.input.KEY.SPACE, "jump");
                 me.input.bindKey(me.input.KEY.A, "attack");
                 //This is to pause my game by pressing P
                 me.input.bindKey(me.input.KEY.P, "pause"); 
                
                  

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
                me.audio.stopTrack();
	}, 
          
        // x and y tell you the parameters for the player on the screen, location
        //When my player dies, i am resetting where my player goes for the minimap.
        resetPlayer: function(x, y){ 
                 game.data.player = me.pool.pull("player", x, y, {}); 
                 me.game.world.addChild(game.data.player, 5); 
                 game.data.miniPlayer = me.pool.pull("miniplayer", 10, 10, {}); 
                 me.game.world.addChild(game.data.miniPlayer, 31);
        }
});
