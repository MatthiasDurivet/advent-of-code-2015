import { makeStyles } from "@mui/styles"

import { useLocalInputFile } from "../../Atoms/LocalInputFile"
import { Background, Header } from "../../Molecules"
import { deepSaffron, white } from "../../../utils/CustomTheme"
import { CircularProgress } from "@mui/material"

import { sortNumbersDescending } from '../../../utils/helperFunctions'


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
    // const [fileText, linkToInputFile] = useLocalInputFile(14.1)

    if (!fileText) return <CircularProgress color="primary" />

    const reindeerSpecs = fileText.split('\n')
        .map(reindeerDescription => reindeerDescription.split(' '))
        .map(reindeerArray => ({
            subject: reindeerArray[0],
            speed: parseInt(reindeerArray[3]),
            duration: parseInt(reindeerArray[6]),
            rest: parseInt(reindeerArray[13]),
        }))

    console.log('reindeerSpecs: ', reindeerSpecs)

    const simulateRace = seconds => {
        return reindeerSpecs.map(({ subject, speed, duration, rest }) => {
            const fullMovementPeriods = Math.floor(seconds / (duration + rest))
            const fullMovementSeconds = fullMovementPeriods * duration
            const remainingSeconds = seconds % (duration + rest)
            const partialMovementSeconds = Math.min(remainingSeconds, duration)

            const fullMovementDistance = fullMovementSeconds * speed
            const partialMovementDistance = partialMovementSeconds * speed
            return {
                distance: fullMovementDistance + partialMovementDistance,
                subject: subject,
            }
        })
    }

    const raceState = simulateRace(2503).sort(sortNumbersDescending)
    console.log('raceState: ', raceState)

    const leaderboard = {}
    for (let i = 1; i <= 2503; i++) {
        const raceState = simulateRace(i).sort((a, b) => sortNumbersDescending(a.distance, b.distance))
        raceState.forEach(reindeer => {
            if (reindeer.distance === raceState[0].distance) {
                if (leaderboard[reindeer.subject]) leaderboard[reindeer.subject] += 1
                else leaderboard[reindeer.subject] = 1
            }
        })

    }
    console.log('leaderboard: ', leaderboard)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day