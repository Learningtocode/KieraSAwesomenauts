/* 
 *
 */
game.MiniMap = me.Entity.extend({ 
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
              image: 'minimap',
              width: 165,
              height: 336,
              spritewidth: "165",
              spriteheight: "336",
              getShape: function(){
                  return (new me.Rect(0, 0, 165, 336)).toPolygon();
              }
        }]);
        //Follow screen cordinates. The mini map will stay where I wanted to stay.
        this.floating = true;
    }
});

