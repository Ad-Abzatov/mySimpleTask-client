import React, { FC, useState } from "react";
import KebabMenu, { MenuItem } from "../kebabMenu/KebabMenu";
import "./PostRecord.css"

interface PostRecordProps {
  id: number;
  title: string;
  updPost: (id: number, title: string) => Promise<void>;
  delPost: (id: number) => Promise<void>;
  isSelected?: boolean;
  onSelect?: () => void;
  subPosts?: {
    id: number;
    title: string;
  }[];
  canSelect?: boolean;
}

const PostRecord: FC<PostRecordProps> = ({
  title,
  id,
  updPost,
  delPost,
  isSelected = false,
  onSelect,
  subPosts = [],
  canSelect = true,
}) => {

  const [showSubtasks, setShowSubtasks] = useState(false);
  const hasSubtasks = subPosts && subPosts.length > 0;

  const toggleSubtasks = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSubtasks(!showSubtasks);
  };

  const handleSubtaskClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  const handleUpd = () => {
    updPost(id, title);
  };
  const handleDel = () => {
    delPost(id);
  };

  const menuItems: MenuItem[] = [
    {label: 'Изменить', onClick: () => updPost(id, title)},
    {label: 'Удалить', onClick: () => delPost(id)}
  ];

  return (
    <div className="PostCard">
      <div className="PostContent" onClick={canSelect ? onSelect : undefined}>
        {hasSubtasks && (
          <button onClick={toggleSubtasks} aria-label={showSubtasks ? 'Свернуть' : 'Развернуть'}>
            <span>▶</span>
          </button>
        )}

        <span>{title}</span>

        {hasSubtasks && (
          <span>({showSubtasks ? subPosts.length : subPosts.length})</span>
        )}
      </div>
      <div className="PostActions">
        <KebabMenu items={menuItems} />
      </div>
      {hasSubtasks && (
        <div className="subtasks-container">
          <div className="subtasks-content">
            {subPosts.map(sub => (
              <div key={sub.id} onClick={handleSubtaskClick}>
                <span>.</span>
                <span>{sub.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostRecord
