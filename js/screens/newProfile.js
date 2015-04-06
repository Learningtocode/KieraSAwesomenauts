/* 
 *
 */
game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); 
          
                me.input.unbindKey(me.input.KEY.B); 
                me.input.unbindKey(me.input.KEY.Q); 
                me.input.unbindKey(me.input.KEY.E); 
                me.input.unbindKey(me.input.KEY.W); 
                me.input.unbindKey(me.input.KEY.A);
                
                //Words onto the title screen 
                //Renderable means we are drawing
                me.game.world.addChild(new (me.Renderable.extend({  
                 init: function(){
                     this._super(me.Renderable, 'init', [10, 10, 300, 50]); 
                     this.font = new me.Font("Arial", 26, "white"); 
                     //Listening for the mouuse to be clicked down  
                     //true is telling us to use screen cordinates
                    
                 },  
                 
                  //set exps points
                  draw: function(renderer){ 
                      //Draw its on screen
                      this.font.draw(renderer.getContext(), "PICK A USERNAME AND PASSWORD", this.pos.x, this.pos.y); 
                  } 
                  
               })));   
           
         
        },
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
              
	}
});




