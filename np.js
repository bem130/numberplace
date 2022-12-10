class NPdata {
    constructor() {
        this.board = new Array(9);
        for (let i=0;i<9;i++) {this.board[i] = new Array(9).fill(null);}
    }
    setNumber(x,y,n) {this.board[x-1][y-1] = n;}
    setSolveNP(solvenp) {
        for (let i=0;i<9;i++) {
            for (let j=0;j<9;j++) {
                this.board[i][j] = solvenp.sboard[i][j][0];
            }
        }
        return this;
    }
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
        for (let t=0;t<10;t++) {
            this.updateStat();
        }
    }
    updateStat() {
        //
        for (let i=0;i<9;i++) {
            for (let j=0;j<9;j++) {
                this.stat(i,j);
            }
        }
        for (let i=0;i<9;i++) {
            for (let j=0;j<9;j++) {
                if (this.countTrue(i,j)!=0) {
                    this.sboard[i][j][0] = this.countTrue(i,j)
                }
            }
        }
        //
        this.findSolitary();

        //        
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

    countTrue(x,y) {
        let ret = 0;
        let tc = 0;
        for (let i=1;i<10;i++) {
            if (this.sboard[x][y][i]==true) {
                tc = i;
                ret++;
            }
        }
        if (ret==1) {
            return tc;
        }
        return 0;
    }

    NuminSectorSolitary(area,n) {
        let ret = 0;
        let tc = 0;
        for (let i=0;i<9;i++) {
            if (area[i][n]==true) {
                tc = i;
                ret++;
            }
        }
        if (ret==1) {
            return tc;
        }
        return null;
    }
    findSolitary() {
        // rows
        for (let i=0;i<9;i++) {
            for (let k=1;k<10;k++) {
                if (this.NuminSectorSolitary(this.getRow(0,i),k)!=null) {
                    if (this.sboard[this.NuminSectorSolitary(this.getRow(0,i),k)][i][0]==null) {
                        this.sboard[this.NuminSectorSolitary(this.getRow(0,i),k)][i][0] = k;
                    }
                }
            }
        }
        // cols
        for (let i=0;i<9;i++) {
            for (let k=1;k<10;k++) {
                if (this.NuminSectorSolitary(this.getCol(i,0),k)!=null) {
                    if (this.sboard[i][this.NuminSectorSolitary(this.getCol(i,0),k)][0]==null) {
                        this.sboard[i][this.NuminSectorSolitary(this.getCol(i,0),k)][0] = k;
                    }
                }
            }
        }
        // areas
        for (let i=0;i<9;i+=3) {
            for (let j=0;j<9;j+=3) {
                for (let k=1;k<10;k++) {
                    if (this.NuminSectorSolitary(this.getArea(i,j),k)!=null) {
                        let n = this.NuminSectorSolitary(this.getArea(i,j),k);
                        if (this.sboard[n%3+i][(n-n%3)/3+j][0]==null) {
                            this.sboard[n%3+i][(n-n%3)/3+j][0] = k;
                        }
                    }
                }
            }
        }
    }
}