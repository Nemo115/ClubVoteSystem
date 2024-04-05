import React from 'react'
import { useState, useRef } from 'react';
import { themeBackground } from '../constants';
import { themeHighlight } from '../constants';

export default function Voting() {
    // Getting code from URL
    const url = ('http://localhost:5000')
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code')

    const [nominees, setNominees] = useState([])

    const requestOptions = {
        method: 'GET',
    };

    fetch(url + '/code', requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response not ok");
        }
        return response.json();
    }).then(data => {
        setNominees(data);
    }).catch(error => {
        console.error('Error', error);
    })

    var positions = []
    for (let i=0;i<nominees.length;i++) {
        if (!positions.includes(nominees[i].position)) {
            positions.push(nominees[i].position);
        }
    }

    const dragPerson = useRef(0)
    const draggedOverPerson = useRef(0)

    function handleSort() {
        const nomineesClone = [...nominees]
        const temp = nomineesClone[dragPerson.current]
        if (nomineesClone[dragPerson.current].position === nomineesClone[draggedOverPerson.current].position) {
            nomineesClone[dragPerson.current] = nomineesClone[draggedOverPerson.current]
            nomineesClone[draggedOverPerson.current] = temp
            setNominees(nomineesClone)
        }
    }

    function submit() {
        var return_nominees = [...nominees]
        for (let i=0;i<positions.length;i++) {
            var candidates_in_position = []
            // Get all candidates in a position and add to list
            for (let j=0;j<nominees.length;j++) {
                if (nominees[j].position === positions[i]) {
                    candidates_in_position.push(nominees[j]);
                }
            }
            var highest_score = candidates_in_position.length
            for (let j=0;j<candidates_in_position.length;j++) {
                candidates_in_position[j].score = highest_score-j;
            }
            candidates_in_position.forEach(function(value) {
                for (let j=0;j<return_nominees;j++) {
                    if (return_nominees[j].name === value.name) {
                        return_nominees[j] = value;
                    }
                }
            });
        }
        // Update this with POST to API Later
        console.log(return_nominees);
    }
  return (
    <div>
        <h2>Voting Process</h2>
        <div className='text-x1 font-bold mt-4'>
            {positions.map((position, index) => (
                <div>
                    <h1>{position}</h1>
                    <div key={index}>
                        {nominees.map((nominee, index) => (
                            nominee.position === position && <div 
                            draggable
                            onDragStart={() => (dragPerson.current = index)}
                            onDragEnter = {() => (draggedOverPerson.current = index)}
                            onDragEnd={handleSort}
                            onDragOver={(e) => e.preventDefault()}>
                                <p>{nominee.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
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