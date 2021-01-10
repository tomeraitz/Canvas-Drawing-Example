class MagicDraw{
    constructor(){
        this.mousePressed = false;
        this.lastX = 0;
        this.lastY = 0;
        this.ctx = null;
        this.canvas = null;
        this.buttonClear = null;
        this.buttonUndo = null;
        this.buttonRedo = null;
        this.linesArray = new Array();
        this.numberOfLines = -1;
        this.initCanvas()
    }
    
    initCanvas(){
        window.onload = () =>{
            this.canvas =document.getElementById('myCanvas'); 
            this.buttonClear = document.getElementById('clear'); 
            this.buttonUndo = document.getElementById('undo'); 
            this.buttonRedo = document.getElementById('redo'); 
            this.ctx = this.canvas.getContext("2d");
            this.loadController();
            this.drawImage();
          };
    }

    loadController(){
        this.canvas.addEventListener('mousedown' ,  (e) =>{
            this.mousePressed = true;
            let cancelateXPotion = e.pageX - this.canvas.offsetLeft
            let cancelateYPotion = e.pageY - this.canvas.offsetTop
            this.drawLine(cancelateXPotion, cancelateYPotion, false);
        });
    
        this.canvas.addEventListener('mousemove' , (e) =>{
            if (this.mousePressed) {
                let cancelateXPotion = e.pageX - this.canvas.offsetLeft
                let cancelateYPotion = e.pageY - this.canvas.offsetTop
                this.drawLine(cancelateXPotion, cancelateYPotion, true);
            }
        });
    
        this.canvas.addEventListener('mouseup' , () =>{
            if (this.mousePressed) {
                this.mousePressed = false;
                this.insertLine();
            }
        });
    
        this.canvas.addEventListener('mouseleave', () =>{
            if (this.mousePressed) {
                this.mousePressed = false;
                this.insertLine();
            }
        });

        this.buttonClear.addEventListener('click', () =>{
            this.clear();
        });

        this.buttonUndo.addEventListener('click', () =>{
            this.undo();
        });

        this.buttonRedo.addEventListener('click', () =>{
            this.redo();
        });
    }

    drawImage(){
        let image = new Image();
        image.src = 'myimg.jpg';
        image.addEventListener('load' ,  () =>{
            this.ctx.drawImage(image, 0, 0, 500, 200);
            this.insertLine();
        }); 
    }

    drawLine(x, y, isInDrawMode){
        if (isInDrawMode) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = document.getElementById('selColor').value;
            this.ctx.lineWidth = document.getElementById('selWidth').value;
            this.ctx.lineJoin = "round";
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(x, y);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        this.lastX = x;
        this.lastY = y;
    }

    insertLine(){
        this.numberOfLines++;
        if (this.numberOfLines < this.linesArray.length) { this.linesArray.length = this.numberOfLines; }
        this.linesArray.push(this.canvas.toDataURL());
    }

    undo(){
        if (this.numberOfLines > 0) {
            this.numberOfLines--;
            let canvasPic = new Image();
            canvasPic.src = this.linesArray[this.numberOfLines];
            canvasPic.onload =  () => { this.ctx.drawImage(canvasPic, 0, 0); }
        }
    }

    redo(){
        if (this.numberOfLines < this.linesArray.length-1) {
            this.numberOfLines++;
            let canvasPic = new Image();
            canvasPic.src = this.linesArray[this.numberOfLines];
            canvasPic.onload =  () => { this.ctx.drawImage(canvasPic, 0, 0); }
        }
    }

    clear(){
        this.numberOfLines = -1;
        this.linesArray.length = 0;
        this.drawImage();
    }
}

const magicDraw = new MagicDraw();







