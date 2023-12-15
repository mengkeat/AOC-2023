const filetext = (await Bun.file("input15.txt").text()).trim().split("\n").map((l) => l.trim())

const seq = filetext[0].split(",")
const hash = s => s.split("").reduce((acc, ch) => ((acc + ch.charCodeAt(0)) * 17) % 256, 0)

let p1 = seq.map(hash).reduce((acc, val) => acc+val, 0)
console.log(p1)

const label = str => str.match(/\w+/)[0]
let boxes = new Map()

seq.forEach(item => {
    const l = label(item);
    const focal_len = parseInt(item.match(/\d+/));
    const boxnum = hash(l.trim());
    let lst = boxes.get(boxnum) || [];

    if (item.includes("=")) {
        const existingIndex = lst.findIndex(([a, _]) => a === l);
        if (existingIndex !== -1) {
            lst[existingIndex] = [l, focal_len];
        } else {
            lst.push([l, focal_len]);
        }
        boxes.set(boxnum, lst);
    } else if (item.includes("-")) {
        boxes.set(boxnum, lst.filter(([a, _]) => a !== l));
    } else {
        console.log("unrecognized ", item);
    }
});

let p = 0
for(let [bnum, lst] of boxes) {
    let comp = lst.map(([_, focal_len], i) => (bnum+1) * (i+1) * focal_len)
    p += comp.reduce((acc, val) => acc+val, 0)
} 

console.log(p)