import { makeStyles } from "@mui/styles"
import { CircularProgress } from "@mui/material"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"

import { powerset, sortNumbersAscending, sumNumbers, groupBy } from '../../../utils/helperFunctions'

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

    const containers = fileText.split('\n')
        .map(str => parseInt(str))

    const options = powerset(containers)
        .filter(option => {
            return option.reduce(sumNumbers, 0) === 150
        })

    console.log('options: ', options)
    console.log('options.length: ', options.length)

    const partTwo = options
        .map(arr => arr.length)
        .sort(sortNumbersAscending)
        .reduce(groupBy, {})

    console.log('partTwo: ', partTwo)


    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day