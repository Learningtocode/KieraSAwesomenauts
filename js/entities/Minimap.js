/* 
 *
 */
game.MiniMap = me.Entity.extend({ 
    init: function(x, y, settings){
        this.lastMap = new Date().getTime(); 
        this.now = new Date().getTime(); 
        this.mapping = false;
        this._super(me.Entity, 'init', [x, y, {
              image: 'minimap',
              width: 169,
              height: 338,
              spritewidth: "169",
              spriteheight: "338",
              getShape: function(){
                  return (new me.Rect(0, 0, 169, 338)).toPolygon();
              }
        }]);
        //Follow screen cordinates. The mini map will stay where I wanted to stay.
        this.floating = true;
    },
     update: function(){
         this.now = new Date().getTime();
         //If that buy key is pressed and it has been over a second
         if(me.input.isKeyPressed("map") && this.now-this.lastMap >= 1000){
               this.lastMap = this.now;
               if(!this.mapping){
                  this.startMapping(); 
               }else{
                   this.stopMapping();
               }
          }  
           
        // this.checkBuyKeys();
         
          return true;
      }, 
      startMapping: function(){ 
        //Keeps track of what i am opening
        this.mapping = true;  
        //Take the position we are currently paused at  
        game.data.minimap = me.game.viewport.localToWorld(0, 0); 
        //When you add spend gold screen, gold will know where to put itself
        game.data.minimap = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('minimap')); 
        //34 is a z factor making the screen go in front (depth)
        me.game.world.addChild(game.data.minimap, 34); 
        this.setBuyText();
      },   
      stopMapping: function(){ 
          //Keeps track when i am closing
          this.mapping = false;
          //Removing our minimap 
          me.game.world.removeChild(game.data.minimap); 
      }
     
});

