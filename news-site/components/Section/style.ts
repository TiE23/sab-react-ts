import styled from "styled-components";

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  /* This is SASS syntax. & means this div.
     It's used here to solve this alignment issue:
     https://stackoverflow.com/questions/18744164/flex-box-align-last-row-to-grid
  */
  &:after {
    content: "";
    flex: auto;
  }

  /* Rule nesting is pretty cool.
     https://styled-components.com/docs/faqs#can-i-nest-rules
  */
  &:after,
  & > * { /* All direct children of this div. */
    width: calc(33% - 10px);
    margin-bottom: 20px;
  }

  @media (max-width: 800px) {
    &:after,
    & > * {
      width: 100%;
    }
  }
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  line-height: 1.1;
  margin: 10px 0 15px;

  @media (max-width: 800px) {
    font-size: 2rem;
  }
`;

export const MoreLink = styled.a`
  margin: -20px 0 30px;
  display: inline-block;
  vertical-align: top;
`;
