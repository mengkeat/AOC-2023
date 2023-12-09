const filetext = (await Bun.file("input09.txt").text()).trim().split("\n")
const input = filetext.map((line) => line.trim().split(" ").map((x) => parseInt(x)))

const consec_diff = seq => seq.slice(1).map((num, i) => num - seq[i])

const get_next = (seq) => {
    let all_seq = [[...seq]]
    let curr_seq = seq
    while(!curr_seq.every((x) => x === 0)) {
        curr_seq = consec_diff(curr_seq)
        all_seq.push(curr_seq)
    }
    return all_seq.reduceRight((acc, val) => acc + val[val.length - 1], 0)
}

const p1 = input.map(get_next).reduce((acc, val) => acc+val, 0)
console.log(p1)

const get_prev = (seq) => {
    let all_seq = [[...seq]]
    let curr_seq = seq
    while(!curr_seq.every((x) => x === 0)) {
        curr_seq = consec_diff(curr_seq)
        all_seq.push(curr_seq)
    }
    return all_seq.reduceRight((acc, val) => val[0] - acc, 0)
}

const p2 = input.map(get_prev).reduce((acc, val) => acc+val, 0)
console.log(p2)