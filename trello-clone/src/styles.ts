import styled from "styled-components";

// Regular mode of using React's CSS props feature.
// const buttonStyles: React.CSSProperties = {
//   backgroundColor: "#5aac44",
//   borderRadius: "3px",
//   border: "none",
//   boxShadow: "none",
// };

const Button = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
`;

export const AppContainer = styled.div`
  align-items: flex-start;
  background-color: #3179ba;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 20px;
  width: 100%;
`;