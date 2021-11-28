import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
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

const Day = () => {
    const classes = useStyles()
    const [fileText, linkToInputFile] = useLocalInputFile(5)

    if (!fileText) return <CircularProgress color="primary" />


    const filterOnVowels = inputString => {
        const regexPattern = /(a|e|i|o|u)/g
        const regexText = inputString
        return (regexText.match(regexPattern) || []).length >= 3
    }

    const filterOnRepeatLetters = inputString => {
        const regexPattern = /([a-z])\1/g
        const regexText = inputString
        return (regexText.match(regexPattern) || []).length >= 1
    }

    const filterOnBadSubstrings = inputString => {
        const regexPattern = /(ab|cd|pq|xy)/g
        const regexText = inputString
        return (regexText.match(regexPattern) || []).length < 1
    }

    const filterOnPairsOfTwo = inputString => {
        const regexPattern = /([a-z]{2}).*\1/g
        const regexText = inputString
        return (regexText.match(regexPattern) || []).length >= 1
    }

    const filterOnRepeatWithLetterInbetween = inputString => {
        const regexPattern = /([a-z])[a-z]\1/g
        const regexText = inputString
        return (regexText.match(regexPattern) || []).length >= 1
    }

    let niceStrings = fileText
        .split('\n')
        .filter(filterOnVowels)
        .filter(filterOnRepeatLetters)
        .filter(filterOnBadSubstrings)

    console.log('niceStrings.length: ', niceStrings.length)
    console.log('...niceStrings.slice(0,5): ', ...niceStrings.slice(0, 5))

    niceStrings = fileText
        .split('\n')
        .filter(filterOnPairsOfTwo)
        .filter(filterOnRepeatWithLetterInbetween)

    console.log('niceStrings.length: ', niceStrings.length)
    console.log('...niceStrings.slice(0,5): ', ...niceStrings.slice(0, 5))

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day