const filetext = (await Bun.file("input13.txt").text()).trim().split("\n\n")

const patterns = filetext.map((l) => l.split("\n"))

const reflect = (p, cnt) => {
    for(let r=1; r<p.length; ++r) {
        let ok = 0 
        for(let dr=1; dr<p.length; dr++) {
            for(let c=0; c<p[0].length; c++) {
                let [r1, r2] = [r-dr, r+dr-1]
                if(r1>=0 && r2<p.length && (p[r1][c] != p[r2][c]))
                    ok++
            }
        }
        if(ok==cnt)
            return r
    }
    return -1
}

const transpose = (p) => {
    let p2 = []
    for(let c=0; c<p[0].length; c++) {
        let row = []
        for(let r=0; r<p.length; r++) {
            row.push(p[r][c])
        }
        p2.push(row)
    }
    return p2
}

const summary = (p, cnt) => { 
    let row_ref = reflect(p, cnt)
    if(row_ref>0) return 100*row_ref
    else return reflect(transpose(p), cnt)
}

console.log(patterns.map((p) => summary(p, 0)).reduce((acc, v) => acc+v, 0))
console.log(patterns.map((p) => summary(p, 1)).reduce((acc, v) => acc+v, 0))