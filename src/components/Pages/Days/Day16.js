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
    const dayNumber = parseInt(window.location.pathname.replace('/day-', ''))
    const [fileText, linkToInputFile] = useLocalInputFile(dayNumber)

    if (!fileText) return <CircularProgress color="primary" />

    const regexFindNumber = (precedingString, regexText) => {
        const regexPattern = new RegExp(`(${precedingString}[0-9]*)`, 'g')
        const match = regexText.match(regexPattern)
        if (match) return parseInt(match[0].replace(precedingString, ''))
        return null
    }

    const searchParams = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1,
    }

    const partOne = fileText.split('\n')
        .map(auntString => ({
            original: auntString,
            children: regexFindNumber('children: ', auntString),
            cats: regexFindNumber('cats: ', auntString),
            samoyeds: regexFindNumber('samoyeds: ', auntString),
            pomeranians: regexFindNumber('pomeranians: ', auntString),
            akitas: regexFindNumber('akitas: ', auntString),
            vizslas: regexFindNumber('vizslas: ', auntString),
            goldfish: regexFindNumber('goldfish: ', auntString),
            trees: regexFindNumber('trees: ', auntString),
            cars: regexFindNumber('cars: ', auntString),
            perfumes: regexFindNumber('perfumes: ', auntString),
        }))
        .filter(aunt => (
            [
                aunt.cats !== null ? aunt.cats > searchParams.cats : true,
                aunt.trees !== null ? aunt.trees > searchParams.trees : true,

                aunt.pomeranians !== null ? aunt.pomeranians < searchParams.pomeranians : true,
                aunt.goldfish !== null ? aunt.goldfish < searchParams.goldfish : true,

                aunt.children !== null ? aunt.children === searchParams.children : true,
                aunt.samoyeds !== null ? aunt.samoyeds === searchParams.samoyeds : true,
                aunt.akitas !== null ? aunt.akitas === searchParams.akitas : true,
                aunt.vizslas !== null ? aunt.vizslas === searchParams.vizslas : true,
                aunt.cars !== null ? aunt.cars === searchParams.cars : true,
                aunt.perfumes !== null ? aunt.perfumes === searchParams.perfumes : true,
            ].every(value => value)
        ))

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