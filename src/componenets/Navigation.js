import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/P1">Page 1</Link>
        </li>
        <li>
          <Link to="/P2">Page 2</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;