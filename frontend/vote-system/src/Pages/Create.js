import { useState } from "react"
import { BACKEND_URL, themeHighlight } from "../constants"
import axios from 'axios'


const CreatePage = () => {
    const [description, setDescription] = useState('')
    const [showResults, setShowResults] = useState(true)
    const [startTime, setStartTime] = useState('--:--')
    const [finishTime, setFinishTime] = useState('--:--')
    const [positions, setPositions] = useState([])
    const [name, setName] = useState('')

    const handleSubmit = () => {
        axios({
            method: 'POST',
            url: `${BACKEND_URL}/elections/create`,
            data: {
                description,
                name,
                startTime,
                finishTime,
                showResults,
                positions,
            }
        }).then(res => {

        }).catch(err => {
            console.log(err)
        })
    } 

    const addPosition = (position) => {
        setPositions(positions.concat({name: position, candidates: []}))
    }
    const deletePosition = (index) => {
        var tmp = positions.slice()
        tmp.splice(index, 1)
        setPositions(tmp)
    }
    const deleteCandidate = (positionIndex, candidateIndex) => {
        var tmp = positions.slice()
        tmp[positionIndex].candidates.splice(candidateIndex, 1)
        setPositions(tmp)
    }
    const addCandidate = (candidate, positionIndex) => {
        var tmp = positions.slice()
        tmp[positionIndex].candidates = tmp[positionIndex].candidates.concat(candidate)
        setPositions(tmp)
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
                <p style={CreatePageStyle.optionsCategoryLeft}>description: </p>
                <input style={CreatePageStyle.optionsCategoryRight} value={description} onChange={e => setDescription(e.target.value)}></input>
            </div>            
            <div style={CreatePageStyle.optionItem}>
                <p style={CreatePageStyle.optionsCategoryLeft}>name: </p>
                <input style={CreatePageStyle.optionsCategoryRight} value={name} onChange={e => setName(e.target.value)}></input>
            </div>            
            <div style={CreatePageStyle.optionItem}>
                <p style={CreatePageStyle.optionsCategoryLeft}>End time:</p>
                <input style={CreatePageStyle.optionsCategoryRight} type="time" value={finishTime} onChange={e => setFinishTime(e.target.value)}></input>
            </div>            
            <div style={CreatePageStyle.optionItem}>
                <p>Show results:</p>
                <input type="checkbox" checked={showResults} onChange={() => setShowResults(!showResults)}></input>
            </div>

            <ComplexField name={'positions'} fields={positions.map(p => p.name)} addField={addPosition} deleteField={deletePosition}/>

            {
                positions.map((position, i) => {
                    return (
                        <ComplexField 
                            key={i} 
                            name={position.name} 
                            fields={position.candidates} 
                            addField={candidate => addCandidate(candidate, i)} 
                            deleteField={index => deleteCandidate(i, index)}
                        />
                    )
                })
            }

            <button style={CreatePageStyle.submitButton} onClick={() => handleSubmit()}>SUBMIT</button>
        </div>
    )
}


const ComplexField = ({name, fields, addField, deleteField}) => {

    const [expanded, setExpanded] = useState(true)
    const [field, setField] = useState('')


    const addFieldInner = () => {
        if (field === '')
        {
            return;
        }
        addField(field)
        setField('')
    }

    const fieldOnKeydown = e => {
        if(e.key === 'Enter')
        {
            addFieldInner()
        }
    }

    return (
        <div style={CreatePageStyle.candidatesWrapper}>
            <div style={CreatePageStyle.candidatesHeader}>
                <div style={CreatePageStyle.headerLeft}>
                    <h2 style={CreatePageStyle.candidatesHeaderHeading}>{name}</h2>
                    <div style={CreatePageStyle.addCandidate}>
                    <input placeholder={name} onKeyDown={fieldOnKeydown} value={field} onChange={e => setField(e.target.value)} style={CreatePageStyle.nameInput}></input>
                    <button style={CreatePageStyle.smallIconButton} onClick={() => addFieldInner()}>add_circle</button>
                    </div>
                </div>
                <button style={CreatePageStyle.iconButton} onClick={() => setExpanded(!expanded)}>{expanded ? 'expand_less' : 'expand_more'}</button>
            </div>
            <div style={expanded ? CreatePageStyle.candidatesNameDisplayShown : CreatePageStyle.candidatesNameDisplayHidden}>
            {
                fields.map((c, i) => {
                    return (
                        <div key={i} style={CreatePageStyle.candidateNameWrapper}>
                            <p style={CreatePageStyle.candidateName}>{c}</p>
                            <button style={CreatePageStyle.trashCandidate} onClick={e => deleteField(i)}>delete</button>
                        </div>
                    )
                })
            }
            </div>
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
