import React, { useState } from 'react'
import { themeBackground } from '../constants';
import { themeHighlight } from '../constants';

export default function Voting() {
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

    function submit() {
        
    }
  return (
    <div>
        <h2>Voting Process</h2>
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