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
        this.type = "PlayerEntity"; 
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.dataplayerMoveSpeed, 20);   
        //Keeps track of what direction your charater is going
        this.facing = "right";  
        //Keeps track of what time it is
        this.now = new Date().getTime(); 
        this.lastHit = this.now; 
        this.dead = false;
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
         
        if(this.health <= 0){
            this.dead = true;       
        }
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
     
    loseHealth: function(){
        this.health = this.health - damage;
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
               // this.pos.x = this.pos.x -1;
            }else if(xdif<70 && this.facing==='left' && xdif>0){
            //Stops player from walking into base from left  
                this.body.vel.x = 0; 
               // this.pos.x = this.pos.x +1;
            }  
            
            //If it is attack, the base will lose health.
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){ 
                this.lastHit = this.now;
                response.b.loseHealth(game.data.playerAttack);
            }
        }else if(response.b.type === 'EnemyCreep'){
            var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;
 
            if (xdif > 0) {
              //  this.pos.x = this.pos.x + 1;
                if (this.facing === "left") {
                    this.body.vel.x = 0;
                }
            } else {
              //  this.pos.x = this.pos.x - 1;
                if (this.facing === "right") {
                    this.body.vel.x = 0;
                }
            }
            if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                   && (Math.abs(ydif) <=40) &&  
                   ((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right") 
                   ){  
               // || means or
               //above abs is absolute value
                this.lastHit = this.now;
                response.b.loseHealth(game.data.playerAttack);
            }
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
     this.health = game.data.playerBaseHealth; 
     this.alwaysUpdate = true; 
     this.body.onCollision = this.onCollision.bind(this); 
      
      this.type = "PlayerBase"; 
       
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
       
       loseHealth: function(damage){
           //Make our base lose a little health no matter how much 
           //we past in
           this.health = this.health - damage;
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
     this.health = game.data.enemyBaseHealth; 
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
        this.health = game.data.enemyCreepHealth; 
        this.alwaysUpdate = true;   
        //this.attacking lets us know if the enemy is currently attacking
        this.attacking = false;  
        //keeps track of when our creep last attacked anything
        this.lastAttacking = new Date().getTime();
        //keep track of the last time our creep hit anything
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        this.body.setVelocity(game.data.playerMoveSpeed, 20); 
          
         this.type = "EnemyCreep"; 
          
          this.renderable.addAnimation("walk", [3, 4, 5], 80); 
          this.renderable.setCurrentAnimation("walk");
    },  
     
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    
    update: function(delta){   
        //Enemy kicked out of game 
        if(this.health <= 0){
           me.game.world.removeChild(this); 
        } 
        
        //It's going to refresh every single time
        this.now = new Date().getTime();
        //Makes charater move left
        this.body.vel.x -= this.accel.x * me.timer.tick; 
        //Checks if creep is colliding with a player, base, ect. 
        //Will go striaght to the function collide handler
        me.collision.check(this, true, this.collideHandler.bind(this), true);
         
        //delta represents time as a parameter 
        this.body.update(delta); 
           
         
        this._super(me.Entity, "update", [delta]); 
        return true;
    }, 
     
     collideHandler: function(response){ 
         if(response.b.type==='PlayerBase'){ 
             //Interaction with player base
             this.attacking=true; 
             //this.lastAttacking=this.now; 
             this.body.vel.x = 0;  
             //Move creep a little to the right when hitting base 
             //"Keeps moving the creep to the right to maintain its position" 
             this.pos.x = this.pos.x + 1;  
             //checks that it has been at least 1 second since this creep hit a base
             if(this.now-this.lastHit >= 1000){
                 //Going to attack again 
                 //updates the lasthit timer
                 this.lastHit = this.now;  
                 //makes player base call its loseHealth function and passes it a  
                 //damage of 1
                 response.b.loseHealth(game.data.enemyCreepAttack); 
             }
         }else if (response.b.type==='PlayerEntity'){ 
              var xdif = this.pos.x - response.b.pos.x;
              
              this.attacking=true; 
             //this.lastAttacking=this.now; 

             if(xdif>0){  
                 //Move creep a little to the right when hitting player 
                 //"Keeps moving the creep to the right to maintain its position" 
                 this.pos.x = this.pos.x + 1; 
                 this.body.vel.x = 0;  
             } 
             this.pos.x = this.pos.x + 1;  
             //checks that it has been at least 1 second since this creep hit a something
             if((this.now-this.lastHit >= 1000) && xdif>0){
                 //Going to attack again 
                 //updates the lasthit timer
                 this.lastHit = this.now;  
                 //makes player call its loseHealth function and passes it a  
                 //damage of 1
                 response.b.loseHealth(game.data.enemyCreepAttack); 
             }
         } 
     } 
     
}); 
 
game.GameManager = Object.extend ({
    //Runs all the timers that is not in player entities 
    //Not an entity and won't appear on screen  
    //Init function is still the constructer that we will use  
    //to make everything happen
    init: function(x, y, settings){
        this.now = new Date().getTime();  
        //Last creep that was maade happen
        this.lastCreep = new Date().getTime(); 
         
        this.alwaysUpdate = true;
    }, 
     
     update: function(){
         this.now = new Date().getTime(); 
          
         //Math.round will check if you have a multiple of ten 
         //Dividing it by a second 
         
         //Is he dead, if so we will execute some stuff
         if(game.data.player.dead){ 
             me.game.world.removeChild(game.data.player);
             me.state.current().resetPlayer(10, 0);  
         } 
         
         if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
             //Creep's timer 
             this.lastCreep = this.now; 
             var creepe = me.pool.pull("EnemyCreep", 1000, 0, {}); 
             //Add creeps to the game screen 
             me.game.world.addChild(creepe, 5);
         }  
          
          return true;
     }
});
        