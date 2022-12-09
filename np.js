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
        // prepare
        this.sboard = new Array(9);
        for (let i=0;i<9;i++) {
            this.sboard[i] = new Array(9).fill(null);
        }
        // init
        for (let i=0;i<9;i++) {
            for (let j=0;j<9;j++) {
                this.sboard[i][j] = [data.getCell(i+1,j+1)];
                for (let k=0;k<9;k++) {
                    this.sboard[i][j].push(true);
                }
            }
        }
        // the first condition
        for (let i=0;i<9;i++) {
            for (let j=0;j<9;j++) {
                if (this.sboard[i][j][0]!=null) {
                    for (let k=1;k<10;k++) {
                        if (this.sboard[i][j][0]!=k) {
                            this.sboard[i][j][k] = false;
                        }
                    }
                }
            }
        }
        console.table(this.sboard);
        this.updateStat();
    }
    updateStat() {
        for (let i=0;i<9;i++) {
            for (let j=0;j<9;j++) {
                // conditions
            }
        }
        console.table(this.sboard);
    }
}