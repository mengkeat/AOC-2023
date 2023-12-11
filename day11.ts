const filetext = (await Bun.file("input11.txt").text()).trim().split("\n").map((l) => l.trim())

let pts = filetext.flatMap((row, r) => 
    Array.from(row).map((char, c) => 
        char === "#" ? {r, c} : null
    )
).filter(Boolean);

let occ_rows = new Set(pts.map(p => p.r));
let emptyRows = Array.from({length: filetext.length}, (_, i) => i).filter(i => !occ_rows.has(i));

let occ_cols = new Set(pts.map(p => p.c))
let emptyCols = Array.from({length: filetext.length}, (_, i) => i).filter(i => !occ_cols.has(i));

const sumOfPairs = (K) => {
    let d = [] 
    for(let i=0; i<pts.length-1; i++) {
        for(let j=i+1; j<pts.length; j++) {
            let curr_d = Math.abs(pts[i].r - pts[j].r) + Math.abs(pts[i].c - pts[j].c)
            let [min_r, max_r] = [Math.min(pts[i].r, pts[j].r), Math.max(pts[i].r, pts[j].r)]
            let [min_c, max_c] = [Math.min(pts[i].c, pts[j].c), Math.max(pts[i].c, pts[j].c)]
            curr_d += (emptyRows.filter((r) => r > min_r && r < max_r).length) * K 
            curr_d += (emptyCols.filter((c) => c > min_c && c < max_c).length) * K 
            d.push(curr_d)
        }
    }
    return d.reduce((acc, val) => acc+val, 0)
}

console.log(sumOfPairs(1))
console.log(sumOfPairs(999999))