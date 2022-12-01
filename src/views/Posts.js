import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const options = {
    method: "GET",
  };

  useEffect(() => {
    async function getBlogPosts() {
      try {
        const getPosts = await fetch("http://localhost:8888/posts", options);

        const postInfo = await getPosts.json();
        console.log(postInfo);
        setPosts(postInfo);
      } catch (error) {
        console.log(error);
      }
    }
    getBlogPosts();
  });

  return (
    <div className="container">
      {posts ? (
        <div>
          <h1>Posts</h1>
          {/* <button type="button" onClick={getBlogPosts}>
            Posts
          </button> */}
          <ul>
            {posts.map((post) => {
              return (
                <li key={post._id}>
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Posts;
