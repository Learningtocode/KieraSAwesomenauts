/* 
 *
 */
game.MiniMap = me.Entity.extend({ 
    init: function(x, y, settings){
        this.super(me.Entity, "init", [x, y, {
              image: "minimap",
              width: 280,
              height: 156,
              spritewidth: "280",
              spriteheight: "156",
              getShape: function(){
                  return (new me.Rect(0, 0, 280, 156)).toPolygon();
              }
        }]);
        //Follow screen cordinates. The mini map will stay where I wanted to stay.
        this.floating = true;
    }
});

