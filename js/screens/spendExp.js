/* 
 * This is the continue page which allows you to spend money on experience. 
 */
game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); 
         
                //Words onto the title screen 
                //Renderable means we are drawing
                me.game.world.addChild(new (me.Renderable.extend({  
                 init: function(){
                     this._super(me.Renderable, 'init', [270, 240, 300, 50]); 
                     this.font = new me.Font("Arial", 46, "white"); 
                     //Listening for the mouuse to be clicked down  
                     //true is telling us to use screen cordinates
                    
                 }, 
                  
                  draw: function(renderer){ 
                      //Draw its on screen
                      this.font.draw(renderer.getContext(), "SPEND", this.pos.x, this.pos.y); 
                      
                  } 
                  
               })));   
         
        },
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
        
	}
});


