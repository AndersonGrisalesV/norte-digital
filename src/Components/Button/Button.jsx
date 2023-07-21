import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({
  onButtonName = null,
  onPlusClient = false,
  onRemoveSale = false,
  onAddSale = false,
  onSave = false,
}) => {
  const navigate = useNavigate();

  const handleClickOption = () => {
    if (onButtonName) {
      navigate("/dashboard");
    } else if (onAddSale) {
      onAddSale();
    }
  };

  return (
    <button
      className={
        onPlusClient || onRemoveSale
          ? styles.button__plus
          : onAddSale || onSave
          ? styles.button__add
          : styles.button
      }
      onClick={handleClickOption}
    >
      {onButtonName
        ? onButtonName
        : onPlusClient
        ? "+"
        : onRemoveSale
        ? "x"
        : onAddSale
        ? "Add"
        : onSave
        ? onSave
        : ""}
    </button>
  );
};

export default Button;
