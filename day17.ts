const filetext = (await Bun.file("input17.txt").text()).trim().split("\n").map((l) => l.trim())

const heatmap = filetext.map((row) => row.split("").map((x) => parseInt(x)))
let DIR = [[ 0, -1], [-1, 0], [0, 1], [1, 0]]

const minHeat = (steps_start, steps_end) => {
    let Q = []
    const mapKey = (r, c, d) => r.toString() + "_" + c.toString() + "_" + d.toString()
    let costMap = new Map()

    for(let i=0; i<heatmap.length; i++) 
        for(let j=0; j<heatmap[0].length; j++) 
            for(let d=0; d<4; d++) 
                costMap.set(mapKey(i, j, d), 10e20)

    for(let d=0; d<4; d++) {
        costMap.set(mapKey(0, 0, d), 0)
        Q.push([0, 0, 0, d])
    }

    const insertHeapQ = (r, c, dir, cost) => {
        let idx = Q.length
        Q.push([cost, r, c, dir])
        while(Q[idx][0] < Q[Math.floor(idx/2)][0]) {
            [Q[idx], Q[Math.floor(idx/2)]] = [Q[Math.floor(idx/2)], Q[idx]]
            idx = Math.floor(idx/2)
        }
    }

    const extractHeapQ = () => {
        let min = Q[0]
        Q[0] = Q[Q.length-1]
        Q.pop()
        let idx = 0
        while(idx < Q.length) {
            let min_idx = idx
            if(2*idx+1 < Q.length && Q[2*idx+1][0] < Q[min_idx][0]) min_idx = 2*idx+1
            if(2*idx+2 < Q.length && Q[2*idx+2][0] < Q[min_idx][0]) min_idx = 2*idx+2
            if(min_idx == idx) break
            [Q[idx], Q[min_idx]] = [Q[min_idx], Q[idx]]
            idx = min_idx
        }
        return min
    }

    const explore = (r, c, dir, cost) => {
        let curr_cost = cost
        for(let s=1; s<steps_start; s++) {
            r += DIR[dir][0]
            c += DIR[dir][1]
            if(r<0 || r>=heatmap.length || c<0 || c>=heatmap[0].length) 
                break
            curr_cost += heatmap[r][c]
        }
        for(let s=steps_start; s<=steps_end; s++) {
            r += DIR[dir][0]
            c += DIR[dir][1]
            if(r<0 || r>=heatmap.length || c<0 || c>=heatmap[0].length) 
                break
            curr_cost += heatmap[r][c]
            if(curr_cost < costMap.get(mapKey(r, c, dir)))  {
                costMap.set(mapKey(r, c, dir), curr_cost)
                insertHeapQ(r, c, dir, curr_cost)
            }
        }
    }

    while(Q.length>0) {
        let [curr_cost, curr_r, curr_c, curr_dir] = extractHeapQ()
        explore(curr_r, curr_c, (curr_dir+1)%4, curr_cost)
        explore(curr_r, curr_c, (curr_dir+3)%4, curr_cost)
    }
    return Math.min(...Array.from({length: 4}, (_, i) => 
                    costMap.get(mapKey(heatmap.length-1, heatmap[0].length-1, i))))
}

console.log(minHeat(1, 3))
console.log(minHeat(4, 10))