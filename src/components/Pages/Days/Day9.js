import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"
import { sortNumbersAscending } from "../../../utils/helperFunctions"


const useStyles = makeStyles(() => ({
    dayContainer: {
        marginTop: 50,
        marginBottom: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: white,
    },
    externalLink: {
        color: deepSaffron
    },
}))

const Day = () => {
    const classes = useStyles()
    const [fileText, linkToInputFile] = useLocalInputFile(9)

    if (!fileText) return <CircularProgress color="primary" />

    const locations = {}
    fileText.split('\n')
        .map(inputString => inputString.split(' '))
        .forEach(inputArray => {
            const from = inputArray[0]
            const to = inputArray[2]
            const distance = parseInt(inputArray[4])

            if (!locations[from]) locations[from] = {}
            if (!locations[to]) locations[to] = {}

            locations[from][to] = distance
            locations[to][from] = distance
            locations[from][from] = 0
            locations[to][to] = 0

        })


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

    const possibleRoutes = permutations(Object.keys(locations))

    const allDistances = possibleRoutes
        .map(route => {
            const totalDistance = route.reduce(({ totalDistance, currentLocation }, nextLocation) => {
                return {
                    totalDistance: totalDistance + locations[currentLocation][nextLocation],
                    currentLocation: nextLocation,
                }
            }, { currentLocation: route[0], totalDistance: 0 }).totalDistance
            return totalDistance
        }).sort(sortNumbersAscending)

    console.log('allDistances: ', allDistances)



    return < div >
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day