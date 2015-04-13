/* 
 *  The Game Manager does a few things. 
 * 1) Removes the player when he is dead and resets him. 
 * 2) Adds gold  
 * 3) Manages creeps, making creeps reappear on a timer
 */ 


 
game.HeroDeathManager = Object.extend({
    //Is he dead, if so we will execute some stuff  
    init: function(x, y, settings){
        this.alwaysUpdate = true;
    }, 
     
    update: function(){
        if(game.data.player.dead){ 
             me.game.world.removeChild(game.data.player);
             me.state.current().resetPlayer(10, 0);  
         } 
         return true;
    }
});
  
game.ExperienceManager = Object.extend({
     init: function(x, y, settings){
         this.alwaysUpdate = true; 
         this.gameover = false;
     },
     
     update: function(){
         if(game.data.win === true && !this.gameover){
             this.gameOver(true);
             alert("YOU WIN!");
         }else if(game.data.win === false && !this.gameover){ 
             this.gameOver(false);
             alert("YOU LOSE!");
         } 
         
         return true;
     }, 
     
     gameOver: function(win){ 
         if(win){
             game.data.exp += 10;
         }else{
             game.data.exp += 1; 
         } 
         //Checking the variable not function
         this.gameover = true; 
         me.save.exp = game.data.exp; 
         
         
            $.ajax({
            type: "POST",
            url: "php/controller/save-user.php",
            //Looks at the username id and see the value passing it in 
            //as a variable which it will then call username
            data: {
            //Pass in these variables which is going to be filtered
            //as well as saved these pieces of info 
                exp: game.data.exp,
                exp1: game.data.exp1,
                exp2: game.data.exp2,
                exp3: game.data.exp3,
                exp4: game.data.exp4,
            },
            dataType: "text"
        })
                .success(function(response) {
                    if (response === "true") {
                        me.state.change(me.state.MENU);
                    } else {
                        alert(response);
                    }
                })
                .fail(function(response) {
                    alert("Fail");
                });

    } 
     
});
 
 