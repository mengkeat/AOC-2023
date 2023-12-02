const filetext = (await Bun.file("input02.txt").text()).trim().split("\n")

const games = filetext.map((line) => {
    const game_recs = line.trim().split(":")[1].split(";")
    return game_recs.map((recs) => recs.split(",").map((x) => x.trim().split(" ")))
})

const maxColor = new Map([ ["red", 12], ["green", 13], ["blue", 14] ])

const is_sample_possible = (sample) => 
    sample.map(([cnt_str, col_str]) => parseInt(cnt_str) <= maxColor.get(col_str))
        .reduce((acc, val) => acc && val , true)

const is_game_possible = (game) => 
    game.map(is_sample_possible)
        .reduce((acc, curr) => acc && curr, true)

const p1 = games.map((g, idx) => is_game_possible(g) ? idx+1 : 0)
               .reduce((acc, val) => acc+val, 0)
console.log(p1)

const max_col_cubes = (game) => 
    game.reduce((m, sample) => {
        for(let [cnt, col] of sample) {
            if (parseInt(cnt) > m.get(col)) 
                m.set(col, parseInt(cnt))
        }
        return m
    }, new Map([["red", 0], ["green", 0], ["blue", 0]]))

const get_power = (s) => Array.from(s.values()).reduce((acc, val) => acc*val, 1)

const p2 = games.map((g) => get_power(max_col_cubes(g)))
                .reduce((acc, val) => acc+val, 0)
console.log(p2)