game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); 
          //Key to connect to our play screen with title screen
                me.input.bindKey(me.input.KEY.ENTER, "start");
          //Words onto the title screen 
          //Renderable means we are drawing
                me.game.world.addChild(new (me.Renderable.extend({  
                 init: function(){
                     this._super(me.Renderable, 'init', [5, 10, 30, me.game.viewport.width, me.game.viewport.height]); 
                     this.font = new me.Font("Arial", 46, "white");
                 }, 
                  
                  draw: function(renderer){ 
                      //Draw its on screen
                      this.font.draw(renderer.getContext(), "Defend Your Village", 450, 130); 
                      this.font.draw(renderer.getContext(), "ENTER", 250, 530);
                  }
            }))); 
             
            //this is an event handler 
            //It listens for when someone clicks the enter button
             this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
                 if(action === "start"){}
                 me.state.change(me.state.PLAY);
             });
              
        },
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
        //Makes sure when you click enter during game you don't go back to start
            me.input.unbindKey(me.input.KEY.ENTER);  
        //You don't have to be listening for the enter button 
            me.event.unsubscribe(this.handler);
	}
});
