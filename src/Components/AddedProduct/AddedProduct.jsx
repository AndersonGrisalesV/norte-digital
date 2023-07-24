import Button from "../Button/Button";
import styles from "./AddedProduct.module.css";

const AddedProduct = ({ name, quantity, price, subtotal, onRemove = null }) => {
  return (
    <div className={styles.container__details__inputs}>
      <div className={styles.container__name__input}>
        <div className={styles.container__name__text}>
          <input id="name" value={name} type="text" disabled />
        </div>
      </div>
      <div className={styles.container__quantity__input}>
        <div className={styles.container__quantity__text}>
          <input
            id="quantity"
            value={quantity}
            type="number"
            inputMode="numeric"
            disabled
          />
        </div>
      </div>

      <div className={styles.container__price__input}>
        <div className={styles.container__price__text}>
          <input id="price" value={price} type="number" disabled />
        </div>
      </div>

      <div className={styles.container__subtotal__input}>
        <div className={styles.container__subtotal__text}>
          <input id="subtotal" value={subtotal} type="text" disabled />
        </div>
      </div>
      <div className={styles.container__button__remove}>
        <Button onRemoveSale={onRemove} />
      </div>
    </div>
  );
};

export default AddedProduct;
