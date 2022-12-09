class NPdata {
    constructor() {
        this.board = new Array(9);
        for (let i=0;i<9;i++) {this.board[i] = new Array(9).fill(null);}
    }
    setNumber(x,y,n) {this.board[x-1][y-1] = n;}
    getCell(x,y) {return this.board[x-1][y-1];}
    get() {return this.board;}
}

class SolveNP {
    constructor(data) {
        this.sboard = new Array(9);
        for (let i=0;i<9;i++) {
            this.sboard[i] = new Array(9).fill(null);
        }
        for (let i=0;i<9;i++) {
            for (let j=0;j<9;j++) {
                this.sboard[i][j] = [data.getCell(i+1,j+1)];
                for (let k=0;k<9;k++) {
                    this.sboard[i][j].push(true);
                }
            }
        }
        console.table(this.sboard);
    }
}