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
                <button>HOME</button>
                <button >ABOUT</button>
                <button >CREATE</button>
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


export {Header}