const filetext = (await Bun.file("input01.txt").text()).trim().split("\n")

const getFirstLast = (line: string) => {
    const nums = line.match(/\d/g)
    return parseInt(nums[0] + nums[nums.length - 1])
}

const p1 = filetext.map(getFirstLast).reduce((acc, val) => acc+val, 0)
console.log(p1)

const digits = new Map([ 
    ["one", 1], ["two", 2], ["three", 3], ["four", 4], ["five", 5],
    ["six", 6], ["seven", 7], ["eight", 8], ["nine", 9] 
])

const getWordNums = (line: string) => {
    let nums: number[] = [] 
    for(let i=0; i<line.length; i++) {
        if (line[i] >= '0' && line[i] <= '9') {
            nums.push(parseInt(line[i]))
        }
        digits.forEach((val, key, _) => {
            if (line.substring(i).startsWith(key)) {
                nums.push(val)
            }
        })
    }
    return nums[0] * 10 + nums[nums.length - 1]
}

const p2 = filetext.map(getWordNums).reduce((acc, val) => acc+val, 0)
console.log(p2)
