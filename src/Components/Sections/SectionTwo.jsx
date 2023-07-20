import Card from "../Card/Card";
import styles from "./SectionTwo.module.css";
// import heroImage from "../../../src/imgs/hero_image.png";

const SectionTwo = () => {
  return (
    <div className={styles.container} id="content1">
      {/* Content Section */}
      <div className={styles.content}>
        <h1>Content 1</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipi- scing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
      </div>

      <div className={styles.cards__container}>
        {/* Content Section */}

        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default SectionTwo;
