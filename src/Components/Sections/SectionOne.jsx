import Button from "../Button/Button";
import styles from "./SectionOne.module.css";
import heroImage from "../../../src/imgs/hero_image.png";

const SectionOne = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__hero__content}>
        {/* Content Section */}
        <div className={styles.content}>
          <h1>Lorem ipsum Design</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipi- scing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <div className={styles.container__button}>
            <Button onButtonName={"LOGIN"} />
          </div>
        </div>

        {/* Hero Section */}
        <div className={styles.hero}>
          <img src={heroImage} alt="Hero" />
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
