import React from 'react';

const Footer = ({ autherInfo }) => {
    return (
        <footer>
            <p>&copy; 2021 <a className='link' target='_blank' href={autherInfo[1]}>{autherInfo[0]}</a>. All Right resaved</p>
            <a className='link' href="#">About</a>
        </footer>
    )
}

export default Footer;
