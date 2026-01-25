import { FC, useState } from "react";

interface PostRecordProps {
  id: number;
  title: string;
  updPost: (id: number, title: string) => Promise<void>;
  delPost: (id: number) => Promise<void>;
  subPosts?: {
    id: number;
    title: string;
  }[];
}

const PostRecord: FC<PostRecordProps> = ({title, id, updPost, delPost, subPosts}) => {
  const [showSubtasks, setShowSubtasks] = useState(false);

  const toggleSubtasks = () => {
    setShowSubtasks(!showSubtasks);
  };

  const handleUpd = () => {
    updPost(id, title);
  };
const handleDel = () => {
  delPost(id);
};

  return (
    <div className="PostCard">
      <div className="PostContent">
        {title}
        <div>
          {
            showSubtasks && subPosts && subPosts?.length > 0 &&
              subPosts.map(subPost =>
            <div key={subPost.id}>{subPost.title}</div>
              )
          }
        </div>
      </div>
      <div className="PostActions">
        <button className="PostButton PostButtonEdit" onClick={handleUpd}>Изменить</button>
        <button className="PostButton PostButtonDel" onClick={handleDel}>Удалить</button>
        <button onClick={toggleSubtasks}>{showSubtasks ? 'Скрыть' : 'Показать'}</button>
      </div>
    </div>
  )
}

export default PostRecord
