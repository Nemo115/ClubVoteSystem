import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { themeBackground } from '../constants';
import { themeHighlight } from '../constants';

export function VerifyPage() {
    // Getting code from URL
    const url = 'http://localhost:5000/update_voter'
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code')

    useEffect(() => {
        fetchData();
    }, []);

    // Defining useStates
    const [user, setUser] = useState({
        voter_name: ""
    })

    // Fetching Nominee Data
    const requestOptions = {
        method: 'PATCH',
    };

    const fetchData = () => {
        fetch(url + '/' + code, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response not ok");
            }
            return response.json();
        }).then(data => {
            console.log(data);
            setUser(data)
        }).catch(error => {
            console.error('Error', error);
        })
    }

  return (
    <div style={wrapperStyle}>
        <h2>Email Verified {user.voter_name}</h2>
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