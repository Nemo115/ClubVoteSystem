import { useState } from "react"
import { themeHighlight } from "../constants"



const CreatePage = () => {
    const [candidates, setCandidates] = useState([]);
    const [name, setName] = useState('');
    const [candidatesExpanded, setCandidatesExpanded] = useState(true)
    const [showResults, setShowResults] = useState(true)
    const [startTime, setStartTime] = useState('--:--')
    const [finishTime, setFinishTime] = useState('--:--')

    const addName = () => {
        if (name === '')
        {
            return;
        }
        setCandidates(candidates.concat([name]))
        setName('')
    }
    const nameOnKeydown = e => {
        if(e.key === 'Enter')
        {
            addName()
        }
    }
    const handleDeleteName = (e, index) => {
        console.log(index)
        var tmp = candidates.slice()
        tmp.splice(index, 1)
        console.log(tmp)
        setCandidates(tmp)

    }


    return (
        <div style={CreatePageStyle.wrapper}>
            <div style={CreatePageStyle.optionItem}>
                <p style={CreatePageStyle.optionsCategoryLeft}>Type:</p>
                <select style={CreatePageStyle.optionsCategoryRight}>
                    <option>Preferential</option>
                </select>
            </div>            
            <div style={CreatePageStyle.optionItem}>
                <p style={CreatePageStyle.optionsCategoryLeft}>Restrict:</p>
                <select style={CreatePageStyle.optionsCategoryRight}>
                    <option>University emails</option>
                </select>
            </div>            
            <div style={CreatePageStyle.optionItem}>
                <p style={CreatePageStyle.optionsCategoryLeft}>Start time:</p>
                <input style={CreatePageStyle.optionsCategoryRight} type="time" value={startTime} onChange={e => setStartTime(e.target.value)}></input>

            </div>            
            <div style={CreatePageStyle.optionItem}>
                <p style={CreatePageStyle.optionsCategoryLeft}>End time:</p>
                <input style={CreatePageStyle.optionsCategoryRight} type="time" value={finishTime} onChange={e => setFinishTime(e.target.value)}></input>
            </div>            
            <div style={CreatePageStyle.optionItem}>
                <p>Show results:</p>
                <input type="checkbox" checked={showResults} onChange={() => setShowResults(!showResults)}></input>
            </div>  
            <div style={CreatePageStyle.candidatesWrapper}>
                <div style={CreatePageStyle.candidatesHeader}>
                    <div style={CreatePageStyle.headerLeft}>
                        <h2 style={CreatePageStyle.candidatesHeaderHeading}>Candidates</h2>
                        <div style={CreatePageStyle.addCandidate}>
                        <input placeholder={'Candidate name'} onKeyDown={nameOnKeydown} value={name} onChange={e => setName(e.target.value)} style={CreatePageStyle.nameInput}></input>
                        <button style={CreatePageStyle.smallIconButton} onClick={() => addName()}>add_circle</button>
                        </div>
                    </div>
                    <button style={CreatePageStyle.iconButton} onClick={() => setCandidatesExpanded(!candidatesExpanded)}>{candidatesExpanded ? 'expand_less' : 'expand_more'}</button>
                </div>
                <div style={candidatesExpanded ? CreatePageStyle.candidatesNameDisplayShown : CreatePageStyle.candidatesNameDisplayHidden}>
                {
                    candidates.map((c, i) => {
                        return (
                            <div key={i} style={CreatePageStyle.candidateNameWrapper}>
                                <p style={CreatePageStyle.candidateName}>{c}</p>
                                <button style={CreatePageStyle.trashCandidate} onClick={e => handleDeleteName(e, i)}>delete</button>
                            </div>
                        )
                    })
                }
                </div>
            </div>          
            <button style={CreatePageStyle.submitButton}>SUBMIT</button>
        </div>
    )
}

const CreatePageStyle = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '20rem',
        margin: 'auto',
        marginTop: '2rem',
        gap: '0.5rem',
    },
    optionItem: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    optionItemNested: {
        display: 'flex',
        height: '100%',
    },
    candidatesWrapper: {
        backgroundColor: 'lightgrey',
        borderRadius: '1rem',
        paddingBottom: '1rem',
    },
    candidatesHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: '1.5rem',
        paddingTop: '0.5rem',
        marginLeft: '1rem',
        alignItems: 'center',
        position: 'relative',
    },
    iconButton: {
        fontFamily: 'Material Symbols Outlined',
        aspectRatio: '1 / 1',
        width: '3rem',
        height: '3rem',
        borderRadius: '3rem',
        fontSize: '2rem',
        backgroundColor: 'white',
        border: 0,
        color: themeHighlight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translate(50%, -50%) translateY(0.5rem)',
    },
    addCandidate: {
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1,
    },
    headerLeft: {
        flexGrow: 1,
    },
    smallIconButton: {
        color: 'green',
        fontSize: '2rem',
        fontFamily: 'Material Symbols Outlined',
        backgroundColor: 'transparent',
        border: 0,
    },
    nameInput: {
        fontSize: '1rem',
        width: 0,
        flexGrow: 1,
    },
    candidatesHeaderHeading: {
        margin: 0,
        textAlign: 'left',
    },
    candidateNameWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
        marginTop: '1rem',
        backgroundColor: 'white',
        marginLeft: '1rem',
        marginRight: '1rem',
        borderRadius: '0.5rem',
    },
    candidateName: {
        textAlign: 'left',
        marginLeft: '2rem',
    },
    trashCandidate: {
        backgroundColor: 'transparent',
        color: 'red',
        border: 0,
        fontFamily: 'Material Symbols Outlined',
        fontSize: '2rem',
    },
    submitButton: {
        backgroundColor: themeHighlight,
        color: 'white',
        fontSize: '1.5rem',
        padding: '0.5rem',
        width: '100%',
        borderRadius: '0.5rem',
        marginTop: '1rem',
    },
    candidatesNameDisplayHidden: {
        maxHeight: 0,
        overflow: 'hidden',
        transition: 'max-height 0.5s',
    },
    candidatesNameDisplayShown: {
        maxHeight: '25rem',
        boxSizing: 'border-box',
        overflow: 'auto',
        transition: 'max-height 0.5s',
    },
    optionsCategoryLeft: {
        textAlign: 'left',
        flexGrow: 1,
    },
    optionsCategoryRight: {
        width: '10rem',
        boxSizing: 'border-box',
        fontSize: '1rem',
        textAlign: 'center',
    }
}

export { CreatePage }
