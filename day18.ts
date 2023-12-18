const filetext = (await Bun.file("input18.txt").text()).trim().split("\n").map((l) => l.trim())

const instr = filetext.map((l) => {
    let tok = l.trim().split(" ")
    return { dir: tok[0], steps: parseInt(tok[1]), col: tok[2].slice(2, 8)}
});

let D = {U: [1, 0], D: [-1, 0], L: [0, -1], R: [0, 1]}
let remap = ["R", "D", "L", "U"]

const area = (instr) => {
    let b =0
    let coord = [[0,0]]
    let [r, c] = [0, 0]
    for(let i=0; i<instr.length; i++) {
        let {dir, steps, col} = instr[i];
        r += D[dir][0] * steps;
        c += D[dir][1] * steps;
        coord.push([r, c])
        b += steps
    }
    coord.push([0,0])

    let A = 0
    for(let i=0; i<coord.length-1; i++) {
        A += coord[i][0] * coord[i+1][1] - coord[i+1][0] * coord[i][1]
    }
    A = A/2
    return A+1+b/2
}

console.log(area(instr))

const instr2 = instr.map(({dir, steps, col}) => ({
    dir: remap[parseInt(col[5])], steps: parseInt(col.slice(0, 5), 16)
}));

console.log(area(instr2))