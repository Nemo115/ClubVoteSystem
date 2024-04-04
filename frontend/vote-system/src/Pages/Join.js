import React from 'react'
import '../constants'
import { themeBackground } from '../constants';
import { useState } from 'react';

export default function Join() {
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
    }

  return (
    <div style={styles.container}>
        <h2>Enter Election Code: </h2>
        <div style={formContainerStyle}>
            <input style={formStyle} name="name" type="text" value={formData.name} onChange={changeForm}/>
            <input style={formStyle} name="email" type="text" value={formData.email} onChange={changeForm}/>
            <input style={formStyle} name= "studentId" type="text" value={formData.studentId} onChange={changeForm}/>
            <input type="submit" onClick={submit}/>
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
    margin: 'auto'
}

const formStyle = {
    width: '100%',
    marginBottom: '10px',
    borderRadius: '3px'
}