import React from 'react';

function Header(props) {
    return (
        <div className='nav-container'>
            <div className='nav-bar'>
                <h3 className='nav-text' onClick={props.onClick}>
                    {props.text}
                </h3>
                <img src={require('../assets/logos/no-border.png')} className='nav-logo' />
            </div>
        </div>
    );
}

export default Header;
