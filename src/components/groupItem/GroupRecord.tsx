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

const GroupRecord: FC<Group> = ({title}) => {
  return (
    <div className="GroupRecord">
      <div className="Title">
        {title}
      </div>
    </div>
  )
}

export default GroupRecord
