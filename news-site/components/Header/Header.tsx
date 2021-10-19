import Link from "next/link";
import { Center } from "../Center";
import { Container, Logo } from "./style";

export const Header = () => {
  return (
    <Container>
      <Center>
        <Logo>
          <Link href="/">
            {/*
              This <a> is important. Required for next/link to work.
              But if that's not an option, this is a work-around:
              https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
            */}
            <a>What's Next?!</a>
          </Link>
        </Logo>
      </Center>
    </Container>
  );
};
