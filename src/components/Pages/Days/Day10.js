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
    const [fileText, linkToInputFile] = useLocalInputFile(10)

    if (!fileText) return <CircularProgress color="primary" />

    const lookAndSay = numbersString => {
        let result = ""
        let mutableInput = numbersString.split('')
        while (mutableInput.length > 0) {
            const searchChar = mutableInput.shift()
            let amount = 1
            while (mutableInput[0] === searchChar) {
                mutableInput.shift()
                amount++
            }
            result += amount + searchChar
        }
        return result
    }

    const repeatCallback = (value, callbackFn, repeats) => {
        let result = value
        for (let i = 0; i < repeats; i++) {
            result = callbackFn(result)
        }
        return result
    }

    console.log('lookAndSay("1"): ', lookAndSay("1"))
    console.log('lookAndSay("11"): ', lookAndSay("11"))
    console.log('lookAndSay("21"): ', lookAndSay("21"))

    const partOne = repeatCallback(fileText, lookAndSay, 40)
    console.log('partOne: ', partOne)
    console.log('partOne.length: ', partOne.length)

    const lookAndSayRegex = numbersString => {
        var look = /(.)\1*/g;
        function say(match) {
            return match.length.toString() + match.substring(0, 1);
        }

        return numbersString.replace(look, say);
    }

    // Runs forever
    const partTwo = repeatCallback(fileText, lookAndSayRegex, 50)
    console.log('partTwo: ', partTwo)
    console.log('partTwo.length: ', partTwo.length)


    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day