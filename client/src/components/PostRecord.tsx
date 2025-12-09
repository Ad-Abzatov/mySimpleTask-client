import { FC } from "react";

interface PostRecordProps {
  title: string;
  id: number;
  updPost: (id: number, title: string) => Promise<void>;
  delPost: (id: number) => Promise<void>;
}

const PostRecord: FC<PostRecordProps> = ({title, id, updPost, delPost}) => {
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
      </div>
      <div className="PostActions">
        <button className="PostButton PostButtonEdit" onClick={handleUpd}>Изменить</button>
        <button className="PostButton PostButtonDel" onClick={handleDel}>Удалить</button>
      </div>
    </div>
  )
}

export default PostRecord
