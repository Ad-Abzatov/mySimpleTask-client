import { FC } from "react";

interface SubPost {
  id: number;
  title: string;
}

interface PostRecordProps {
  id: number;
  title: string;
  updPost: (id: number, title: string) => Promise<void>;
  delPost: (id: number) => Promise<void>;
  subPost: SubPost[];
}

const PostRecord: FC<PostRecordProps> = ({title, id, updPost, delPost, subPost}) => {
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
            subPost?.length > 0 ? (
              subPost.map(subPost => (
            <div key={subPost.id}>{subPost.title}</div>
          ))
            ) : (
              <div>Пусто</div>
            )
          }
        </div>
      </div>
      <div className="PostActions">
        <button className="PostButton PostButtonEdit" onClick={handleUpd}>Изменить</button>
        <button className="PostButton PostButtonDel" onClick={handleDel}>Удалить</button>
      </div>
    </div>
  )
}

export default PostRecord
