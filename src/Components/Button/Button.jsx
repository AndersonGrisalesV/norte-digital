import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({
  onButtonName = null,
  onRemoveSale = null,
  onAddSale = false,
  onSave = false,
  onDisable = false,
  onPlusHandleClient = null,
}) => {
  const navigate = useNavigate();

  const handleClickOption = () => {
    if (onButtonName) {
      navigate("/dashboard");
    } else if (onAddSale) {
      onAddSale();
    } else if (onRemoveSale) {
      onRemoveSale();
    } else if (onPlusHandleClient) {
      onPlusHandleClient();
    }
  };

  const buttonStyle = onDisable ? { backgroundColor: "#ccc" } : {};

  return (
    <button
      className={
        onPlusHandleClient || onRemoveSale
          ? styles.button__plus
          : onAddSale || onSave
          ? styles.button__add
          : styles.button
      }
      style={buttonStyle}
      onClick={handleClickOption}
      disabled={onDisable || false}
    >
      {onButtonName
        ? onButtonName
        : onPlusHandleClient
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
