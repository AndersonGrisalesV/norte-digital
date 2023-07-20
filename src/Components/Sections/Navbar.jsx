import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  };

  return (
    <div className={styles.navbar__container}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link onClick={() => scrollToSection("content1")}>Content 1</Link>
          </li>
          <li>
            <Link onClick={() => scrollToSection("content2")}>Content 2</Link>
          </li>
          <li>
            <Link to="/dashboard">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
