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
    const [fileText, linkToInputFile] = useLocalInputFile(7)

    if (!fileText) return <CircularProgress color="primary" />

    const bitOperations = fileText.split('\n')
        .map(operation => operation.split(' '))
        .map(operationArray => {
            let bitOperation

            if (operationArray.length === 3) bitOperation = {
                operation: (firstInput, secondInput) => !isNaN(firstInput) ? firstInput : null,
                firstInput: operationArray[0],
                secondInput: null,
                output: operationArray[2],
                original: operationArray,
            }

            if (operationArray.length === 4) bitOperation = {
                operation: (firstInput, secondInput) => !isNaN(firstInput) ? firstInput ^ 65535 : null,
                firstInput: operationArray[1],
                secondInput: null,
                output: operationArray[3],
                original: operationArray,
            }

            if (operationArray.length === 5) {

                if (operationArray[1] === 'AND') bitOperation = {
                    operation: (firstInput, secondInput) => (!isNaN(firstInput) && !isNaN(secondInput)) ? firstInput & secondInput : null,
                    firstInput: operationArray[0],
                    secondInput: operationArray[2],
                    output: operationArray[4],
                    original: operationArray,
                }

                if (operationArray[1] === 'OR') bitOperation = {
                    operation: (firstInput, secondInput) => (!isNaN(firstInput) && !isNaN(secondInput)) ? firstInput | secondInput : null,
                    firstInput: operationArray[0],
                    secondInput: operationArray[2],
                    output: operationArray[4],
                    original: operationArray,
                }

                if (operationArray[1] === 'LSHIFT') bitOperation = {
                    operation: (firstInput, secondInput) => (!isNaN(firstInput) && !isNaN(secondInput)) ? firstInput << secondInput : null,
                    firstInput: operationArray[0],
                    secondInput: operationArray[2],
                    output: operationArray[4],
                    original: operationArray,
                }

                if (operationArray[1] === 'RSHIFT') bitOperation = {
                    operation: (firstInput, secondInput) => (!isNaN(firstInput) && !isNaN(secondInput)) ? firstInput >> secondInput : null,
                    firstInput: operationArray[0],
                    secondInput: operationArray[2],
                    output: operationArray[4],
                    original: operationArray,
                }

            }

            return bitOperation
        })

    console.log('bitOperations: ', bitOperations)

    const performOperations = (operations = [], initialWireStates = {}) => {
        const wireStates = initialWireStates
        const getValueOrWire = valueOrWire => {
            if (valueOrWire === null) return null

            if (isNaN(valueOrWire)) {
                if (wireStates[valueOrWire].cache === null) {
                    const result = wireStates[valueOrWire].callbackFn()
                    wireStates[valueOrWire].cache = result
                    return result
                }
                return wireStates[valueOrWire].cache
            }

            return parseInt(valueOrWire)
        }

        operations.forEach(operation => {
            const callbackFn = () => {
                return operation.operation(getValueOrWire(operation.firstInput), getValueOrWire(operation.secondInput))
            }
            wireStates[operation.output] = { callbackFn: callbackFn, cache: null }
        })

        return wireStates
    }
    const firstWireStates = performOperations(bitOperations)

    const a = firstWireStates['a'].callbackFn()
    console.log('a: ', a)

    Object.keys(firstWireStates).forEach(key => {
        firstWireStates[key].cache = null
    })

    firstWireStates['b'].cache = a

    const finalA = firstWireStates['a'].callbackFn()
    console.log('finalA: ', finalA)

    return <div>
        <Header />
        <Background />
        <div className={classes.dayContainer}>
            <a className={classes.externalLink} href={linkToInputFile} target='_blank' rel='noreferrer'>{linkToInputFile}</a>


        </div>
    </div >
}

export default Day