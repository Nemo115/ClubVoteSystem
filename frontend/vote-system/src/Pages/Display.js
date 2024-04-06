
import { useParams } from 'react-router-dom'
import * as QRCode from 'qrcode'
import os from 'os'
import { useEffect, useState } from 'react'
const DisplayPage = () => {
    const {id} = useParams()
    const baseIp = 'http://codebrew.caillin.net/'
    console.log('adsa')
    const [QRImage, setQRImage] = useState('')
    useEffect(() => {
        QRCode.toDataURL(`${baseIp}Voting?code=${id}`, (err, url) => {
            setQRImage(url)
        })
    }, [])
    return (
        <div style={DisplayPageStyle.container}>
            <h1>Join Now:</h1>
            <div style={DisplayPageStyle.bottom}>
                <img style={DisplayPageStyle.image} src={QRImage}></img>
                <div style={DisplayPageStyle.left}>
                <p>Your election has been created. Join now with the link below, or scan the QR code to get started</p>
                <h2>{baseIp}Voting?code={id}</h2>
                </div>
            </div>
        </div>
    )
}

const DisplayPageStyle = {
    bottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    image: {
        width: '25rem',
        height: '25rem',
    },
    container: {
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 1,
    }
}


export {DisplayPage}