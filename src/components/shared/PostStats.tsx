import { IPost } from "@/types";

type PostStatsProps = {
  post: IPost;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  return (
    <div className="flex justify-between item-center z-20">
      <div className="flex gap-2 mr-5">
        <img src="/assets/icons/liked.svg" alt="like" width={20} height={20} onClick={()=>{}} className="cursor-pointer" />
        <p className="small-medium lg:base-medium">1</p>
      </div>
      <div className="flex gap-2">
        <img src="/assets/icons/save.svg" alt="like" width={20} height={20} onClick={()=>{}} className="cursor-pointer" />

      </div>
    </div>
  );
};

export default PostStats;
