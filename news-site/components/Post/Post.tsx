import { Card, Figure, Title, Content } from "./style";
import Link from "next/link";

export const Post = () => {
  return (
    // passHref is necessary because we don't give <Link> an <a> element.
    <Link href="/post/example" passHref>
      <Card>
        <Figure>
          {/* Next.js serves stuff from the public directory as root. */}
          <img alt="Post photo" src="/image1.jpg" />
        </Figure>
        <Title>Post title!</Title>
        <Content>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo odio corrupti totam voluptas? Deserunt unde vel eligendi impedit in pariatur voluptatibus, aliquam saepe mollitia animi tempore, consectetur nulla quis vitae!
          </p>
        </Content>
      </Card>
    </Link>
  );
};
