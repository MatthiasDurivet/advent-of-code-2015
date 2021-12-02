const sortNumbersAscending = (a, b) => a - b
const sortNumbersDescending = (a, b) => b - a
const sumNumbers = (a, b) => a + b
const logAndReturn = value => {
    console.log('value: ', value)
    return value
}
const permutations = arr => {
    const result = []

    if (arr.length === 0) return []
    if (arr.length === 1) return [arr]

    for (let i = 0; i < arr.length; i++) {
        const constantElement = arr[i]
        const remainingArray = [...arr.slice(0, i), ...arr.slice(i + 1)]
        const remainingPermutations = permutations(remainingArray)

        for (let j = 0; j < remainingPermutations.length; j++) {
            const onePermutation = [constantElement, ...remainingPermutations[j]]
            result.push(onePermutation)
        }
    }

    return result
}

const combinations = arr => {
    const recursive = innerArr => {
        const result = []

        if (innerArr.length === 0) return []
        if (innerArr.length === 1) return []
        if (innerArr.length === 2) return []


        for (let i = 0; i < innerArr.length; i++) {
            const remainingArray = [...innerArr.slice(0, i), ...innerArr.slice(i + 1)]
            const remainingCombinations = recursive(remainingArray)

            result.push(remainingArray)
            remainingCombinations.forEach(combination => result.push(combination))
        }


        return result
    }

    return [arr, ...arr.map(el => [el]), ...recursive(arr)]
}

export {
    sortNumbersAscending,
    sortNumbersDescending,
    sumNumbers,
    logAndReturn,
    permutations,
    combinations,
}