import styled from "styled-components";

// Regular mode of using React's CSS props feature.
// const buttonStyles: React.CSSProperties = {
//   backgroundColor: "#5aac44",
//   borderRadius: "3px",
//   border: "none",
//   boxShadow: "none",
// };

interface DragPreviewContainerProps {
  isHidden?: boolean,
  isPreview?: boolean,
};

// It's useful to see where this container style is used!
export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  transform: ${props => (props.isPreview ? "rotate(5deg)" : undefined)};
  opacity: ${props => (props.isHidden ? 0 : 1)};
`;

export const CustomDragLayerContainer = styled.div`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;
// pointer-events: none -> will ignore all mouse events
// z-index: 100 -> will be at the top

type DragPreviewWrapperProps = {
  position: {
    x: number,
    y: number,
  },
};

// This is a special styled component where it is instead affecting the attributes
// instead of simply the style. The thing is that this is necessary because
// styled-components generates a new CSS class for each variation encountered.
// To avoid this big performance overhead it will modify the component instead
// of generating a new class.
// https://styled-components.com/docs/api#attrs
export const DragPreviewWrapper = styled.div.attrs<DragPreviewWrapperProps>(
  ({ position: { x, y } }) => ({
    style: {
      transform: `translate(${x}px, ${y}px)`,
    },
  })
)<DragPreviewWrapperProps>``;


export const AppContainer = styled.div`
  align-items: flex-start;
  background-color: #3179ba;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 20px;
  width: 100%;
`;

// Wow! You extend a styled container by replacing the prop with a function call.
// https://styled-components.com/docs/api
// export const ColumnContainer = styled.div` // Before
export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #ebecf0;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0;
`;

export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
`;

export const CardContainer = styled(DragPreviewContainer)`
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
`;

type AddItemButtonProps = {
  dark?: boolean,
};

// Wow, holy shit. You can make styled components using a type like this!
export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${props => (props.dark ? "#000" : "#fff")};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover {
    backround-color: #ffffff52;
  }
`;

export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

export const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
`;

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`;
