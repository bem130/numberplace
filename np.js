class NPdata {
    constructor() {
        this.board = new Array(9);
        for (let i=0;i<9;i++) {this.board[i] = new Array(9).fill(null);}
    }
    setNumber(x,y,n) {this.board[x-1][y-1] = n;}
    get() {return this.board;}
}

class SolveNP {
    constructor(data) {
    }
}