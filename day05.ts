const filetext = [...(await Bun.file("input05.txt").text()).trim().split("\n").map((l) => l.trim()), ""]
const seeds = filetext[0].match(/\d+/g)?.map((n) => parseInt(n))

let eleMap = []
let curr = []
filetext.slice(2).forEach((l) => {
    const nums = (l.match(/\d+/g) || []).map((n) => parseInt(n))
    if(nums.length >0) {
        curr.push(nums)
    }
    else {
        if(curr.length > 0) 
            eleMap.push(curr)
        curr = []
    }
})
const eleRevMap = eleMap.map((l) => l.map(([dst, src, len]) => [src, dst, len])).reverse()

const propagate = (s, m) => {
    for(let [dst, src, l] of m) {
        if(s >=src && s <src +l) {
            s = dst + (s - src)
            return s 
        }
    }
    return s
}

const trace = (s, mapping) => {
    mapping.forEach((m) => s = propagate(s, m))
    return s
}
const trace_forward = (s) => trace(s, eleMap)
const trace_reverse = (s) => trace(s, eleRevMap)

const p1 = Math.min(...seeds.map(trace_forward))
console.log(p1)

// ==============================================================================================
let ss = []
for(let i=0; i<seeds.length; i+=2) {
    ss.push(seeds[i])
    ss.push(seeds[i]+seeds[i+1])
}
for(let m of eleMap) {
    ss = ss.map((s) => propagate(s, m))
    for(let [dst, src, l] of m) {
        ss = [...ss, dst, dst+l]
    }
}

const inSeedRange = (v) => {
    for(let i=0; i<seeds.length; i+=2) {
        if(v >= seeds[i] && v < seeds[i]+seeds[i+1]) {
            return true
        }
    }
    return false
}

let p2 = Math.min(...ss.filter((loc) => inSeedRange(trace_reverse(loc))))
console.log(p2)