import PropTypes from "prop-types"; // Import prop-types package
import styles from "./Button.module.css";

const Button = ({ onButtonName }) => {
  return <button className={styles.button}>{onButtonName}</button>;
};

export default Button;

// Add prop-type validation for the 'onButtonName' prop
Button.propTypes = {
  onButtonName: PropTypes.text,
};
