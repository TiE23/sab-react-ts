import { CardContainer } from "./styles"

type CardProps = {
  text: string,
};

export const Card = (props: CardProps) => {
  return (
    <CardContainer>{props.text}</CardContainer>
  );
}
