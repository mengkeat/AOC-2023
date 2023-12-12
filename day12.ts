const filetext = (await Bun.file("input12.txt").text()).trim().split("\n").map((l) => l.trim())

const springs = filetext.map((l) => l.split(" ")[0])
const record = filetext.map((l) => l.split(" ")[1].split(",").map((s) => parseInt(s)))

const count = (spring, rec) => {
    let DP = new Map()
    let count_rec = (curr_pos, curr_blk, curr_hash) => {
        let key = `${curr_pos},${curr_blk},${curr_hash}`
        if(DP.has(key)) 
            return DP.get(key)

        if(curr_pos === spring.length) {
            if(curr_blk === rec.length-1 && rec[curr_blk] === curr_hash) return 1
            else if(curr_blk === rec.length && curr_hash === 0) return 1
            else return 0
        }

        let c = 0
        if(spring[curr_pos] === "." || spring[curr_pos] === "?") {
            if(curr_blk < rec.length && rec[curr_blk] === curr_hash)  {
                c += count_rec(curr_pos+1, curr_blk+1, 0)
            } 
            else if(curr_hash===0){
                c += count_rec(curr_pos+1, curr_blk, curr_hash)
            }
        }

        if(spring[curr_pos] === "#" || spring[curr_pos] === "?") {
            c += count_rec(curr_pos+1, curr_blk, curr_hash+1)
        }
        DP.set(key, c)
        return c
    }
    return count_rec(0, 0, 0) 
}

let p1 = springs.map((s, i) => count(s, record[i])).reduce((acc, v) => acc+v, 0)
console.log(p1)

let p2 = springs.map((s, i) => count([s,s,s,s,s].join("?"), [].concat(...Array(5).fill(record[i]))))
        .reduce((acc, v) => acc+v, 0)
console.log(p2)
