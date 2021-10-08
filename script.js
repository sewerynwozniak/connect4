const connectBoard = document.querySelector('.connect-board')    
const dots = document.querySelectorAll('.dot');
const button = document.querySelector('button')



let connArr=[
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
]





class Connect4{

    connectBoard = document.querySelector('.connect-board');
    currentPlayer;
    listenerReff = (e)=> this.clickColumn(e);
    
    constructor(){
        this.connectBoard.addEventListener('click', this.listenerReff);
        this.currentPlayer=1;
    }



    clickColumn(e){
        let row = e.target.getAttribute('data-row');
        let column = e.target.getAttribute('data-column');

        this.checkIfFree(column);
        this.checkIfWin();

        if(this.currentPlayer==1){
            this.currentPlayer=2;
        }else{
            this.currentPlayer=1;
        }


    }


     checkIfFree(column){


        //if(connArr[5][column] != null) return;

        for(let i=0;i<connArr.length;i++){

            if(connArr[i][column] == null){
                connArr[i][column] = this.currentPlayer;
                this.takeSlotAnimation(i, column);
                return;
            }
        }
        

    }


    horizontalCheckWin(i ,j,player){
        if(connArr[i][j]==player && connArr[i][j+1]==player && connArr[i][j+2]==player && connArr[i][j+3]==player){
            console.log('zwyciestwo', player);
           return this.finishGame();
        }
    }
    skewRightCheckWin(i ,j,player){
        if(connArr[i][j]==player && connArr[i+1][j+1]==player && connArr[i+2][j+2]==player && connArr[i+3][j+3]==player){
            console.log('zwyciestwo', player);
            return this.finishGame();
        }
    }
    skewLeftCheckWin(i ,j,player){
        if(connArr[i][j]==player && connArr[i+1][j-1]==player && connArr[i+2][j-2]==player && connArr[i+3][j-3]==player){
            console.log('zwyciestwo', player);
            return this.finishGame();
        }
    }
    verticalCheckWin(i ,j,player){
        if(connArr[i][j]==player && connArr[i+1][j]==player && connArr[i+2][j]==player && connArr[i+3][j]==player){
            console.log('zwyciestwo', player);
            return this.finishGame();
        }
    }


    checkIfWin(){

        for(let i=0;i<connArr.length;i++){

            //horizontal
            for(let j=0;j<connArr[i].length-3;j++){
                this.horizontalCheckWin(i,j,1)
                this.horizontalCheckWin(i,j,2)               
            }
            //skew right
            for(let j=0;j<connArr[i].length-3;j++){
                this.skewRightCheckWin(i,j,1)
                this.skewRightCheckWin(i,j,2)          
            }
            //skew left
            for(let j=connArr[i].length-1;j>connArr[i].length-5;j--){
                this.skewLeftCheckWin(i,j,1)
                this.skewLeftCheckWin(i,j,2)
            }
            //vertical
            if(i<=2){
            for(let j=0;j<=connArr[i].length-1;j++){
                this.verticalCheckWin(i,j,1)
                this.verticalCheckWin(i,j,2)
            }
            }

            }
        
    }



    
    takeSlotAnimation(row, column){

        let slot = document.querySelector(`[data-row='${row}'][data-column='${column}']`)
        let animObj={
            1:'taken1',
            2:'taken2'
        }
        slot.classList.add(animObj[this.currentPlayer])

    }


    finishGame(){

        this.connectBoard.removeEventListener('click', this.listenerReff);
        connArr = connArr.forEach(el=>el.map(e=>null));

        

        console.log(connArr)


    }




}





connect4 = new Connect4();


