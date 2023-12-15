const filetext = (await Bun.file("input16.txt").text()).trim().split("\n").map((l) => l.trim())

const tiles = filetext
let DIR = new Map([ ["L", [0, -1]], ["R", [0, 1]], ["U", [-1, 0]], ["D", [1, 0]] ])
const apply_dir = (r, c, D) => [[r + DIR.get(D)[0], c + DIR.get(D)[1]], D]

const getEnergy = (sr, sc, sd) => {
    let pos_visited = new Set()
    let v = new Set()
    let Q = [[[sr, sc], sd]]

    while (Q.length > 0) { 
        let [[r, c], dir] = Q.shift()
        if(r<0 || r>=tiles.length || c<0 || c>=tiles[0].length) continue
        
        let node_s = r.toString() + "_" + c.toString() + "_" + dir.toString()
        if(v.has(node_s)) continue
        v.add(node_s)
        pos_visited.add(r.toString() + "_" + c.toString())

        if(tiles[r][c] === ".") Q.push(apply_dir(r, c, dir))
        else if(tiles[r][c] == "/") {
            if(dir == "R") Q.push(apply_dir(r, c, "U"))
            else if(dir == "L") Q.push(apply_dir(r, c, "D"))
            else if(dir == "U") Q.push(apply_dir(r, c, "R"))
            else if(dir == "D") Q.push(apply_dir(r, c, "L"))
        }
        else if(tiles[r][c] === "\\") {
            if(dir == "R") Q.push(apply_dir(r, c, "D"))
            else if(dir == "L") Q.push(apply_dir(r, c, "U"))
            else if(dir == "U") Q.push(apply_dir(r, c, "L"))
            else if(dir == "D") Q.push(apply_dir(r, c, "R"))
        }
        else if(tiles[r][c] === "|") {
            if(dir === "R" || dir === "L") { 
                Q.push(apply_dir(r, c, "U")) 
                Q.push(apply_dir(r, c, "D")) 
            }
            else if(dir == "U" || dir ==="D" ) Q.push(apply_dir(r, c, dir))
        }
        else if(tiles[r][c] === "-") {
            if(dir === "D" || dir === "U") { 
                Q.push(apply_dir(r, c, "L"))
                Q.push(apply_dir(r, c, "R"))
            }
            else Q.push(apply_dir(r, c, dir))
        }
    }
    return pos_visited.size
}

console.log(getEnergy(0, 0, "R"))

let e = []
for(let r=0; r<tiles.length; r++) {
    e.push(getEnergy(r, 0, "R"))
    e.push(getEnergy(r, tiles[0].length-1, "L"))
}
for(let c=0; c<tiles[0].length; c++) {
    e.push(getEnergy(0, c, "D"))
    e.push(getEnergy(tiles.length-1, c, "U"))
}
console.log(Math.max(...e))