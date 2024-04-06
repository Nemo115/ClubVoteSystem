import { themeBackground, themeHighlight, title } from '../constants';
import './Components.css';
import logo from '../assets/logo.png';

const Header = () => 
{
    return (
        <header style={HeaderStyle.header}>
           <img style={HeaderStyle.logo} src={logo}></img>
           <p style={HeaderStyle.heading}>{title}</p>
           <nav style={HeaderStyle.menu} className='headerMenu'>
                <button onClick={() => window.location.href = '/'}>HOME</button>
                <button onClick={() => window.location.href = '/create'}>CREATE</button>
                <button >RESULTS</button>
           </nav>
        </header>
    )
}

const HeaderStyle = {
    header: {
        backgroundColor: themeHighlight,
        display: 'flex',
        height: '4rem',
        gap: '1rem',
        alignItems: 'center',
        paddingRight: '2rem',
    },
    logo: {
        height: '100%',
    },
    menu: {
        display: 'flex',
        marginLeft: 'auto',
        gap: '2rem',
    },
    heading: {
        fontSize: '1.5rem',
        color: 'white',
    }
}


const AboutItem = ({picture, heading, text}) => 
{
    return (
        <div style={AboutItemStyle.wrapper}>
            <div style={AboutItemStyle.text}>
                <h2 style={AboutItemStyle.itemHeading}>{heading}</h2>
                <p>{text}</p>
            </div>
            <img style={AboutItemStyle.picture} src={picture}></img>
        </div>
    )
}

const AboutItemStyle = {
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        gridTemplateColumns: '1fr 2rem',
        border: '0.1rem solid lightgrey',
        borderRadius: '1rem',
        width: '50rem',
        marginBottom: '2rem',
        overflow: 'hidden',
    },
    picture: {
        height: '10rem',
        width: '10rem',
        objectFit: 'cover',
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: '2rem',
    },
    itemHeading: {
        marginBottom: 0,
    }
}

const Footer = () => {
    return (
        <div style={FooterStyle.wrapper}></div>
    )
}

const FooterStyle = {
    wrapper: {
        width: '100%',
        backgroundColor: themeHighlight,
        height: '33vh',
    }
}

export {Header, AboutItem, Footer}