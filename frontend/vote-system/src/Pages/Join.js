import React from 'react'
import '../constants'
import { themeBackground } from '../constants';
import { themeHighlight } from '../constants';
import { useState } from 'react';

export default function Join() {

    const ip = "http://api.codebrew.caillin.net/create_voter"

    var [text, setText] = useState('');
    const [formData, setForm] = useState({
        name: '',
        email: '',
        studentId: ''
    });
    const changeForm = (e) => {
        const {name, value} = e.target;
        setForm(prevState => ({
            ...prevState, 
            [name]: value
        }));
    }

    const submit = (e) => {
        console.log(formData)

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        };
        console.log(requestOptions)
        fetch(ip, requestOptions).then(response => response.json());
    }

  return (
    <div style={styles.container}>
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
            <input style={formStyle.submit}     type="submit" onClick={submit}/>
        </div>
    </div>
  )
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
    submit: {
        backgroundColor: themeHighlight,
        height: '2.5rem',
        border: 0,
        outline: 0,
        border: '0.05rem solid white',
        borderRadius: '0.2rem',
        fontSize: '1rem',
        color: 'white',
        fontFamily: 'Roboto',
        width: '50%',
    }
}