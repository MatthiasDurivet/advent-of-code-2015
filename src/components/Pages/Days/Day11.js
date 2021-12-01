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

class Base26Number {
    constructor(initialValue) {
        this.numberValue = this.parseString(initialValue)
    }

    increment() {
        this.numberValue++
    }

    parseString(stringRepresentation) {
        return stringRepresentation.split('')
            .map(letter => letter.charCodeAt(0) - 97)
            .reverse()
            .reduce((total, value, index) => {
                return total + value * (26 ** index)
            }, 0)
    }

    toString() {
        const length = this.numberValue.toString(26).length
        let base36Number = 0
        for (let index = 0; index < length; index++) {
            const digitAtIndex = Math.floor(this.numberValue / (26 ** index)) % 26
            const offsetByTen = (digitAtIndex + 10) * (36 ** index)
            base36Number += offsetByTen
        }
        return base36Number.toString(36)
    }

    toNumberList() {
        const length = this.numberValue.toString(26).length
        const listOfDigits = []
        for (let index = 0; index < length; index++) {
            const digitAtIndex = Math.floor(this.numberValue / (26 ** index)) % 26
            listOfDigits.unshift(digitAtIndex)
        }
        return listOfDigits
    }
}

const Day = () => {
    const classes = useStyles()
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />


    const containsAPairOfTwoLetters = inputString => {
        const regexPattern = /([a-z])\1.*([a-z])\2/g
        const regexText = inputString
        return (regexText.match(regexPattern) || []).length >= 1
    }

    const doesNotContainForbiddenLetters = inputString => {
        const regexPattern = /(i|o|u)/g
        const regexText = inputString
        return (regexText.match(regexPattern) || []).length === 0
    }

    const containsAStraightOfLetters = inputArray => {
        for (let i = 0; i <= inputArray.length - 3; i++) {
            if (inputArray[i + 0] + 1 === inputArray[i + 1] &&
                inputArray[i + 1] + 1 === inputArray[i + 2]) return true
        }
        return false
    }

    const passwordIsValid = password => {
        return (
            doesNotContainForbiddenLetters(password.toString()) &&
            containsAPairOfTwoLetters(password.toString()) &&
            containsAStraightOfLetters(password.toNumberList())
        )

    }

    const findNextPassword = password => {
        password.increment()
        let numberOfLoops = 1
        while (!passwordIsValid(password) && numberOfLoops < 10000000) {
            password.increment()
            numberOfLoops++
        }
        console.log('numberOfLoops: ', numberOfLoops)
    }

    const password = new Base26Number(fileText)
    // const password = new Base26Number('ya')
    // console.log('password: ', password)
    // console.log('password.toString(): ', password.toString())

    // for (let i = 0; i < 26; i++) {
    //     password.increment()
    //     console.log('password: ', password)
    //     console.log('password.toString(): ', password.toString())
    // }

    console.log('password: ', password)
    console.log('password: ', password.toString())
    console.log('passwordIsValid(password): ', passwordIsValid(password))
    findNextPassword(password)
    console.log('password: ', password)
    console.log('password: ', password.toString())
    console.log('passwordIsValid(password): ', passwordIsValid(password))
    findNextPassword(password)
    console.log('password: ', password)
    console.log('password: ', password.toString())
    console.log('passwordIsValid(password): ', passwordIsValid(password))

    // const test = new Base26Number('hepxxyzz')
    // console.log('password: ', test)
    // console.log('password: ', test.toString())
    // console.log('passwordIsValid(test): ', passwordIsValid(test))

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day