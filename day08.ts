const filetext = (await Bun.file("input08.txt").text()).trim().split("\n")

const instr = filetext[0].trim();
const graph = new Map(filetext.slice(2).map(l => {
    const [node, ...connections] = l.match(/\w+/g);
    return [node, connections];
}));

const numSteps = (n, isPart2) => {
    let total = 0;
    let reached = false;
    while (!reached) {
        const [l, r] = graph.get(n);
        n = instr[total % instr.length] === "L" ? l : r;
        total++;
        reached = (!isPart2 && n === "ZZZ") || (isPart2 && n.endsWith("Z"));
    }
    return total;
};
console.log(numSteps("AAA", false));

const cand = Array.from(graph.keys()).filter(n => n.endsWith("A"));
const candSteps = cand.map(n => numSteps(n, true));

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const lcm = (a, b) => (a * b) / gcd(a, b);

const lcmOfCandSteps = candSteps.reduce(lcm);
console.log(lcmOfCandSteps);