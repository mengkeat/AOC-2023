const dat = (await Bun.file("input10.txt").text()).trim().split("\n")

let [sr, sc] = [-1, -1]
dat.forEach((row, r) => {
    const c = row.indexOf('S');
    if (c !== -1) {
        [sr, sc] = [r, c];
    }
})

const explore = (curr_r, curr_c, curr_steps, visited) => { 

    const explore_if = (r, c, curr_lst, next_lst) => { 
        if(curr_lst.includes(dat[curr_r][curr_c]) && next_lst.includes(dat[r][c])) {
            if( sr == r && sc == c) {
                if( curr_steps > 2) 
                    return [curr_steps+1, visited]
                else return [0, []]
            }

            if( r < 0 || r >= dat.length || c < 0 || c >= dat[0].length) return [0, []]
            if( visited.some((x) => x[0] == r && x[1] == c)) return [0, []]

            return explore(r, c, curr_steps+1, visited)
        }
        return [0, []]
    }

    // console.log("Exploring ", curr_r, curr_c, curr_steps, visited)
    visited.push([curr_r, curr_c])
    const directions = [
        [curr_r+1, curr_c, ["|", "7", "F", "S"], ["|", "J", "L", "S"]],
        [curr_r-1, curr_c, ["|", "J", "L", "S"], ["|", "7", "F", "S"]],
        [curr_r, curr_c+1, ["-", "L", "F", "S"], ["-", "J", "7", "S"]],
        [curr_r, curr_c-1, ["-", "J", "7", "S"], ["-", "L", "F", "S"]]
    ];
    for (let direction of directions) {
        const result = explore_if(...direction);
        if (result[0] > 0) return result;
    }
    return [0, []]
}

const p1 = explore(sr, sc, 0, [])
console.log(p1[0]/2)


// Set based on data
dat[sr] = dat[sr].replace("S", "|")

let p2 = 0
for(let r=0; r<dat.length; r++) {
    let bounds = new Set(p1[1].filter(x => x[0] == r).map(x => x[1]))
    let tx = [...dat[r]].map((x, c) => bounds.has(c) ? x : "." ).join("")
    tx = tx.replace(/F-*7/g, "").replace(/L-*J/g, "")
            .replace(/F-*J/g, "|").replace(/L-*7/g, "|")

    let out = true
    for(let c=0; c<tx.length; c++) {
        if(tx[c] == "|") out = !out
        else if(tx[c] == "." && out == false) p2++
    }
}
console.log(p2)
