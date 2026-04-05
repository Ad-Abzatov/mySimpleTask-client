import { FC, useState } from "react";

interface PostItemProps {
  id: number | null;
  title: string;
  addSub: (postId: number | null, title: string) => Promise<void>;
  subPosts?: {
    id: number;
    title: string;
  }[];
}

const PostItem: FC<PostItemProps> = ({id, title, subPosts, addSub}) => {

  const [subTitle, setSubTitle] = useState('');

  const handleAddSub = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!subTitle.trim()) return;

    await addSub(id, title);
    setSubTitle('');
  }

  return (
    <div>
      <div>
        {title}
      </div>
      <div>
        {subPosts?.map(subPost => <div key={subPost.id}>{subPost.title}</div>)}
      </div>
      <div>
        <button onClick={handleAddSub}>Новая подзадача</button>
      </div>
    </div>
  )
}

export default PostItem
