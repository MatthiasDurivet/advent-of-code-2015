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

    const document = JSON.parse(fileText)

    const getSumOfNumbers = document => {
        if (typeof (document) === 'number') {
            return document
        } else if (typeof (document) === 'string') {
            return 0
        } else if (Array.isArray(document)) {
            return document.map(el => getSumOfNumbers(el)).reduce(sumNumbers, 0)
        } else {
            if (Object.values(document).includes('red')) return 0
            return Object.values(document).map(el => getSumOfNumbers(el)).reduce(sumNumbers, 0)
        }
    }

    const total = getSumOfNumbers(document)
    console.log('total: ', total)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day