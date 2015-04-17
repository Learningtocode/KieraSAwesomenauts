/* 
 *
 */
game.SpearThrow = me.Entity.extend({
    init: function(x, y, settings, facing){
         this._super(me.Entity, 'init', [x, y, {
           image: "spear", 
           width: 48, 
           height: 48, 
           spritewidth: "48", 
           spriteheight: "48", 
           getShape: function(){
               return (new me.Rect(0, 0, 48, 48)).toPolygon();
           }
        }]);  
        this.alwaysUpdate = true;     
        this.body.setVelocity(8, 0); 
        this.attack = game.data.ability3*3;
        this.facing = facing
        this.type = "spear"; 
    },
    
    update: function(delta){ 
        if(this.facing === "left"){
        //Makes spear move left
            this.body.vel.x -= this.body.accel.x * me.timer.tick; 
             }else{ 
              this.body.vel.x += this.body.accel.x * me.timer.tick;
            }
        //Checks if spear is colliding with a player, base, ect. 
        //Will go striaght to the function collide handler
        me.collision.check(this, true, this.collideHandler.bind(this), true);
         
        //delta represents time as a parameter 
        this.body.update(delta); 

        this._super(me.Entity, "update", [delta]); 
        return true;
    },
    
    collideHandler: function(response){ 
         if(response.b.type==='EnemyBase' || response.b.type==='EnemyCreep'){ 
                 response.b.loseHealth(this.attack);  
                 me.game.world.removeChild(this);
     } 
 }
   });

