import { useEffect } from "react";
import { usePosts } from "../context/postContext";
import { VscEmptyWindow } from 'react-icons/vsc'
import { PostCardUser } from "../components/PostCardUser";

export function HomePageUser() {
    const { posts, getAllPost } = usePosts();
    
    useEffect(() => {
        getAllPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   
    if (!Array.isArray(posts)) {
        return (
            <div className='flex flex-col justify-center items-center'>
                <VscEmptyWindow className='w-48 h-48 text-white'/>
                <h1 className='text-white text-2xl'> There are no posts</h1>
            </div>
        );
    }
    
   

    return (
        <main className="flex flex-row flex-wrap justify-center items-center">
          {posts.map((post) => (
            <article key={post._id} className="m-4">
              <PostCardUser post={post} />
            </article>
          ))}
        </main>
        
      );
    }
