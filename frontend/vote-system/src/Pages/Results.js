import { useEffect, useState } from 'react'
import waitingRobot from '../assets/robot_waiting.png'
import axios from 'axios'
import { BACKEND_URL } from '../constants'
import { useParams } from 'react-router-dom'

const ResultsPage = () => {
    const [finished, setFinished] = useState(false) 
    const [idPresent, setIdPresent] = useState(true)
    const [refreshBool ,setRefreshBool] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        if (id)
        {
            console.log(id)
            axios({
                method: 'GET',
                url: `${BACKEND_URL}/election/isFinished?electionId=${id}`,
                data: {
                    electionId: id
                }
            }).then(res => {
                if (res.data.finished === true)
                {
                    setFinished(true)
                }
                else {
                    setTimeout(() => {
                        setRefreshBool(!refreshBool)
                    }, 1000)
                }
            }).catch(err => {
                console.log(err)
                setTimeout(() => {
                    setRefreshBool(!refreshBool)
                }, 1000)
            })

        } else {
            setIdPresent(false)
        }
    }, [refreshBool])


    return (
        <div>
        {
            idPresent ? finished ? <ResultsPageFinished electionId={id} /> : <ResultsPageUnfinished />
            : <ResultsPageNoID />
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
const ResultsPageNoID = () => {
    const [id, setID] = useState('')
    return (
        <div style={ResultsPageUnfinishedStyle.container}>
            <h1>Please enter election id</h1>
            <input value={id} onChange={e => setID(e.target.value)}></input>
            <button onClick={() => window.location.href=`/results/${id}`}>SUBMIT</button>
        </div>
    )
}

const ResultsPageFinished = ({ electionId }) => {
    const [date, setDate] = useState('Jan 24th')
    const [voteCount, setVoteCount] = useState(100)
    const [positions, setPositions] = useState([{position: 'Secretary', name: 'Chris Jerry', votes: 12}, {position: 'President', name: 'Jerry Bumpkis', votes: 15}])
    const [voteId, setVoteId] = useState(123482)

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${BACKEND_URL}/election/results?electionId=${electionId}`
        }).then(res => {
            setDate(res.data.date)
            setVoteCount(res.data.voteCount)
            setPositions(res.data.positions)
            setVoteId(res.data.voteId)
        }).catch(err => {
            
        })
    }, [])

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
            <h2>Election ID: {voteId}</h2>
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