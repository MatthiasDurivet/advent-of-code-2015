import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
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
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    const grid = fileText.split('\n')
        .map((row, x) => row.split('').map((c, y) => {
            const gridLength = fileText.split('\n').length
            if (
                (x === 0 && y === 0) ||
                (x === 0 && y === row.length - 1) ||
                (x === gridLength - 1 && y === 0) ||
                (x === gridLength - 1 && y === row.length - 1)
            ) return true

            return c === '#'
        }))

    console.log('grid: ', grid)

    const getNeighborOrigins = (centerX, centerY, xMax, yMax) => {
        const result = []
        for (const i of [-1, 0, 1]) {
            for (const j of [-1, 0, 1]) {
                const x = centerX + i
                const y = centerY + j
                if (x < 0 || x > xMax) continue
                if (y < 0 || y > yMax) continue
                if (x === centerX && y === centerY) continue
                result.push([x, y])
            }
        }
        return result
    }

    console.log('getNeighborOrigins(1,1,2,2): ', getNeighborOrigins(1, 1, 2, 2))

    const calculateNextGrid = previousGrid => {
        return previousGrid.map((row, x) => {
            return row.map((_, y) => {
                const neighbors = getNeighborOrigins(x, y, previousGrid.length - 1, row.length - 1)
                const activeNeighbors = neighbors.reduce((total, [neighborX, neighborY]) => {
                    return total + previousGrid[neighborX][neighborY]
                }, 0)
                if (
                    (x === 0 && y === 0) ||
                    (x === 0 && y === row.length - 1) ||
                    (x === previousGrid.length - 1 && y === 0) ||
                    (x === previousGrid.length - 1 && y === row.length - 1)
                ) return true


                if (previousGrid[x][y]) {
                    return activeNeighbors === 2 || activeNeighbors === 3
                } else {
                    return activeNeighbors === 3
                }
            })
        })
    }

    let animatedGrid = grid
    for (let i = 1; i <= 100; i++) {
        animatedGrid = calculateNextGrid(animatedGrid)
        console.log('animatedGrid: ', animatedGrid)
    }

    const partOne = animatedGrid.map(arr => arr.reduce(sumNumbers, 0)).reduce(sumNumbers, 0)
    console.log('partOne: ', partOne)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>



        </div>
    </div >
}

export default Day