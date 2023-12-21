const filetext = (await Bun.file("input19.txt").text()).trim().split("\n").map((l) => l.trim())

const rulemap = new Map(filetext.map( l => {
    if(l.includes("=")) return []
    let left = l.indexOf("{")
    if(left === -1) return []
    let [name, rules] = [l.slice(0, left), l.slice(left+1, -1).split(",")]
    return [ name , rules.map(r => r.split(":")) ]
}).filter( r => r.length>0))
console.log("rulemap: ", rulemap)

const parts = filetext.map( l => {
    if(!l.includes("=")) return {}
    let nums = l.match(/\d+/g) 
    if(nums.length==0) return {}
    return { x: parseInt(nums[0]), m: parseInt(nums[1]), a: parseInt(nums[2]), s: parseInt(nums[3]) }
}).filter( p => p.x !== undefined)
// console.log(parts)

const ruleCheck = (rulestr, parts) => {
    let v = rulestr[0], comp = rulestr[1], n = parseInt(rulestr.slice(2))
    if(comp === "<")
        return parts[v] < n
    else return parts[v] > n
}

const isAccepted = (parts) => {
    let state = "in"
    while(state != "R" && state != "A")  {
        let s = false
        for(let [rule, nxt] of rulemap.get(state).slice(0, -1)) {
            if(ruleCheck(rule, parts)) {
                state = nxt
                s = true
                break
            }
        }
        if(s === false) {
            state = rulemap.get(state).slice(-1)
            state = state[state.length-1][0]
        }
    }
    return state == "A"
}

let p1 = parts.filter(isAccepted).map( p => p.x + p.m + p.a +p.s).reduce((a, b) => a+b, 0)
console.log(p1)

const combi = (r, curr_rule) => {
    if (curr_rule === "R") return 0;
    if (curr_rule === "A") return Object.values(r).reduce((a, v) => a * (v[1] - v[0] + 1), 1);

    const curr_rules = rulemap.get(curr_rule).slice(0, -1);
    const fallback = rulemap.get(curr_rule).slice(-1)[0][0];

    let c = 0;
    let curr_r = {...r};
    let reach_fallback = true;

    for (const [rule, nxt] of curr_rules) {
        const var_range = curr_r[rule[0]];
        const n = parseInt(rule.slice(2));
        const range_pos = rule[1] === ">" ? [Math.max(var_range[0], n + 1), var_range[1]] : [var_range[0], Math.min(var_range[1], n - 1)];
        const range_neg = rule[1] === ">" ? [var_range[0], Math.min(var_range[1], n)] : [Math.max(var_range[0], n), var_range[1]];

        if (range_pos[0] < range_pos[1]) {
            const new_r = {...curr_r, [rule[0]]: range_pos};
            c += combi(new_r, nxt);
        }
        if (range_neg[0] < range_neg[1]) {
            curr_r[rule[0]] = range_neg;
        } else {
            reach_fallback = false;
            break;
        }
    }
    return reach_fallback ? c + combi(curr_r, fallback) : c;
}


let p2 = combi( {x: [1,4000], m: [1,4000], a: [1,4000], s:[1,4000]}, "in")
console.log(p2)