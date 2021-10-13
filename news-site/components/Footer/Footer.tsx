import { Center } from "../Center";
import { Container } from "./style";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <Center>
        {/* Don't use Link for links that leave the site like this. */}
        <a href="https://newline.co/">Newline.co</a> {currentYear}
      </Center>
    </Container>
  );
};
