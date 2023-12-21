// const filetext = (await Bun.file("test20.txt").text()).trim().split("\n").map((l) => l.trim())
const filetext = (await Bun.file("input20.txt").text()).trim().split("\n").map((l) => l.trim())

let mem = new Map()
let type = new Map()
let outputs = new Map( filetext.map( (l) => {
    let [name, outputs] = l.trim().split(" -> ")
    outputs = outputs.split(", ")
    let new_name = name
    if(name != "broadcaster") {
        new_name = name.substring(1)
        type.set(new_name, name[0])
    }
    return [new_name, outputs]
}) )

const reset_mem = () => {
    for(let [name, outs] of outputs) {
        for(let o of outs) {
            if(type.get(o) === "&") {
                let m = mem.get(o) || new Map()
                m.set(name, false)
                mem.set(o, m)
            }
        }
    }
}
reset_mem()
// console.log(outputs, type, mem)

let periodIdx = {gt: [], vr: [], nl: [], lr: []}

let pulse1000 = () =>
{
    reset_mem()
    let pulse_count = {low: 0 , high: 0}

    for(let i=0; i<20000; i++) {
        pulse_count["low"]++
        let Q = outputs.get("broadcaster").map(o => ["broadcaster", o, false])
        while(Q.length>0) {
            let [from, to, inp] = Q.shift()
            pulse_count[inp ? "high" : "low"] ++

            if(from==="gt" && inp === true) { periodIdx["gt"].push(i) }
            if(from==="vr" && inp === true) { periodIdx["vr"].push(i) }
            if(from==="nl" && inp === true) { periodIdx["nl"].push(i) }
            if(from==="lr" && inp === true) { periodIdx["lr"].push(i) }

            if(type.get(to) === "%") {
                if(!inp) { 
                    mem.set(to, !mem.get(to))
                    let pulse = mem.get(to)
                    for(let o of outputs.get(to)) {
                        Q.push([to, o, pulse])
                    }
                } 
            }
            else if(type.get(to)=== "&") {
                let m = mem.get(to)
                m.set(from, inp)
                let pulse = true
                for(let [_,v] of m.entries()) {
                    pulse = pulse && v
                }
                pulse = !pulse
                mem.set(to, m)
                for(let o of outputs.get(to)) {
                    Q.push([to, o, pulse])
                }
            }
        }
        if(i===999)
            console.log("Part 1:", pulse_count, 
                        pulse_count["low"] * pulse_count["high"])
    }
}
pulse1000()


console.log(periodIdx)
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const lcm = (a, b) => (a * b) / gcd(a, b);

let periods = Object.keys(periodIdx).map(k => periodIdx[k][1] - periodIdx[k][0])
let p2 = periods.reduce((acc, val) => acc * lcm(acc, val), 1)
console.log(periods.reduce((acc, val) => acc*val , 1))