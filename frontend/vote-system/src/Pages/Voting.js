import React, { useState } from 'react'
import '../constants'

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
                        nominee.position === position && <li style={listStyle} key={index}>
                            {nominee.name}
                            <input type="checkbox" checked={checks[position] === index}onChange={() => handleCheckboxChange(position, index)}/>
                            </li>
                    ))}
                </ul>
            </div>
        ))}
        <input type="submit" onClick={submit}Submit/>
    </div>
  )
}

const listStyle = {
    listStyle: "none"
}