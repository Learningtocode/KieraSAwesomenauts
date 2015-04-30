/* 
 *
 */
game.EnemyObjectEntity = me.Entity.extend({ 
     init: function(x, y, settings){
         this._super(me.Entity, 'init', [x, y, {
                 image: "crate", 
                 width: 100, 
                 height: 62, 
                 spritewidth: "100", 
                 spriteheight: "62", 
                 getShape: function(){
                     return (new me.Rect(0, 0, 100, 62).toPolygon)();
                 }
         }]); 
     
     this.alwaysUpdate = true; 
     this.body.onCollision = this.onCollision.bind(this); 
      
      this.type = "EnemyObjectEntity"; 
       
       
     }, 
      
      update:function(delta){ 
          this.body.update(delta); 
           
          this._super(me.Entity, "update", [delta]); 
          return true;
      },  
       
      
      onCollision: function(){ 
       
      }
}); 


