import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comment from "../assets/comment.png";
import CommentDark from "../assets/comment-dark.png";
import Picture from "../assets/nomad.jpg";

function Posts(props) {
  const { posts, allComments, isDarkMode, getBlogPosts, getAllComments } =
    props;
  // const [posts, setPosts] = useState([]);
  // const [date, setDate] = useState("");
  // const options = {
  //   method: "GET",
  // };

  // useEffect(() => {
  //   async function getBlogPosts() {
  //     try {
  //       const getPosts = await fetch("http://localhost:8888/posts", options);

  //       const postInfo = await getPosts.json();
  //       console.log(postInfo);
  //       setPosts(postInfo);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getBlogPosts();
  // });

  useEffect(() => {
    setTimeout(getBlogPosts, 1000);
    setTimeout(getAllComments, 1000);
  }, []);

  return (
    <div className="post container">
      {posts ? (
        <div>
          <h1>Posts</h1>
          {/* <button type="button" onClick={getBlogPosts}>
            Posts
          </button> */}
          <ul>
            {posts.map((post) => {
              const date = new Date(post.date);
              const month = date.toLocaleString("default", { month: "short" });
              const monthDate = `${month} ${date.getDate()}`;
              const comments = allComments
                ? allComments.filter((comment) => comment.post === post._id)
                    .length
                : null;

              return (
                <li key={post._id} className="post-box">
                  <div className="left">
                    <Link to={`/posts/${post._id}`}>
                      <h2>{post.title}</h2>
                    </Link>
                    <div className="bottom-row">
                      <div className="date">{monthDate}</div>
                      <div className="comment-count">
                        {isDarkMode ? (
                          <img
                            src={CommentDark}
                            alt="Comments"
                            title="Comments"
                          />
                        ) : (
                          <img src={Comment} alt="Comments" title="Comments" />
                        )}
                        <div>{comments}</div>
                      </div>
                    </div>
                  </div>
                  <div className="image-box">
                    <Link to={`/posts/${post._id}`}>
                      <img
                        src={require(`../assets/${post.image}`)}
                        alt="Laptop with scenic background"
                      />
                    </Link>
                  </div>
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
