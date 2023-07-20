import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.navbar__container}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/content1">Content 1</Link>
          </li>
          <li>
            <Link to="/content2">Content 2</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
