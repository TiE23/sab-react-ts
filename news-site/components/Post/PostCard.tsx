import Link from "next/link";
import Image from "next/image";
import { Post as PostType } from "../../shared/types";
import { Card, Figure, Title, Lead } from "./PostCardStyle";

type PostProps = {
  post: PostType,
};

export const PostCard = ({ post }: PostProps) => {
  /**
   * The sizes prop is a way for us to talk to the browser and tell it that we
   * already know what image is the best option for a given viewport. Let's
   * review its value to understand how it works:
   *
   * The string contains 2 records divided by a comma. The first one contains a
   * media-query and a number, the last one contains only a number. The
   * media-query specifies the viewport constraint as it does in CSS. The
   * following number is the width of an image that best fits.
   *
   * Here we mean that whenever the viewport is bigger than 1000px we want the
   * browser to load an image with a width of 320px. Why? Because our preview
   * card is about 300px wide itself at this point and we don't need a 1600px
   * wide image.
   *
   * Otherwise, load whatever suits the whole viewport width. Why? Because when
   * the viewport is less than 1000px our layout becomes a column where a card
   * takes 100% of the container's width.
   *
   * ⭐️ The order of sizes records matters. The browser will take only the first
   * matching media-query and use it. That's why the default value should be last.
   */
  return (
    // passHref is necessary because we don't give <Link> an <a> element.
    <Link href={`/post/${post.id}`} passHref>
      <Card>
        <Figure>
          <Image
            alt={post.title}
            src={post.image}
            loading="lazy"
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
            width={320}
            height={180}
            sizes="(min-width: 1000px) 320px, 100vw"
          />
        </Figure>
        <Title>{post.title}</Title>
        <Lead>{post.lead}</Lead>
      </Card>
    </Link>
  );
};
