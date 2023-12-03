const filetext = (await Bun.file("input03.txt").text()).trim().split("\n")
                .map((l) => [...l.trim().split(''), "."])


const isPart = (r, c) => {
    const dx = [1, 1, 1, 0, 0, -1, -1, -1];
    const dy = [1, 0, -1, 1, -1, 1, 0, -1];
    let gears = []
    for(let i=0; i<8; i++) {
        const nr = r + dx[i]
        const nc = c + dy[i]
        if(nr >= 0 && nr < filetext.length && nc >= 0 && nc < filetext[r].length) {
            if(filetext[nr][nc] != "." && (filetext[nr][nc] < "0" || filetext[nr][nc] > "9")) {
                gears.push(nr.toString() + "_" + nc.toString())
            }
        }
    }
    return gears
}


let gear_numbers = new Map()
let p1 = 0
for(let r=0; r<filetext.length; r++) {
    let curr_num = 0
    let is_valid = false
    let gears_so_far = new Set()
    for(let c=0; c<filetext[r].length; c++) {
        if(filetext[r][c] >= "0" && filetext[r][c] <="9") {
            const near_gears = isPart(r,c)
            is_valid = is_valid || (near_gears.length>0)
            near_gears.forEach((g) => gears_so_far.add(g))
            curr_num = curr_num * 10 + Number(filetext[r][c]) 
        }
        else {
            if(is_valid) {
                p1 += curr_num
                for(let gcoord of gears_so_far) {
                    gear_numbers.set(gcoord, [...(gear_numbers.get(gcoord) ?? []), curr_num])
                }
            }
            gears_so_far.clear()
            curr_num = 0
            is_valid = false
        }
    }
}
console.log(p1)

let p2 = Array.from(gear_numbers.values()).filter((v) => v.length==2)
    .map((v) => v[0]*v[1], 0)
    .reduce((acc, v) => acc+v, 0)
console.log(p2)