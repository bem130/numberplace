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
                this.stat(i,j);
            }
        }
        for (let i=0;i<9;i++) {
            for (let j=0;j<9;j++) {
                if (this.countFalse(i,j)!=0) {
                    this.sboard[i][j][0] = this.countFalse(i,j)
                }
            }
        }
        console.table(this.sboard);
    }
    getRow(x,y) {
        let ret = new Array(9);
        for (let i=0;i<9;i++) {
            ret[i] = this.sboard[i][y];
        }
        return ret;
    }
    getCol(x,y) {
        let ret = new Array(9);
        for (let i=0;i<9;i++) {
            ret[i] = this.sboard[x][i];
        }
        return ret;
    }
    getArea(x,y) {
        let ret = new Array(9);
        for (let i=0;i<3;i++) {
            for (let j=0;j<3;j++) {
                ret[i+j*3] = this.sboard[Math.floor(x/3)*3+i][Math.floor(y/3)*3+j];
            }
        }
        return ret;
    }
    stat(x,y) {
        if (this.sboard[x][y][0]==null) {
            let a = this.getRow(x,y);
            let b = this.getCol(x,y);
            let c = this.getArea(x,y);
            for (let i=0;i<9;i++) {
                if (a[i][0]!=null) {this.sboard[x][y][a[i][0]] = false;}
            }
            for (let i=0;i<9;i++) {
                if (b[i][0]!=null) {this.sboard[x][y][b[i][0]] = false;}
            }
            for (let i=0;i<9;i++) {
                if (c[i][0]!=null) {this.sboard[x][y][c[i][0]] = false;}
            }
        }
    }
    countFalse(x,y) {
        let ret = 0;
        let tc = 0;
        for (let i=1;i<10;i++) {
            if (this.sboard[x][y]==true) {
                tc = i;
                ret++;
            }
        }
        if (ret==1) {
            return tc;
        }
        return 0;
    }
}