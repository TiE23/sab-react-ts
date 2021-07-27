import React, { useState } from "react";
import { NewItemFormContainer, NewItemButton, NewItemInput } from "./styles";
import { useFocus } from "./utils/useFocus";

type NewItemFormProps = {
  onAdd(text: string): void,
};

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // You can find more about synthetic events in React (like keyboard events)
    // here: https://reactjs.org/docs/events.html
    // Further, you can read into KeyboardEvent's available properties with
    // some alt-clicking, like usual!
    if (event.key === "Enter") {
      onAdd(text);
    }
  };

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={handleAddText}
      />
      <NewItemButton onClick={() => {
        onAdd(text);
      }}>
        Create
      </NewItemButton>
    </NewItemFormContainer>
  );
};
