//Since it is a class, both letters must be captialize. 
game.PlayerEntity = me.Entity.extend({ 
    init: function(x, y, settings){
        this.setSuper(x, y);  
        //Anytime you have get.getTimers involves this function
        this.setPlayerTimers();  
        //Charateristics about the player
        this.setAttributes();  
        //Flags are things that are one way or another (two values)
        this.setFlags(); 
        this.type = "PlayerEntity"; 
       //No matter where my player goes, it's being followed.
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); 
        this.addAnimation();
        this.renderable.setCurrentAnimation("idle");   
    }, 
     
    setSuper: function(x, y){
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
     }, 
      
    setPlayerTimers: function(){
         //Keeps track of what time it is in the game
        this.now = new Date().getTime(); 
        this.lastHit = this.now; 
        this.lastSpear = this.now;
        this.lastAttack = new Date().getTime();
     }, 
      
    setAttributes: function(){
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20); 
        this.attack = game.data.playerAttack;
     }, 
      
    setFlags: function(){ 
        //Keeps track of what direction your charater is going
        this.facing = "right";  
        this.dead = false;  
        this.attacking = false;
     }, 
      
    addAnimation: function(){
        //The numbers in the array are the actual animation sequences. 
        //Numbers outside the array such as 80 in attack are the speed of the animation.
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80); 
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
     },
     
    update: function(delta){ 
        this.now = new Date().getTime(); 
        //If health is below zero, you are dead. 
        //.this defines checkIfDead as a class
        this.dead = this.checkIfDead();   
        //Doing two functions in code
        this.checkKeyPressesAndMove();      
        this.checkAbilityKeys();
        this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        //Delta is the change in time that has happened.  
        //If i don't update it, it will not know it has been changed on the screen.
        this.body.update(delta);  
        this._super(me.Entity, "update", [delta]);
        return true;
    },  
     
    checkIfDead: function(){
         if(this.health <= 0){
            return true;       
        } 
        return false;
    }, 
     
    checkKeyPressesAndMove: function(){
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
        if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
            //This variable is in all entities.
            this.body.jumping = true; 
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        } 
        this.attacking = me.input.isKeyPressed("attack");
    },
     
    loseHealth: function(damage){
        this.health = this.health - damage;
    }, 
    
    checkAbilityKeys: function(){
        if(me.input.isKeyPressed("skill1")){
           // this.speedBurst();
        }else if(me.input.isKeyPressed("skill2")){
            // this.eatCreep();
        }
        else if(me.input.isKeyPressed("skill3")){
            this.throwSpear();
        }
    }, 
     
    throwSpear: function(){ 
        if(this.lastSpear >= game.data.spearTimer && game.data.ability3 >= 0){
            this.lastSpear = this.now;
             var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}); 
             me.game.world.addChild(spear, 10);
         }
    },

    setAnimation: function(){
        if(this.attacking){
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
    },

    collideHandler: function(response){ 
    //Response.a represents our charater  
    //Response.b represents whatever we are colliding with
        if(response.b.type ==='EnemyBaseEntity'){
           this.collideWithEnemyBase(response);
        }else if(response.b.type === 'EnemyCreep'){ 
            this.collideWithEnemyCreep(response);
        }
     },  
     
    collideWithEnemyBase: function(response){
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
            }else if(xdif<70 && this.facing==='left' && xdif>0){
            //Stops player from walking into base from left  
                this.body.vel.x = 0;
            }  
            //If it is attack, the base will lose health.
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){ 
                this.lastHit = this.now;
                response.b.loseHealth(game.data.playerAttack);
            }  
     }, 
      
    collideWithEnemyCreep: function(response){
            var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;
 
            this.stopMovement(xdif);  
            
            if(this.checkAttack(xdif, ydif)){
               this.hitCreep(response);
            };  
        }, 
      
    stopMovement: function(xdif){
             if (xdif > 0) {
                if (this.facing === "left") {
                    this.body.vel.x = 0;
                }
            } else {
                if (this.facing === "right") {
                    this.body.vel.x = 0;
                }
            }
      },
       
    checkAttack: function(xdif, ydif){ 
        //Are the timers good?
             if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
                   && (Math.abs(ydif) <=40) &&  
                   (((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right")) 
                   ){  
               console.log("returning true");
            // || means or
            //above abs is absolute value
                this.lastHit = this.now;  
            //if the creeps health is less than our attack, execute code in if statement
            return true; 
            //If return true, all the code in function check attack will be executed.
            } 
            return false; 
            //if there isn't an attack, the code won't execute
      }, 
       
    hitCreep: function(response){
        if(response.b.health <= game.data.playerAttack) {
                    //adds one gold for a creep kill 
                    game.data.gold += 1;
                }  
                response.b.loseHealth(game.data.playerAttack);
    }
}); 
 