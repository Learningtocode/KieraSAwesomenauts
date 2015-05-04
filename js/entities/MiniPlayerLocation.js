/* 
 * This is the class that will keep track of our player on the minimap.
 */
game.MiniPlayerLocation = me.Entity.extend({ 
    init: function(x, y, settings){
        this.settings = settings;
        //r is radius which is for the circle represented for the player.
        this.r = 5;
        this.diameter = (this.r+2)*2;
        this.achorPoiint = new me.Vector2d(0, 0);
        //Keep track of where circle goes
        this.loc = x, y;
        this.settings.width = this.diameter; 
        this.settings.height = this.diameter;
        this.settings.spritewidth = this.diameter; 
        this.settings.spriteheight = this.diameter;
        this.settings = this.diameter; 
        this.floating = true;
        this.image = me.video.createCanvas(this.settings.width, this.settings.height);
        //Need a contact to draw on
        var ctx = me.video.renderer.getContext2d(this.image);
        //Now I am going to draw
        ctx.fillStyle = "rgba(0, 192, 32, 0, 0.75)"; 
        //Stroke is what goes around the cirlce
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2; 
        //Draw our circle
        ctx.arc(this.r + 2, this.r +2, this.r, 0, Math.PI*2);
        //Fill the cirlce
        ctx.fill();
        ctx.stroke(); 
        
        var my = this;
        this._super(me.Entity, "init", [x, y, {
              width: 14,
              height: 14,
              spritewidth: 14,
              spriteheight: 14,
              getShape: function(){
                  return(new me.Rect(0, 0, 14, 14)).toPolygon();
              }
        }]);
    },

    draw: function(renderer){
        this._super(me.Entity, "draw", [renderer]);
        this.floating = true;
        renderer.drawImage(
                this.image, 
                0, 0, this.width, this.height,
                this.pos.x, this.pos.y, this.width, this.height
                );
    }, 
     
    update: function(){
        //The 10 and the 10 are offsets of my mini map AND JUST CHANGING THE PLAYERS POSITION!
        this.pos.x = (10 + (game.data.player.pos.x *0.12));
        this.pos.y = (10 + (game.data.player.pos.y * 0.12));
        return true;
    }

 });
