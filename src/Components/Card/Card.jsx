import styles from "./Card.module.css";
import imagePlaceHolder from "../../imgs/place_holder.png";

const Card = () => {
  return (
    <div className={styles.card__container}>
      <img
        src={imagePlaceHolder}
        alt="Place holder"
        className={styles.placeholder}
      />
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipi- scing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua
      </p>
    </div>
  );
};

export default Card;
