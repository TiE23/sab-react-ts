import Link from "next/link";
import Image from "next/image";
import { Post } from "../../shared/types";
import { Breadcrumbs } from "../Breadcrumbs";
import { Title, Figure, Content, Meta } from "./PostBodyStyle";

type PostBodyProps = {
  post: Post,
};

export const PostBody = ({ post }: PostBodyProps) => {
  /**
   * <Image /> notes:
   * Don't worry about width and height, our image will be responsive. We need
   * them for 2 reasons. First of all, they will help Next automatically figure
   * out the aspect ratio of an image. We won't need to use the padding-top
   * trick anymore!
   * Second, the width and height props reduce cumulative layout shift, because
   * they allocate the place for an image on a page. When the image is loaded it
   * doesn't push the content underneath down.
   *  - loading, tells the browser how to load an image. When it is set to lazy
   * the browser will wait until the image is in the viewport and load only then.
   *  - layout, tells Next how to scale an image when the viewport size changes.
   * We set it to responsive to make the image adapt to the size of its container
   * when it changes.
   *  - objectFit and objectPosition, basically, aliases for CSS properties we
   * used earlier. We can also use the `fixed` layout to fix image sizes or
   * `intrinsic` to make an image only scale down.
   */
  return (
    <div>
      <Breadcrumbs post={post} />
      <Title>{post.title}</Title>
      <Figure>
        <Image
          alt={post.title}
          src={post.image}
          loading="lazy"
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
          width={960}
          height={340}
        />
      </Figure>
      {/* Don't use this dangerous thing in real life. This is just practice. */}
      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      <Meta>
        <span>{post.date}</span>
        <span>&middot;</span>
        <Link href={`/category/${post.category}`}>
          <a>{post.category}</a>
        </Link>
        <span>&middot;</span>
        <a href={post.source}>Source</a>
      </Meta>
    </div>
  );
};
