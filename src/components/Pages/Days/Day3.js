import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { black, deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"


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

const parseForSanta = fileText => {
    const startValue = [{ characterPosition: 0, santaX: 0, santaY: 0 }]
    const reducer = (finalArray, movementCharacter) => {
        const previousValue = finalArray.slice(-1)[0]
        const newState = movementCharacter === '^'
            ? { characterPosition: previousValue.characterPosition + 1, santaX: previousValue.santaX, santaY: previousValue.santaY + 1 }
            : movementCharacter === '>'
                ? { characterPosition: previousValue.characterPosition + 1, santaX: previousValue.santaX + 1, santaY: previousValue.santaY }
                : movementCharacter === 'v'
                    ? { characterPosition: previousValue.characterPosition + 1, santaX: previousValue.santaX, santaY: previousValue.santaY - 1 }
                    : movementCharacter === '<'
                        ? { characterPosition: previousValue.characterPosition + 1, santaX: previousValue.santaX - 1, santaY: previousValue.santaY }
                        : console.log('unknown character')
        return [...finalArray, newState]
    }
    const gridMovement = fileText.split('').reduce(reducer, startValue)
    return gridMovement
}

const parseForSantaAndRobotSanta = fileText => {
    const startValue = [{ characterPosition: 0, santaX: 0, santaY: 0, robotX: 0, robotY: 0 }]
    const reducer = (finalArray, movementCharacter) => {
        const previousValue = finalArray.slice(-1)[0]
        const newCharacterPosition = previousValue.characterPosition + 1
        const santaIsMoving = newCharacterPosition % 2 === 0
        let newState = { ...previousValue, characterPosition: newCharacterPosition }

        if (santaIsMoving) {
            newState = movementCharacter === '^'
                ? { ...newState, santaY: previousValue.santaY + 1 }
                : movementCharacter === '>'
                    ? { ...newState, santaX: previousValue.santaX + 1 }
                    : movementCharacter === 'v'
                        ? { ...newState, santaY: previousValue.santaY - 1 }
                        : movementCharacter === '<'
                            ? { ...newState, santaX: previousValue.santaX - 1, }
                            : console.log('unknown character')
        } else {
            newState = movementCharacter === '^'
                ? { ...newState, robotY: previousValue.robotY + 1 }
                : movementCharacter === '>'
                    ? { ...newState, robotX: previousValue.robotX + 1 }
                    : movementCharacter === 'v'
                        ? { ...newState, robotY: previousValue.robotY - 1 }
                        : movementCharacter === '<'
                            ? { ...newState, robotX: previousValue.robotX - 1, }
                            : console.log('unknown character')
        }

        return [...finalArray, newState]
    }
    const gridMovement = fileText.split('').reduce(reducer, startValue)
    return gridMovement
}

const asciiGridForSanta = gridMovement => {
    let highestX = 0
    let lowestX = 0
    let highestY = 0
    let lowestY = 0

    gridMovement.forEach(gridState => {
        if (gridState.santaX < lowestX) lowestX = gridState.santaX
        if (gridState.santaX > highestX) highestX = gridState.santaX
        if (gridState.santaY < lowestY) lowestY = gridState.santaY
        if (gridState.santaY > highestY) highestY = gridState.santaY
    })

    const gridWidth = highestX - lowestX
    const gridHeight = highestY - lowestY
    const gridSideLength = Math.max(gridWidth, gridHeight)

    const asciiArtGrid = []
    for (let index = 0; index <= gridSideLength; index++) {
        asciiArtGrid[index] = new Array(gridSideLength + 1).fill('*')
    }

    const adjustedGridMovement = gridMovement
        .map(gridState => {
            return {
                ...gridState,
                santaX: gridState.santaX - lowestX,
                santaY: gridState.santaY - lowestY,
            }
        })

    adjustedGridMovement.forEach(gridState => {
        asciiArtGrid[gridState.santaX][gridState.santaY] = 'O'
    })

    return asciiArtGrid
}

const asciiGridForSantaAndRobotSanta = gridMovement => {
    let highestX = 0
    let lowestX = 0
    let highestY = 0
    let lowestY = 0

    gridMovement.forEach(gridState => {
        if (gridState.santaX < lowestX) lowestX = gridState.santaX
        if (gridState.santaX > highestX) highestX = gridState.santaX
        if (gridState.santaY < lowestY) lowestY = gridState.santaY
        if (gridState.santaY > highestY) highestY = gridState.santaY

        if (gridState.robotX < lowestX) lowestX = gridState.robotX
        if (gridState.robotX > highestX) highestX = gridState.robotX
        if (gridState.robotY < lowestY) lowestY = gridState.robotY
        if (gridState.robotY > highestY) highestY = gridState.robotY
    })

    const gridWidth = highestX - lowestX
    const gridHeight = highestY - lowestY
    const gridSideLength = Math.max(gridWidth, gridHeight)

    const asciiArtGrid = []
    for (let index = 0; index <= gridSideLength; index++) {
        asciiArtGrid[index] = new Array(gridSideLength + 1).fill('*')
    }

    const adjustedGridMovement = gridMovement
        .map(gridState => {
            return {
                ...gridState,
                santaX: gridState.santaX - lowestX,
                santaY: gridState.santaY - lowestY,
                robotX: gridState.robotX - lowestX,
                robotY: gridState.robotY - lowestY,
            }
        })

    adjustedGridMovement.forEach(gridState => {
        asciiArtGrid[gridState.santaX][gridState.santaY] = 'S'
        asciiArtGrid[gridState.robotX][gridState.robotY] = 'R'
    })

    return asciiArtGrid
}

const Day = () => {
    const classes = useStyles()
    const [fileText, linkToInputFile] = useLocalInputFile(3)

    if (!fileText) return <CircularProgress color="primary" />

    const santaGrid = parseForSanta(fileText)
    const santaAscii = asciiGridForSanta(santaGrid)

    let regexPattern = /O/g
    let regexText = santaAscii.map(row => row.join('')).join('')
    let housesVisited = regexText.match(regexPattern).length
    console.log('housesVisited: ', housesVisited)

    const robotGrid = parseForSantaAndRobotSanta(fileText)
    const robotAscii = asciiGridForSantaAndRobotSanta(robotGrid)

    regexPattern = /(S|R)/g
    regexText = robotAscii.map(row => row.join('')).join('')
    housesVisited = regexText.match(regexPattern).length
    console.log('housesVisited: ', housesVisited)


    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>

            <div style={{
                backgroundColor: black,
                width: 'min-content',
                display: 'flex',
                justifyContent: 'flex-start',
                rowGap: 1,
                flexWrap: 'wrap',
            }}>
                {santaAscii.map(row => {
                    return <div style={{ display: 'flex', justifyContent: 'space-between', columnGap: 1, flexWrap: 'nowrap' }}>
                        {row.map(char => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 12, height: 12 }}>{char}</div>)}
                    </div>
                })}
            </div>


            <div style={{
                backgroundColor: black,
                width: 'min-content',
                display: 'flex',
                justifyContent: 'flex-start',
                rowGap: 1,
                flexWrap: 'wrap',
                marginTop: 50
            }}>
                {robotAscii.map(row => {
                    return <div style={{ display: 'flex', justifyContent: 'space-between', columnGap: 1, flexWrap: 'nowrap' }}>
                        {row.map(char => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 12, height: 12 }}>{char}</div>)}
                    </div>
                })}
            </div>
        </div>
    </div >
}

export default Day