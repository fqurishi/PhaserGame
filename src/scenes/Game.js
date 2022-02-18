import Phaser from 'phaser'
import Line from '../GameObjects/Line'

class Game extends Phaser.Scene
{

    preload()
    {

    }

    //list of colors
    colorArray = [0xef2929, 0x729fcf, 0x8ae234, 0xad7fa8, 0x778899, 0xffb6c1, 0xffffff, 0xffff00]
    hexagonDotsList = []
    line

    create()
    {
        var gameThis = this;
        var shape = new Phaser.Geom.Circle(-1, 22, 15)
        //create grid
        let hexagonDots = this.createHexagonDots(this.getRandomInt(22),this.getRandomInt(15))
        // for loop to make all hex dots clickable
        for(let i = 0; i < this.hexagonDotsList.length; i++){
            this.hexagonDotsList[i].setInteractive(shape, this.handler)
        }

        this.input.on('gameobjectdown', function(pointer, gameObject){
            gameThis.add.line(-7, 7, gameObject.x,gameObject.y, pointer.x+5, pointer.y, 0xffffff,2)
            gameObject.isStroked = true
            console.log(gameObject.x,gameObject.y)
            console.log(pointer.x,pointer.y)
            console.log(this.x,this.y)
            console.log(gameObject.fillColor)
        });
        this.input.on('pointerup', function(){
            for(let i = 0; i < gameThis.hexagonDotsList.length; i++){
                gameThis.hexagonDotsList[i].isStroked = false
            }
        });
        
    }

    update(){
        //this.children.last.destroy()
    }


    //handler method taken from phaser example
    handler(shape, x, y, gameObject)
    {
        if (shape.radius > 0 && x >= shape.left && x <= shape.right && y >= shape.top && y <= shape.bottom)
        {
            var dx = (shape.x - x) * (shape.x - x);
            var dy = (shape.y - y) * (shape.y - y);
    
            return (dx + dy) <= (shape.radius * shape.radius);
        }
        else
        {
            return false;
        }

    }
    
    //random int function
    getRandomInt(max){
        return Math.floor(Math.random() * max)
    }

    

    //function to create grid and hexagon dots
    createHexagonDots(rows,columns){
        // make bounds for how many rows and columns there can be
        //no more than 9 rows
        if(rows > 22)
        {
            rows = 22
        }
        //no less than 0 rows
        else if (rows < 0)
        {
            rows = 1
        }
        //no more than 15 columns
        if(columns > 15){
            columns = 15
        }
        //no less than 0 columns
        else if (columns < 0){
            columns = 1
        }
        // data points for hexagon polyshape
        var data = [ 0,5, 15,15, 15,30, 0,40, -15,30, -15,15];
        //starting points for first dot
        var x = 0;
        var y = 45;
        //for loop to create grid of hexagon dots
        var totalCount = 0
        for (let i = 0; i < columns; i++) {
            //offset to create perfect looking honeycomb grid
            if(i % 2 == 0){
                x=60
            }
            else(
                x=76
            )
            for (let j = 0; j < rows; j++){
                this.add.polygon(x,y,data,this.colorArray[this.getRandomInt(8)], 1)
                this.hexagonDotsList.push(this.children.list[totalCount])
                x+=32
                totalCount+=1
            }
            y+= 28
        }
        
    }


}
export default Game