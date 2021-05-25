import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, onAdd, showAddTask }) => {

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color={`${showAddTask === true ? 'darkRed':'green'}`} 
            text={`${showAddTask === true ? 'Hide':'Add'}`} onClick={onAdd}/>
        </header>
    )
}

Header.defaultProps = {
    title: 'this is a tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header;
