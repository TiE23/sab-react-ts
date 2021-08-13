import styles from "./Footer.module.css";
// It's pointed out that using .css files is more performant. Otherwise, you're
// requiring the JS engine to parse the style of components and they have to
// make the CSS rules there. If you define CSS, well, that just works.

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <a href="http://newline.co/">Newline.co</a>
      <br />
      {currentYear}
    </footer>
  );
};
