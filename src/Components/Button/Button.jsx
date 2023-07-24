import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({
  onButtonName = null,
  onRemoveSale = null,
  onAddSale = false,
  onSave = null,
  onDisable = false,
  onPlusHandleClient = null,
  onCloseInvoiceSale = null,
  onSaleList = null,
  onCloseSaleList = null,
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
    } else if (onSave) {
      onSave();
    } else if (onCloseInvoiceSale) {
      onCloseInvoiceSale();
    } else if (onSaleList) {
      onSaleList();
    } else if (onCloseSaleList) {
      onCloseSaleList();
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
        ? "Save"
        : onCloseInvoiceSale
        ? "Close"
        : onSaleList
        ? "Sales"
        : onCloseSaleList
        ? "Go back"
        : ""}
    </button>
  );
};

export default Button;
