import React from "react"
import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { black, deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"
import { sumNumbers } from "../../../utils/helperFunctions"


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
    const [fileText, linkToInputFile] = useLocalInputFile(6)
    const [grid, setGrid] = React.useState([])

    if (!fileText) return <CircularProgress color="primary" />

    const gridSideLength = 1000
    let tempGrid = []
    for (let index = 0; index < gridSideLength; index++) {
        tempGrid[index] = new Array(gridSideLength).fill(0)
    }
    setGrid(tempGrid)

    const instructions = (fileText || []).split('\n')
        .map(instruction => instruction.replace('turn off', 'turnoff'))
        .map(instruction => instruction.replace('turn on', 'turnon'))
        .map(instruction => instruction.split(' '))
        .map(instructionArray => ({
            action: instructionArray[0],
            from: instructionArray[1].split(',').map(index => parseInt(index)),
            to: instructionArray[3].split(',').map(index => parseInt(index)),
        }))

    const setToXForRange = (grid, callbackfn, from, to) => {
        const xStart = from[0]
        const xEnd = to[0]
        const yStart = from[1]
        const yEnd = to[1]

        for (let xIndex = xStart; xIndex <= xEnd; xIndex++) {
            for (let yIndex = yStart; yIndex <= yEnd; yIndex++) {
                grid[xIndex][yIndex] = callbackfn(grid[xIndex][yIndex])
            }
        }

    }

    // instructions.forEach(instruction => {
    //     if (instruction.action === 'turnon') {
    //         setToXForRange(
    //             lightState => true,
    //             instruction.from,
    //             instruction.to,
    //         )
    //     } else if (instruction.action === 'turnoff') {
    //         setToXForRange(
    //             lightState => false,
    //             instruction.from,
    //             instruction.to,
    //         )
    //     } else if (instruction.action === 'toggle') {
    //         setToXForRange(
    //             lightState => !lightState,
    //             instruction.from,
    //             instruction.to,
    //         )
    //     }
    // })

    instructions.slice(0, 1).forEach((instruction, index) => {
        if (instruction.action === 'turnon') {
            setToXForRange(
                tempGrid,
                lightState => (lightState || 0) + 1,
                instruction.from,
                instruction.to,
            )
        } else if (instruction.action === 'turnoff') {
            setToXForRange(
                tempGrid,
                lightState => Math.max(0, (lightState || 0) - 1),
                instruction.from,
                instruction.to,
            )
        } else if (instruction.action === 'toggle') {
            setToXForRange(
                tempGrid,
                lightState => (lightState || 0) + 2,
                instruction.from,
                instruction.to,
            )
        }
        setGrid(tempGrid)
    })

    // const howManyAreTrue = grid.map(row => {
    //     return row.filter(value => value).length
    // }).reduce(sumNumbers, 0)

    // const howManyAreFalse = grid.map(row => {
    //     return row.filter(value => !value).length
    // }).reduce(sumNumbers, 0)

    // const howMany = grid.map(row => {
    //     return row.length
    // }).reduce(sumNumbers, 0)

    // const totalBrightness = grid.map(row => {
    //     return row.reduce(sumNumbers, 0)
    // }).reduce(sumNumbers, 0)

    // console.log('howMany: ', howMany)
    // console.log('howManyAreTrue: ', howManyAreTrue)
    // console.log('howManyAreFalse: ', howManyAreFalse)
    // console.log('totalBrightness: ', totalBrightness)

    const resizeGrid = (grid, factor = 10) => {
        const newGrid = []

        const xStart = 0
        const xEnd = grid.length / factor
        const yStart = 0
        const yEnd = grid.length / factor

        for (let xIndex = xStart; xIndex <= xEnd; xIndex++) {
            newGrid[xIndex] = []
            for (let yIndex = yStart; yIndex <= yEnd; yIndex++) {
                newGrid[xIndex][yIndex] = grid.slice(xIndex * factor, xIndex * factor + factor)
                    .map(row => row.slice(yIndex * factor, yIndex * factor + factor))
                    .map(row => row.reduce(sumNumbers, 0))
                    .reduce(sumNumbers, 0) / (factor * factor)
            }
        }

        return newGrid
    }

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>
            <div style={{
                backgroundColor: black,
                marginTop: 50,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                width: 1000,
            }}>
                {resizeGrid(grid, 10).map((row, rowIndex) => {
                    return row.map((value, colIndex) => <div style={{ width: 10, height: 10, border: '1px solid red', display: 'border-box', backgroundColor: `rgba(255, 255, 255, ${value / 100})` }} />)
                })}
            </div>

        </div>
    </div >
}

export default Day