import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { black, deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"


const useStyles = makeStyles(() => ({
    dayContainer: {
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: white,
    },
    externalLink: {
        color: deepSaffron
    },
    parsedStateContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: 5,
        width: 400,
        borderColor: deepSaffron,
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 20,
        backgroundColor: black,
    }
}))

const Day = () => {
    const classes = useStyles()
    const [fileText, linkToInputFile] = useLocalInputFile(1)

    if (!fileText) return <CircularProgress color="primary" />

    const numberOfFloorsUp = fileText.match(/\(/g).length
    const numberOfFloorsDown = fileText.match(/\)/g).length
    const finalFloor = numberOfFloorsUp - numberOfFloorsDown
    console.log('finalFloor: ', finalFloor)

    const startValue = [{ characterPosition: 0, santaPosition: 0 }]
    const reducer = (finalArray, movementCharacter) => {
        const previousValue = finalArray.slice(-1)[0]
        const newState = movementCharacter === '('
            ? { characterPosition: previousValue.characterPosition + 1, santaPosition: previousValue.santaPosition + 1 }
            : { characterPosition: previousValue.characterPosition + 1, santaPosition: previousValue.santaPosition - 1 }
        return [...finalArray, newState]
    }
    const floorEvents = fileText.split('').reduce(reducer, startValue)
    const firstBasementVisit = floorEvents.find(floorState => floorState.santaPosition === -1)
    const santaReachedTheBasement = firstBasementVisit.characterPosition
    console.log('santaReachedTheBasement: ', santaReachedTheBasement)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>
            <div className={classes.parsedStateContainer}>
                {floorEvents.slice(0, 10).map(floorState => {
                    return <div>{`{ characterPosition: ${floorState.characterPosition}, santaPosition: ${floorState.santaPosition} }`}</div>
                })}
                <div>...</div>
            </div>
        </div>
    </div >
}

export default Day