import { useEffect } from "react";
import { usePosts } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { PostCard } from "../components/PostCard";

export function HomePage() {
  const { posts, getAllPost } = usePosts();

  useEffect(() => {
    getAllPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (posts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <VscEmptyWindow className="w-48 h-48 text-white"/>
        <h1 className="text-white text-2xl">There are no posts</h1>
      </div>
    );
  }

 

  return (
    <main className="flex flex-row flex-wrap ">
      {posts.map((post) => (
        <article key={post._id} className="m-4 ">
          <PostCard post={post} />
        </article>
      ))}
    </main>
  );
}
