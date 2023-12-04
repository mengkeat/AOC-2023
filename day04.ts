const filetext = (await Bun.file("input04.txt").text()).trim().split("\n")

const make_multi = (arr_str) => {
    const arr = arr_str.trim().replace(/\s+/g, ' ').split(" ").map(Number)
    let m = new Map()
    arr.forEach((v) => {
        m.set(v, (m.get(v) || 0) + 1)
    })
    return m
}

const games = filetext.map((l) => 
    l.split(":")[1].split(" | ").map((s) => make_multi(s))
)

const win_nums = games.map(([c, w]) => {
    let n = 0
    for(let [k, v] of w) {
        if(c.has(k)) {
            n += Math.min(c.get(k), v)
        }
    }
    return n
})

let p1 = win_nums.map((n) => n-1 >= 0 ? 2**(n-1) : 0).reduce((acc, v) => acc+v, 0)
console.log(p1)

let cum_cards = Array(win_nums.length).fill(1)
for(let i=0; i<cum_cards.length-1; ++i) {
    for(let j=i+1; j<i+1+win_nums[i]; ++j){
        cum_cards[j] += cum_cards[i]
    }
}
const p2 = cum_cards.reduce((acc, v)=> acc+v, 0)
console.log(p2)