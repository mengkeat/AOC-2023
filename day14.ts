const filetext = (await Bun.file("input14.txt").text()).trim().split("\n").map((l) => l.trim())

const dat = filetext.map((row) => row.split(""))

const computeLoad = d => d.map((row, r) => row.map((c) => c == "O" ? d.length-r : 0))
                        .flat()
                        .reduce((acc, v) => acc+v, 0)

const tilt = (d) => {
    for(let c=0; c<d[0].length; c++) {
        for(let r=0; r<d.length; r++) {
            for(let rr=r; rr<d.length; rr++) {
                if(d[rr][c] == "O") {
                    [d[r][c], d[rr][c]] = [d[rr][c], d[r][c]]
                    rr = d.length
                }
                else if(d[rr][c] == "#") 
                    rr = d.length
            }
        } 
    }
    return d
}

console.log(computeLoad(tilt(dat)))

const rotate = (matrix) => matrix[0].map((val, i) => matrix.map(row => row[i]).reverse())
const cycleOnce = d => Array.from({length: 4}, () => d = rotate(tilt(d)))[3];
let dat2 = dat.map((row) => row.map((c) => c))

let loadhist= []
let sig = new Map()
const getSig = (d) => d.reduce((acc, val) => acc+val.join(""), "") 
for(let c=0; c<1000000000; ++c) {
    let newDat = cycleOnce(dat2)
    let s = getSig(newDat)
    let newVal = computeLoad(newDat)
    if(sig.has(s)) {
        let prevC = sig.get(s)
        let cycle = c - prevC
        let rem = (1000000000 - c) % cycle
        console.log(loadhist[prevC + rem-1])
        break
    }
    else {
        sig.set(s, c)
        loadhist.push(newVal)
    }
    dat2 = newDat
}
