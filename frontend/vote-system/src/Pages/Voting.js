import React from 'react'
import { useState, useRef } from 'react';
import { themeBackground } from '../constants';
import { themeHighlight } from '../constants';

export default function Voting() {
    // Getting code from URL
    const url_get = 'http://localhost:5000/get_election'
    const url_post = 'http://localhost:5000/create_voter'
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code')

    // Defining useStates
    const [nominees, setNominees] = useState([])
    var [text, setText] = useState('');
    const [formData, setForm] = useState({
        name: '',
        email: '',
        studentId: ''
    });

    // Fetching Nominee Data
    const requestOptions = {
        method: 'GET',
    };

    fetch(url_get + '?election_id=' + code, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response not ok");
        }
        return response.json();
    }).then(data => {
        console.log(data);
        setNominees(data.nominees);
    }).catch(error => {
        console.error('Error', error);
    })

    // Get positions
    var positions = []
    for (let i=0;i<nominees.length;i++) {
        if (!positions.includes(nominees[i].position)) {
            positions.push(nominees[i].position);
        }
    }

    const dragPerson = useRef(0)
    const draggedOverPerson = useRef(0)

    const changeForm = (e) => {
        const {name, value} = e.target;
        setForm(prevState => ({
            ...prevState, 
            [name]: value
        }));
    }

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
        // Compiling nominee scores
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

        // Compiling final information for submission
        var return_vote = {...formData };
        return_vote.nominees = return_nominees;

        console.log(return_vote);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(return_vote)
        };
        fetch(url_post, requestOptions).then(response => response.json());
    }
  return (
    <div style={wrapperStyle}>
        <h2>Enter Information</h2>
        <div style={formContainerStyle}>
            <label htmlFor="" style={formStyle.label}>
                Name:
                <input style={formStyle.input} name="name" type="text" value={formData.name} onChange={changeForm}/>
            </label>
            <label htmlFor="" style={formStyle.label}>
                Email:
                <input style={formStyle.input} name="email" type="text" value={formData.email} onChange={changeForm}/>
            </label>
            <label htmlFor="" style={formStyle.label}>
                Student ID:
                <input style={formStyle.input} name= "studentId" type="text" value={formData.studentId} onChange={changeForm}/>
            </label>
        </div>
        <h2>Vote for Candidates</h2>
        <div className='candidates-list'>
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
        <input type="submit" style={formStyle.submit} onClick={submit}/>
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

const styles = {
    container: {
        backgroundColor: themeBackground,
    }
};

const formContainerStyle = {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '20rem',
    margin: 'auto',
    marginTop: '2rem',
    gap: '0.5rem',
}

const formStyle = {
    input: {
        marginTop: '0.5rem',
        width: '70%',
        height: '2rem',
        fontSize: '1rem',
        textAlign: 'center',
        marginBottom: '0.5rem',
        marginLeft: '0.5rem',
        borderRadius: '30px',
    },
    label: {
        wdith: '100%',
        fontSize: '20px'
    },
    submit: {
        backgroundColor: themeHighlight,
        height: '2.5rem',
        border: 0,
        outline: 0,
        border: '0.05rem solid white',
        borderRadius: '20px',
        fontSize: '1rem',
        color: 'white',
        fontFamily: 'Roboto',
        width: '50%',
    }
}