const time = [61, 67, 75, 71]
const dist = [430, 1036, 1307, 1150 ]

const numberWins = (totalTime, minDist) => {
    let wins = 0
    for(let t=0; t<totalTime; t++) {
        const d = t * (totalTime - t)
        if(d>minDist) {
            wins++
        }
    } 
    return wins
}

const p1 = time.map( (t, i) => numberWins(t, dist[i])).reduce((acc, val) => acc*val, 1)
console.log(p1)

const p2 = numberWins(61677571, 430103613071150)
console.log(p2)