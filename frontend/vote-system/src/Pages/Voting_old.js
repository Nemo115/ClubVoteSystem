import React, { useState } from 'react'
import { themeBackground } from '../constants';
import { themeHighlight } from '../constants';

export default function Voting() {
    // Will be pulled from API when its up
    const nominees = [
        {
            name:'Nominee 1',
            position: 'President'
        },
        {
            name:'Nominee 2',
            position: 'Treasurer'
        },
        {
            name: 'Nominee 3.14159',
            position: 'Secretary'
        }, 
        {
            name: 'Nominee 4.5',
            position: 'President'
        }
    ]

    var positions = []
    for (let i=0;i<nominees.length;i++) {
        if (!positions.includes(nominees[i].position)) {
            positions.push(nominees[i].position);
        }
    }

    const [checks, setChecks] = useState([]);

    function handleCheckboxChange(position, index) {
        setChecks(prevState => ({
            ...prevState, 
            [position]: index
        }));
    }

    function submit() {
        var selected = []
        Object.values(checks).forEach(value => {
            selected.push(nominees[value]);
        })
        console.log(selected)
    }

  return (
    <div>
        <h2>Voting Process</h2>
        {positions.map((position, index) => (
            <div>
                <h1>{position}</h1>
                <ul key={index}>
                    {nominees.map((nominee, index) => (
                        nominee.position === position && <li style={listStyle} key={index} draggable>
                            {nominee.name}
                            <input type="checkbox" style={checkBoxstyle} checked={checks[position] === index}onChange={() => handleCheckboxChange(position, index)}/>
                            </li>
                    ))}
                </ul>
            </div>
        ))}
        <input type="submit" style={formStyle.submitButton} onClick={submit}/>
    </div>
  )
}

const listStyle = {
    listStyle: "none",
    fontSize: "30px"
}

const checkBoxstyle = {
    width: "1rem",
    height: "1rem"
}

const formStyle = {
    input: {
        marginTop: '0.5rem',
        width: '70%',
        height: '2rem',
        fontSize: '1rem',
        textAlign: 'center',
        marginBottom: '0.5rem',
        marginLeft: '0.5rem'
    },
    label: {
        wdith: '100%',
        fontSize: '20px'
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
}