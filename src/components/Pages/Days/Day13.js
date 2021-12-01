import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"
import { permutations, sortNumbersAscending } from "../../../utils/helperFunctions"


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
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    const happinessLookupTable = fileText.split('\n')
        .map(happinessString => happinessString.split(' '))
        .map(happinessArray => {
            return {
                subject: happinessArray[0],
                target: happinessArray[10].replace('.', ''),
                score: parseInt(happinessArray[3]),
                multiplier: happinessArray[2] === 'gain' ? 1 : -1,
            }
        })
        .reduce((result, happinessObject) => ({
            ...result,
            [happinessObject.subject]: {
                ...(result[happinessObject.subject] || {}),
                [happinessObject.target]: happinessObject.score * happinessObject.multiplier,
            },
        }), {})


    const getSeatingScore = seating => {
        let totalScore = 0
        for (let i = 0; i < seating.length; i++) {
            const subject = seating[i]
            if (subject === "me") continue

            const rightNeighbor = seating[(i + 1) % (seating.length)]
            if (rightNeighbor !== "me") totalScore += happinessLookupTable[subject][rightNeighbor]

            const leftNeighbor = seating[(i - 1 + seating.length) % (seating.length)]
            if (leftNeighbor !== "me") totalScore += happinessLookupTable[subject][leftNeighbor]
        }
        return totalScore
    }

    // const score = getSeatingScore(Object.keys(happinessLookupTable))
    // console.log('score: ', score)

    const seatingScores = permutations(Object.keys(happinessLookupTable))
        .map(seating => getSeatingScore(seating))
        .sort(sortNumbersAscending)

    console.log('seatingScores: ', seatingScores)

    const secondHalf = permutations([...Object.keys(happinessLookupTable), "me"])
        .map(seating => getSeatingScore(seating))
        .sort(sortNumbersAscending)

    console.log('secondHalf: ', secondHalf)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day