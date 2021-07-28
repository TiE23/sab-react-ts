import { CardContainer } from "./styles"

type CardProps = {
  text: string,
  id: string,
};

export const Card = (props: CardProps) => {
  return (
    <CardContainer>{props.text}</CardContainer>
  );
}
