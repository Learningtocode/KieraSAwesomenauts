/* 
 * This is the continue page which allows you to spend money on experience. 
 */
game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
            //Loads the the exp-screen as a background
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); 
          
                me.input.bindKey(me.input.KEY.F1, "F1"); 
                me.input.bindKey(me.input.KEY.F2, "F2"); 
                me.input.bindKey(me.input.KEY.F3, "F3"); 
                me.input.bindKey(me.input.KEY.F4, "F4"); 
                me.input.bindKey(me.input.KEY.F5, "F5");  
                //Telling javascript to treat game.data.exp1 as a number 
                var exp1cost = ((Number(game.data.exp1) + 1) * 10);
                
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
                      this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);  
                      //This is going to convert a number to a string with the plus sign which means add.
                      this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);  
                      //The cost for more gold will be the current exp1 added by one then multiplied by 10 when user buys level up                                                                        
                      this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION; CURRENT LEVEL: " + game.data.exp1.toString() + " COST: " + exp1cost, this.pos.x, this.pos.y + 100);  
                      this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD ", this.pos.x, this.pos.y + 150); 
                      this.font.draw(renderer.getContext(), "F3: INCREASE DAMAGE ", this.pos.x, this.pos.y + 200); 
                      this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH ", this.pos.x, this.pos.y + 250);
                  } 
                  
               })));   
           
                //
               this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
                   if(action === "F1"){
                       if(game.data.exp >= exp1cost){
                           //if i have enough exp then exp1 adds to 1 
                           game.data.exp1 += 1; 
                           game.data.exp -= exp1cost; 
                           me.state.change(me.state.PLAY);   
                       }else{
                           console.log("not enough experience");
                       }
                   }else if(action === "F2"){
                       
                   }else if(action === "F3"){
                       
                   }else if(action === "F4"){
                       
                   }else if(action === "F5"){
                       me.state.change(me.state.PLAY);
                   }
               });
          
        },
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
                me.input.unbindKey(me.input.KEY.F1, "F1"); 
                me.input.unbindKey(me.input.KEY.F2, "F2"); 
                me.input.unbindKey(me.input.KEY.F3, "F3"); 
                me.input.unbindKey(me.input.KEY.F4, "F4"); 
                me.input.unbindKey(me.input.KEY.F5, "F5"); 
                me.event.unsubscribe(this.handler);
	}
});


