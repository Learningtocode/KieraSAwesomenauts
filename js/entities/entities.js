//Since it is a class, both letters must be captialize. 
game.PlayerEntity = me.Entity.extend({ 
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
            //This is calling on the orcSpear.png 
                image: "player", 
                width: 64, 
                height: 64, 
                spritewidth: "64", 
                spriteheight: "64", 
                getShape: function(){  
                    //This is a hit box
                    return(new me.Rect(0, 0, 100, 70)).toPolygon();
                }
        }]); 
       
        this.body.setVelocity(5, 20);   
        //Keeps track of what direction your charater is going
        this.facing = "right";  
        //Keeps track of what time it is
        this.now = new Date().getTime(); 
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();
        //No matter where my player goes, it's being followed.
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
           
        //The numbers in the array are the actual animation sequences. 
        //Numbers outside the array such as 80 in attack are the speed of the animation.
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80); 
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
         
        this.renderable.setCurrentAnimation("idle");
        
    },
     
    update: function(delta){ 
        this.now = new Date().getTime();
        if(me.input.isKeyPressed("right")){ 
           //adds to the position of my x by the velocity defined above in 
           //setVelocity() and multiplying it by me.timer.tick. 
           //me.timer.tick makes the movement look smooth.
            this.body.vel.x += this.body.accel.x * me.timer.tick;  
            this.flipX(true); 
            this.facing = "right";
        }else if(me.input.isKeyPressed("left")){ 
            this.facing = "left";
            //-= moves us to the left
            this.body.vel.x -=this.body.accel.x * me.timer.tick; 
            //We don't want our players to be looking like he/she is moving right.
            this.flipX(false);
        }else{
            this.body.vel.x = 0;
        }   
          
        //We don't want our jump function to be involved with the if statements above. 
        //Since the if statement above involves the x axis not the y.
        //the &&'s says that it wouldn't double jump or jump while falling.
        if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){
            //This variable is in all entities.
            this.jumping = true; 
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }
        
        if(me.input.isKeyPressed("attack")){
            if(!this.renderable.isCurrentAnimation("attack")){ 
                //Sets the current animation to attack and once that is over 
                //goes back to the idle animation
                this.renderable.setCurrentAnimation("attack", "idle"); 
                //Makes it so that the next time we start this sequence we begin 
                //from the first animation not wherever we left off when we  
                //switched to another animation
                this.renderable.setAnimationFrame();
            }
        } 

       else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
        if(!this.renderable.isCurrentAnimation("walk")){
            this.renderable.setCurrentAnimation("walk");
        }  
    }else if(!this.renderable.isCurrentAnimation("attack")){
        this.renderable.setCurrentAnimation("idle");
    } 
        me.collision.check(this, true, this.collideHandler.bind(this), true);
          
         
         //Delta is the change in time that has happened.  
         //If i don't update it, it will not know it has been changed on the screen.
         this.body.update(delta); 
          
         this._super(me.Entity, "update", [delta]);
         return true;
    }, 
      
    //Response.a represents our charater  
    //Response.b represents whatever we are colliding with
    collideHandler: function(response){
        if(response.b.type ==='EnemyBaseEntity'){
            //Variables ydif and xdif represent diference between  
            //my player's position and base's position 
            var ydif = this.pos.y - response.b.pos.y; 
            var xdif = this.pos.x - response.b.pos.x; 
               
            if(ydif<-40 && xdif< 70 && xdif>-35){ 
            //Stops player from going though base from jumping on it
                this.body.falling = false;  
                this.body.vel.y = -1;
            }
            else if(xdif>-35 && this.facing==='right' && (xdif<0)){ 
            //Stop player from walking into base from the right
            this.body.vel.x = 0; 
            this.pos.x = this.pos.x -1;
            }else if(xdif<70 && this.facing==='left' && xdif>0){
            //Stops player from walking into base from left  
                this.body.vel.x = 0; 
                this.pos.x = this.pos.x +1;
            }  
            
            //If it is attack, the base will lose health.
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 400) 
                this.lastHit = this.now;
                response.b.loseHealth();
        }
    }
}); 
 
game.PlayerBaseEntity = me.Entity.extend({ 
     init: function(x, y, settings){
         this._super(me.Entity, 'init', [x, y, {
                 image: "tower", 
                 width: 100, 
                 height: 100, 
                 spritewidth: "100", 
                 spriteheight: "100", 
                 getShape: function(){
                     return (new me.Rect(0, 0, 100, 70).toPolygon)();
                 }
         }]); 
     this.broken = false; 
     this.health = 10; 
     this.alwaysUpdate = true; 
     this.body.onCollision = this.onCollision.bind(this); 
      
      this.type = "PlayerBaseEntity"; 
       
       this.renderable.addAnimation("idle", [0]);  
       this.renderable.addAnimation("broken", [1]);
       this.renderable.setCurrentAnimation("idle");
     }, 
      
      update:function(delta){ 
          if(this.health<=0){
              this.broken = true; 
              this.renderable.setCurrnetAnimation("broken");
          }
          this.body.update(delta); 
           
          this._super(me.Entity, "update", [delta]); 
          return true;
      }, 
      
      onCollision: function(){ 
       
      }
}); 
 
game.EnemyBaseEntity = me.Entity.extend({ 
     init: function(x, y, settings){
         this._super(me.Entity, 'init', [x, y, {
                 image: "tower", 
                 width: 100, 
                 height: 100, 
                 spritewidth: "100", 
                 spriteheight: "100", 
                 getShape: function(){
                     return (new me.Rect(0, 0, 100, 100).toPolygon)();
                 }
         }]); 
     this.broken = false; 
     this.health = 10; 
     this.alwaysUpdate = true; 
     this.body.onCollision = this.onCollision.bind(this); 
      
      this.type = "EnemyBaseEntity";  
       
      this.renderable.addAnimation("idle", [0]);  
      this.renderable.addAnimation("broken", [1]);
      this.renderable.setCurrentAnimation("idle"); 
      
     }, 
      
      update:function(delta){ 
          if(this.health<=0){
              this.broken = true; 
               this.renderable.setCurrentAnimation("broken"); 
          }
          this.body.update(delta); 
           
          this._super(me.Entity, "update", [delta]); 
          return true;
      }, 
      
      onCollision: function(){ 
       
      }, 
      
      loseHealth: function(){
          this.health--;
      } 
      
}); 
 
game.EnemyCreep = me.Entity.extend({ 
    //For entities, this will always be the set up
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
           image: "creep1", 
           width: 32, 
           height: 64, 
           spritewidth: "32", 
           spriteheight: "64", 
           getShape: function(){
               return (new me.Rect(0, 0, 32, 64)).toPolygon();
           }
        }]); 
        this.health = 10; 
        this.alwaysUpdate = true; 
         
         this.setVelocity(3, 20); 
          
         this.type = "EnemyCreep"; 
          
          this.renderable.addAnimation("walk", [3, 4, 5], 80); 
          this.renderable.setCurrentAnimation("walk");
    }, 
    
    update: function(){
        
    }
});