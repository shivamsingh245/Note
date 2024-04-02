import classes from './styles.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={classes.header}>
      <h1>MERN NOTE APP</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-note">Add Note</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header;