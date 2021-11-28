import { makeStyles } from "@mui/styles"
import MD5 from "crypto-js/md5"

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
    const [fileText, linkToInputFile] = useLocalInputFile(4)

    if (!fileText) return <CircularProgress color="primary" />

    let result
    let i = -1
    while ((!result || result.substring(0, 6) !== '000000') && i < 10000000) {
        i += 1
        result = MD5(fileText + i).toString()
    }
    console.log('i: ', i)
    console.log('result: ', result)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day