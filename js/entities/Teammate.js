/*  
 */
game.Teammate = me.Entity.extend({ 
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
        this.health = game.data.TeammateHealth; 
        this.alwaysUpdate = true;   
        //this.attacking lets us know if the enemy is currently attacking
        this.attacking = false;  
        //keeps track of when our creep last attacked anything
        this.lastAttacking = new Date().getTime();
        //keep track of the last time our creep hit anything
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        this.body.setVelocity(game.data.playerMoveSpeed, 20); 
          
        this.type = "Teammate"; 
          
        this.renderable.addAnimation("walk", [3, 4, 5], 80); 
        this.renderable.setCurrentAnimation("walk");
    },  
     
    loseHealth: function(damage){
        this.health = this.health - damage; 
        console.log("health damage");
    },
    
    update: function(delta){   
        //Enemy kicked out of game 
        if(this.health <= 0){
           me.game.world.removeChild(this); 
        } 
        
        //It's going to refresh every single time
        this.now = new Date().getTime();
        //Makes charater move left
        this.body.vel.x -= this.body.accel.x * me.timer.tick; 
        //Checks if creep is colliding with a player, base, ect. 
        //Will go striaght to the function collide handler
        me.collision.check(this, true, this.collideHandler.bind(this), true);
         
        //delta represents time as a parameter 
        this.body.update(delta); 
           
         
        this._super(me.Entity, "update", [delta]); 
        return true;
    }, 
     
     collideHandler: function(response){ 
         if(response.b.type==='EnemyBase'){ 
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
         }else if (response.b.type==='EnemyHero'){ 
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
                 response.b.loseHealth(game.data.enemyheroAttack); 
             }
         } 
     } 
     
}); 
 



