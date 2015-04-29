/* 
 *
 */
game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {
            me.audio.playTrack("pausesong");
            //Loads the the exp-screen as a background
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('pause-screen')), -10); 
          
                me.input.bindKey(me.input.KEY.P, "pause"); 
                 

                //Words onto the title screen 
                //Renderable means we are drawing
                me.game.world.addChild(new (me.Renderable.extend({  
                 init: function(){
                     this._super(me.Renderable, 'init', [10, 10, 300, 50]); 
                     this.font = new me.Font("Arial", 26, "black"); 
                     //Listening for the mouuse to be clicked down  
                     //true is telling us to use screen cordinates
                    
                 },  
                 
                  //set exps points
                  draw: function(renderer){ 
                      //Draw its on screen
                      this.font.draw(renderer.getContext(), "Pause", this.pos.x, this.pos.y);  
                  } 
                  
               })));   
           
                //
               this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
                   if(action === "P"){
                           me.state.change(me.state.PAUSE);   
                       }else{
                       me.state.change(me.state.PLAY);
                   }
               });
          
        },
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
                me.input.unbindKey(me.input.KEY.F1, "P");  
                me.event.unsubscribe(this.handler);
                me.audio.stopTrack();
	}
});

