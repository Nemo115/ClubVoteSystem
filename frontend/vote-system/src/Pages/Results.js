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
    const [positions, setPositions] = useState([{position: 'Secretary', name: 'Chris Jerry', votes: 12}, {position: 'President', name: 'Jerry Bumpkis', votes: 15}])
    const [voteId, setVoteId] = useState(123482)
    return (
        <div style={ResultsPageFinishedStyle.wrapper}>
            <h1>Results</h1>
            <div style={ResultsPageFinishedStyle.topWrapper}>
                <div style={ResultsPageFinishedStyle.topInnerWrapper}>
                    <h2>Date:</h2>
                    <p>{date}</p>
                </div>
                <div style={ResultsPageFinishedStyle.topInnerWrapper}>
                    <h2>Votes:</h2>
                    <p>{voteCount}</p>
                </div>
            </div>
            {positions.map((p, i) => {
                return (
                    <div key={i} style={ResultsPageFinished.positionWrapper}>
                        <h2>{p.position}</h2>
                        <div style={ResultsPageFinishedStyle.positionLowerWrapper}>
                            <p>{p.name}</p>
                            <p>{p.votes}</p>
                        </div>
                    </div>
                )
            })}
            <h2>Vote ID: {voteId}</h2>
            <p></p>
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

const ResultsPageFinishedStyle = {
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '20rem',
        margin: 'auto',
    },
    topWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    topInnerWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    positionWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    positionLowerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}

export { ResultsPage }