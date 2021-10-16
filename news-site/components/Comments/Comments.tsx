import { Comment as CommentType, EntityId } from "../../shared/types";
import { Comment } from "../Comment";
import { Container, List, Item } from "./style";
import { CommentForm } from "../CommentForm";

type CommentProps = {
  post: EntityId,
  comments: CommentType[],
};

export const Comments = ({ post, comments }: CommentProps) => {
  return (
    <Container id="comments">
      <h3>Comments</h3>
      <List>
        {comments.map((comment) => (
          <Item key={comment.id}>
            <Comment comment={comment} />
          </Item>
        ))}
      </List>
      <CommentForm post={post} />
    </Container>
  );
};
