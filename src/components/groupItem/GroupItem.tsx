import { FC } from "react";

interface Group {
  id: number;
  title: string;
  posts: Post[];
}

interface Post {
  id: number;
  title: string;
}

const GroupItem: FC<Group> = (props) => {
  return (
    <div></div>
  )
}

export default GroupItem
