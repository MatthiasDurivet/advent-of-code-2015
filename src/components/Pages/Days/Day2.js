import { makeStyles } from "@mui/styles"
import { CircularProgress } from "@mui/material"

import { ContinuousRotation, Rectangle3D } from "../../Atoms"
import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { black, deepSaffron, white } from "../../../utils/CustomTheme"
import { sortNumbersAscending, sumNumbers } from "../../../utils/helperFunctions"


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
    },
    flexGrid: {
        width: '60%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        rowGap: 10,
        columnGap: 100,
        flexWrap: 'wrap'
    }
}))

const Day = () => {
    const classes = useStyles()
    const [fileText, linkToInputFile] = useLocalInputFile(2)

    if (!fileText) return <CircularProgress color="primary" />

    const presents = fileText
        .split('\n')
        .map(presentAsString => presentAsString.split('x'))
        .map(presentAsArray => presentAsArray.map(valueAsString => parseInt(valueAsString)))
        .map(presentAsArray => presentAsArray.sort(sortNumbersAscending))

    const calculateWrappingPaper = presentAsArray => {
        const minimumSquareFeet = 2 * (presentAsArray[0] * presentAsArray[1]) + 2 * (presentAsArray[1] * presentAsArray[2]) + 2 * (presentAsArray[2] * presentAsArray[0])
        const additionalSlack = presentAsArray[0] * presentAsArray[1]
        return minimumSquareFeet + additionalSlack

    }

    const totalSquareFeetOfWrappingPaper = presents
        .map(calculateWrappingPaper)
        .reduce(sumNumbers, 0)
    console.log('totalSquareFeetOfWrappingPaper: ', totalSquareFeetOfWrappingPaper)

    const calculateRibbon = presentAsArray => {
        const minimumFeetRibbon = 2 * presentAsArray[0] + 2 * presentAsArray[1]
        const feetForBow = presentAsArray[0] * presentAsArray[1] * presentAsArray[2]
        return minimumFeetRibbon + feetForBow
    }

    const totalFeetOfRibbon = presents
        .map(calculateRibbon)
        .reduce(sumNumbers, 0)
    console.log('totalFeetOfRibbon: ', totalFeetOfRibbon)


    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>
            <div className={classes.flexGrid}>
                {presents.slice(0, 50).map(([h, w, l]) => {
                    const text = ['', '', '', '', '', '']
                    console.log('text: ', text)
                    return <ContinuousRotation variant='hover'>
                        <Rectangle3D height={h} width={w} length={l} textPerFace={text} />
                    </ContinuousRotation>
                })}
            </div>
        </div>
    </div >
}

export default Day