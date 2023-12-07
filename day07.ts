const filetext = (await Bun.file("input07.txt").text()).trim().split("\n").map((l) => l.trim())
const dat = filetext.map((l) => l.split(" "))

const multicount = (cards) => {
    let m = new Map()
    Array.from(cards).forEach((c) => m.set(c, (m.get(c) || 0) + 1))
    return m
}
const strength = (cards) => {
    let uniq = new Set(cards).size
    let cnt = multicount(cards)
    let max_cnt = Math.max(...cnt.values())
    if(uniq==1) return 6   // five of a kind
    if(uniq==2 && max_cnt==4) return 5 // four of a kind
    if(uniq==2 && max_cnt==3) return 4 // full house
    if(uniq==3 && max_cnt==3) return 3 // three of a kind
    if(uniq==3 && max_cnt==2) return 2 // two pair
    if(uniq==4) return 1 // one pair 
    return 0 // high card
}
const newStr = (hand) => hand.replace(/T/g, "V").replace(/J/g, "W").replace(/Q/g, "X").replace(/K/g, "Y").replace(/A/g, "Z")
const newStr2 = (hand) => hand.replace(/T/g, "V").replace(/J/g, "0").replace(/Q/g, "X").replace(/K/g, "Y").replace(/A/g, "Z")

let s1 = new Map([ [0, []], [1, []], [2, []], [3, []], [4, []], [5, []], [6, []] ])
dat.forEach(([hand, bid]) => s1.set(strength(hand), [...s1.get(strength(hand)), [hand, bid]])
)
let winnings = (s, isPart2) => Array.from(s.keys())
    .sort()
    .flatMap((k) => s.get(k)?.sort((a, b) => {
        let tostr = isPart2 ? newStr2 : newStr
        let [new_a, new_b] = [tostr(a[0]), tostr(b[0])]
        if(new_a < new_b) return -1
        if(new_a > new_b) return 1
        return 0
    })) 
    .map(([_, bid], i) => bid*(i+1))
    .reduce((a, b) => a+b, 0)
console.log(winnings(s1, false))

const strength2 = (cards) => {
    let cnt = multicount(cards)
    let biggest_card = "F"
    let biggest_cnt = 0
    if(cnt.has("J")) {
        for(let [k, v] of cnt.entries()) {
            if(k=="J") continue
            if(v > biggest_cnt)  {
                biggest_cnt = v
                biggest_card = k
            }
        }
    }
    if (biggest_cnt != 0 && biggest_card != "F")
        cards = cards.replace(/J/g, biggest_card)
    return strength(cards)
}

let s2 = new Map([ [0, []], [1, []], [2, []], [3, []], [4, []], [5, []], [6, []] ])
dat.forEach(([hand, bid]) => s2.set(strength2(hand), [...s2.get(strength2(hand)), [hand, bid]]))

console.log(winnings(s2, true))