import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

import { sortNumbersDescending } from '../../../utils/helperFunctions'


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
    // const [fileText, linkToInputFile] = useLocalInputFile(15.1)

    if (!fileText) return <CircularProgress color="primary" />

    const lookupTable = fileText.split('\n')
        .map(ingredientString => ingredientString.split(' '))
        .map(ingredientArray => ({
            name: ingredientArray[0].replace(':', ''),
            values: [
                parseInt(ingredientArray[2]),
                parseInt(ingredientArray[4]),
                parseInt(ingredientArray[6]),
                parseInt(ingredientArray[8]),
            ],
            calories: parseInt(ingredientArray[10])
        }))

    const calculateScore = listOfIngredients => {
        return listOfIngredients[0].values.reduce((totalValue, _, currentIndex) => {
            const weightedSum = listOfIngredients.reduce((totalValue, currentValue) => {
                return totalValue + (currentValue.values[currentIndex] * currentValue.amount)
            }, 0)
            return totalValue * Math.max(weightedSum, 0)
        }, 1)
    }

    console.log('lookupTable: ', lookupTable)

    const scores = []
    for (let w = 0; w <= 100; w++) {
        for (let x = 0; x <= 100; x++) {
            for (let y = 0; y <= 100; y++) {
                for (let z = 0; z <= 100; z++) {
                    if (w + x + y + z !== 100) continue
                    if (w * lookupTable[0].calories + x * lookupTable[1].calories + y * lookupTable[2].calories + z * lookupTable[3].calories !== 500) continue
                    const score = calculateScore([
                        { ...lookupTable[0], amount: w },
                        { ...lookupTable[1], amount: x },
                        { ...lookupTable[2], amount: y },
                        { ...lookupTable[3], amount: z },
                    ])
                    scores.push(score)
                }
            }
        }
    }
    console.log('scores: ', scores.sort(sortNumbersDescending))

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day