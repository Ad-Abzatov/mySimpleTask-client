import { FC, useState } from "react";
import "./PostItem.css"

interface PostItemProps {
  id: number;
  title: string;
  addSub: (postId: number, subTitle: string) => Promise<void>;
  subPosts?: {
    id: number;
    title: string;
  }[];
}

const PostItem: FC<PostItemProps> = ({id, title, subPosts, addSub}) => {

  const [subTitle, setSubTitle] = useState('');

  const handleAddSub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim()) {
      alert('Введите название подзадачи!');
      return;
    }

    try {
      await addSub(id, subTitle);
      setSubTitle('');
      console.log('Подзадача добавлена!');
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка добавления подзадачи');
    }
  }

  return (
    <div className="PostItem">
      <div className="Title">
        {title}
      </div>
      <ul>
        {subPosts?.map(subPost => <li key={subPost.id}>{subPost.title}</li>)}
      </ul>
      <form onSubmit={handleAddSub}>
        <input value={subTitle} onChange={(e) => setSubTitle(e.target.value)} required />
        <button type="submit">Новая подзадача</button>
      </form>
    </div>
  )
}

export default PostItem
