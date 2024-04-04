import { useState } from 'react'
import waitingRobot from '../assets/robot_waiting.png'

const ResultsPage = () => {
    const [finished, setFinished] = useState(true) 
    return (
        <div>
        {
            finished ? <ResultsPageFinished /> : <ResultsPageUnfinished />
        }
        </div>
    )
}


const ResultsPageUnfinished = () => {
    return (
        <div style={ResultsPageUnfinishedStyle.container}>
            <h1>Sit tight..</h1>
            <img style={ResultsPageUnfinishedStyle.image} src={waitingRobot}></img>
            <h2>This election hasn't finished yet</h2>
            <p>Results will appear on this page as soon as they'r ready.</p>
        </div>
    )
}

const ResultsPageFinished = () => {
    const [date, setDate] = useState('Jan 24th')
    const [voteCount, setVoteCount] = useState(100)
    const [positions, setPositions] = useState([{position: 'Secretary', name: 'Chris Jerry'}, {position: 'President', name: 'Jerry Bumpkis'}])
    return (
        <div>
            <h1>Results</h1>
            <div>
                <div>
                    <h2>Date:</h2>
                    <p>{date}</p>
                </div>
                <div>
                    <h2>Votes:</h2>
                    <p>{voteCount}</p>
                </div>
            </div>
        </div>
    )
}


const ResultsPageUnfinishedStyle = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        maxWidth: '20rem',
    }
}

export { ResultsPage }