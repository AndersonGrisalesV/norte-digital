import styles from "./SectionThree.module.css";
import leftImage from "../../imgs/image_left_right.png";
import centerImage from "../../imgs/image_center.png";
import rightImage from "../../imgs/image_left_right.png";

const SectionThree = () => {
  return (
    <div className={styles.background} id="content2">
      <div className={styles.container}>
        {/* Content Section */}
        <div className={styles.content}>
          <h1>Content 2</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipi- scing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
      </div>
      <div className={styles.images__container}>
        <img src={leftImage} alt="left image" className={styles.image} />
        <img src={centerImage} alt="center image" className={styles.image} />
        <img src={rightImage} alt="right image" className={styles.image} />
      </div>
    </div>
  );
};

export default SectionThree;
