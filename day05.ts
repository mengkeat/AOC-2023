const filetext = [...(await Bun.file("input05.txt").text()).trim().split("\n").map((l) => l.trim()), ""]
const seeds: number[] = filetext[0].match(/\d+/g)?.map((n) => parseInt(n))

let eleMap: [number, number, number][][] = []
let curr: [number, number, number][] = []
filetext.slice(2).forEach((l: string) => {
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
const eleRevMap: [number, number, number][][] = eleMap.map((l) => l.map(([dst, src, len]) => [src, dst, len])).reverse()

const propagate = (s: number, m: [number, number, number][]) => {
    for(let [dst, src, l] of m) {
        if(s >=src && s <src +l) {
            s = dst + (s - src)
            return s 
        }
    }
    return s
}

const trace = (s: number, mapping: [number, number, number][][]) => {
    mapping.forEach((m) => s = propagate(s, m))
    return s
}
const trace_forward = (s: number) => trace(s, eleMap)
const trace_reverse = (s: number) => trace(s, eleRevMap)

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

const inSeedRange = (v: number) => {
    for(let i=0; i<seeds.length; i+=2) {
        if(v >= seeds[i] && v < seeds[i]+seeds[i+1]) {
            return true
        }
    }
    return false
}

let p2 = Math.min(...ss.filter((loc) => inSeedRange(trace_reverse(loc))))
console.log(p2)