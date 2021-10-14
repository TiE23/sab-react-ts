import styled from "styled-components";

/**
 * We keep them in the same file because Next requires all the pages to export
 * by default a component that is a page. So we cannot create, say, a directory
 * 404 with file 404/style.ts and extract the styles in that file. If we do that
 * while building a project we will get an error.
 *
 * We could extract them in some kind of shared code, but since the styles code
 * is not huge we can keep it here just to gather everything about this page in
 * one place.
 */

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Main = styled.h2`
  font-size: 10rem;
  line-height: 11rem;
  font-family: ${(p) => p.theme.fonts.accent};
  width: 100%;
`;

const NotFound = () => {
  return (
    <Container>
      <Main>404</Main>
      Oops! The page is not found!
    </Container>
  );
};

export default NotFound;
