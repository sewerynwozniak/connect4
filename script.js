class Connect4{

     
    constructor(){
        this.connectBoard = document.querySelector('.connect-board');
        this.columnsWrapper = document.querySelectorAll('.columnWrapper');
        this.button = document.querySelector('button')
        this.pointer = document.querySelector('.pointer')
        this.currentPlayer=1;
        this.gameIsGoing = true;
        this.connArr=[
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
        ]
        this.handleClickColumn = (column)=>{
            if(!this.gameIsGoing)return;
            this.clickColumn(column)
        }
        this.events();
    }


    events(){ 
        this.columnsWrapper.forEach(column=>column.addEventListener('click', this.handleClickColumn.bind(this, column)))
        this.connectBoard.addEventListener('mousemove', this.handlePointer.bind(this));
    }


    handlePointer(e){
        const xPosition = e.pageX
        const connectBoardPosition = this.connectBoard.getBoundingClientRect().left
        const xPositionReftoBoard = connectBoardPosition-xPosition;
        this.pointer.style.left = -xPositionReftoBoard +'px';
    }


    switchPlayers(){
        if(this.currentPlayer==1){
            this.currentPlayer=2;
        }else{
            this.currentPlayer=1;
        }
    }





    clickColumn(col){       
        let column = col.getAttribute('data-wrapperColumn'); 
        this.checkIfFree(column);
        this.dropAnimation()
        this.checkIfWin();
        this.switchPlayers()

    }


     checkIfFree(column){

        for(let i=0;i<this.connArr.length;i++){

            if(this.connArr[i][column] == null){
                this.connArr[i][column] = this.currentPlayer;
                this.takeSlotAnimation(i, column);
                return;
            }
        }
        
    }



    horizontalCheckWin(i ,j,player){
        if(this.connArr[i][j]==player && this.connArr[i][j+1]==player && this.connArr[i][j+2]==player && this.connArr[i][j+3]==player){
            console.log('zwyciestwo', player);      
           return this.finishGame();
        }
        
    }
    skewRightCheckWin(i ,j,player){
        if(this.connArr[i][j]==player && this.connArr[i+1][j+1]==player && this.connArr[i+2][j+2]==player && this.connArr[i+3][j+3]==player){
            console.log('zwyciestwo', player);
            return this.finishGame();
        }
    }
    skewLeftCheckWin(i ,j,player){
        if(this.connArr[i][j]==player && this.connArr[i+1][j-1]==player && this.connArr[i+2][j-2]==player && this.connArr[i+3][j-3]==player){
            console.log('zwyciestwo', player);
            return this.finishGame();
        }
    }
    verticalCheckWin(i ,j,player){
        if(this.connArr[i][j]==player && this.connArr[i+1][j]==player && this.connArr[i+2][j]==player && this.connArr[i+3][j]==player){
            console.log('zwyciestwo', player);
            
            return this.finishGame();
        }
    }


    checkIfWin(){

        
        for(let i=0;i<this.connArr.length;i++){

            if(!this.gameIsGoing){break;}
          
                //horizontal
                for(let j=0;j<this.connArr[i].length-3;j++){
                    this.horizontalCheckWin(i,j,1)
                    this.horizontalCheckWin(i,j,2)               
                }
                //skew right
                for(let j=0;j<this.connArr[i].length-3;j++){
                    this.skewRightCheckWin(i,j,1)
                    this.skewRightCheckWin(i,j,2)          
                }
                //skew left
                for(let j=this.connArr[i].length-1;j>this.connArr[i].length-5;j--){
                    this.skewLeftCheckWin(i,j,1)
                    this.skewLeftCheckWin(i,j,2)
                }
                //vertical
                if(i<=2){
                for(let j=0;j<=this.connArr[i].length-1;j++){
                    this.verticalCheckWin(i,j,1)
                    this.verticalCheckWin(i,j,2)
                }
                }

            }
        
    }



    finishGame(){
        console.log('finish game')
        this.gameIsGoing = false;  
    }

    restartGame(){
        connArr = this.connArr.forEach(el=>el.map(e=>null));
    }



    //animations
    switchPlayersAnimation(){
        if(this.currentPlayer==1){
            this.pointer.classList.remove('token2')
            this.pointer.classList.add('token1')
        }else{
            this.pointer.classList.remove('token1')
            this.pointer.classList.add('token2')
        }
    }

    dropAnimation(){
        this.pointer.style.animation='dropAnimation 0.3s forwards'
      
        setTimeout(()=>{
            this.switchPlayersAnimation()
            this.pointer.style.animation=''
        },500)
    }



    takeSlotAnimation(row, column){

        let animObj={
            1:'token1',
            2:'token2'
        }
        let slot = document.querySelector(`[data-row='${row}'][data-column='${column}']`)

        slot.classList.add(animObj[this.currentPlayer])
        slot.style.animation='bounceAnimation 0.5s ease-out forwards'

    }



}





connect4 = new Connect4();


