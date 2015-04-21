game.resources = [ 
    /* This is where you can pull all the elements you are going to use in your game.*/

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */  
        /* This is the map for the background tiles. The name for this is background tiles. 
         *  The source of this files shows the path to where the computer must look for the image (which is the type). 
         *  Type more or less is the format of the file. */
        {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
        {name: "player", type:"image", src: "data/img/orcSpear.png"},
        {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
        {name: "tower", type:"image", src: "data/img/tower_round.svg.png"}, 
        {name: "creep1", type:"image", src: "data/img/brainmonster.png"},
	{name: "title-screen", type:"image", src: "data/img/title_1.png"}, 
        {name: "exp-screen", type:"image", src: "data/img/loadpic.jpg"}, 
        {name: "gold-screen", type:"image", src: "data/img/spend.png"},
	{name: "load-screen", type:"image", src: "data/img/loadingpic.jpg"}, 
        {name: "new-screen", type:"image", src: "data/img/newpic.png"},
        {name: "spear", type:"image", src: "data/img/spear.png"},
        {name: "minimap", type:"image", src: "data/img/minimap.png"},
        
        /* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */ 
        /*   */
        {name: "level01", type: "tmx", src: "data/map/test.tmx"},
  
	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
