import Link from "next/link";
import { Post } from "../../shared/types";
import { Title, Figure, Content, Meta } from "./PostBodyStyle";

type PostBodyProps = {
  post: Post,
};

export const PostBody = ({ post }: PostBodyProps) => {
  return (
    <div>
      <Title>{post.title}</Title>
      <Figure>
        <img src={post.image} alt={post.title} />
      </Figure>
      {/* Don't use this dangerous thing in real life. This is just practice. */}
      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      <Meta>
        <span>{post.date}</span>
        <span>&middot;</span>
        <Link href={`/category/${post.category}`}>
          <a>{post.source}</a>
        </Link>
      </Meta>
    </div>
  );
}
