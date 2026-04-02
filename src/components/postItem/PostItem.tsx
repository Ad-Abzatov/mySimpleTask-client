import { FC } from "react";

interface PostItemProps {
  title: string;
  subPosts?: {
    id: number;
    title: string;
  }[];
}

const PostItem: FC<PostItemProps> = ({title, subPosts}) => {
  return (
    <div>
      <div>
        {title}
      </div>
      <div>
        {subPosts?.map(subPost => <div key={subPost.id}>{subPost.title}</div>)}
      </div>
    </div>
  )
}

export default PostItem
