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
    const [fileText, linkToInputFile] = useLocalInputFile(8)

    if (!fileText) return <CircularProgress color="primary" />

    const strings = fileText.split('\n')
        .map(string => {
            const memoryRepresentation = eval(`new String(${string})`) /* eslint no-eval: 0 */
            const explicitVersion = '"' + string.replaceAll('\\', '\\\\').replaceAll('"', '\\"') + '"'
            console.log('string: ', string)
            console.log('explicitVersion: ', explicitVersion)
            return {
                original: string,
                codeLength: string.length,
                memoryLength: memoryRepresentation.length,
                explicitVersion: explicitVersion.length,
            }
        })
    // .map(string => new String(string))
    // .map(string => string.length)
    // .map(console.log)


    console.log('strings: ', strings)
    const totalOverhead = strings.reduce((a, b) => a + b.codeLength - b.memoryLength, 0)
    console.log('totalOverhead: ', totalOverhead)
    const totalUnderhead = strings.reduce((a, b) => a + b.explicitVersion - b.codeLength, 0)
    console.log('totalUnderhead: ', totalUnderhead)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day