import { useState } from "react";
import hero from '../assets/hero.jpg';
import consistent from '../assets/consistent.jpg'
import easy from '../assets/easy.png'
import impartial from '../assets/impartial.png'
import { themeBackground, themeHighlight } from "../constants";
import { AboutItem, Footer } from "../Components/Components";

const HomePage = () => 
{
    var [code, setCode] = useState('');

    return (
        <div style={HomePageStyle.homeWrapper}>
            <div style={HomePageStyle.heroWrapper}>    
                <img style={HomePageStyle.hero} src={hero}></img>
                <div style={HomePageStyle.heroContentWrapper}>
                    <h1 style={HomePageStyle.heroHeading}>Get your elections done, easy.</h1>
                    <input placeholder="join code" style={HomePageStyle.joinCodeInput} onChange={(e) => setCode(e.target.value)}></input>
                    <button style={HomePageStyle.joinButton} onClick={() => window.location.href = '/voting?code=' + code}>JOIN</button>
                    <p style={HomePageStyle.orText}>Or,</p>
                    <button style={HomePageStyle.createButton} onClick={() => window.location.href = '/create'}>CREATE ELECTION</button>
                </div>
            </div>
            <h2>About</h2>
            <AboutItem heading={'Impartial'} text={'We provide centralised, fully automated election processes for clubs and student unions. As we handle everything programatically, there is no potential for corruption in our services. Votes are carefully verified, and de-identified.'} picture={impartial}/>
            <AboutItem heading={'Consistent'} text={'Having a centralised process all university clubs in an institution share for their elections ensures fairness and that everyone knows what to expect.'} picture={consistent}/>
            <AboutItem heading={'Easy'} text={'Elections are a hassle. We expose our API endpoints so elections can be seamlessly integrated into existing systems used to book AGMs'} picture={easy}/>
            <Footer />
        </div>
    )
}

const HomePageStyle = {
    homeWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heroWrapper: {
        height: '70vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
    },
    hero: {
        height: '70vh',
        width: '100%',
        objectFit: 'cover',
    },
    heroContentWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translateX(-50%)',
        width: 'max-content',
    },
    heroHeading: {
        color: 'white',
        fontSize: '3rem',
        marginBottom: 0,
    },
    joinCodeInput: {
        marginTop: '0.5rem',
        width: '100%',
        height: '3rem',
        fontSize: '2rem',
        textAlign: 'center',
        marginBottom: '0.5rem',
    },
    joinButton: {
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
    },
    createButton: {
        backgroundColor: themeHighlight,
        height: '2.5rem',
        border: '0.05rem solid white',
        outline: 'none',
        fontSize: '1rem',
        color: 'white',
        fontFamily: 'Roboto',
        padding: '0.5rem',
        borderRadius: '0.2rem',
    },
    orText: {
        color: 'white',
    },
}


export { HomePage }