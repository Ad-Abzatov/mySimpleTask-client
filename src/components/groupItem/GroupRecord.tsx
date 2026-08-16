import { FC } from "react";

interface Group {
  ungrouped: {
    id: number;
    title: string;
  },
  groups: {
    id: number;
    title: string;
    posts: Post[];
  }
}

interface Post {
  id: number;
  title: string;
}

const GroupRecord: FC<Group> = ({ungrouped, groups}) => {
  return (
    <div className="GroupRecord">
      <div className="ungroupedTitle">
        {ungrouped.title}
      </div>
      <div className="groupsTitle">
        {groups.title}
      </div>
    </div>
  )
}

export default GroupRecord
