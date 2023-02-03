import { useEffect } from "react";
import { Link } from "react-router-dom";
import Comment from "../assets/comment.png";
import CommentDark from "../assets/comment-dark.png";
import { HashLink } from "react-router-hash-link";
import { Waveform } from "@uiball/loaders";

function Posts(props) {
  const { posts, allComments, isDarkMode, getBlogPosts, getAllComments } =
    props;

  useEffect(() => {
    getBlogPosts();
    getAllComments();
  }, []);

  return (
    <div className="post-list container">
      {posts ? (
        <div className="all-posts">
          <h1>Posts</h1>
          <ul>
            {posts.map((post) => {
              const date = new Date(post.date);
              const month = date.toLocaleString("default", { month: "short" });
              const postDate = `${month} ${date.getDate()}`;
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
                      <div className="date">{postDate}</div>
                      <div className="comment-count">
                        <HashLink to={`/posts/${post._id}#comments`}>
                          {isDarkMode ? (
                            <img
                              src={CommentDark}
                              alt="Comments"
                              title="Comments"
                            />
                          ) : (
                            <img
                              src={Comment}
                              alt="Comments"
                              title="Comments"
                            />
                          )}
                        </HashLink>
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
        <div className="loading-animation" style={{ height: "90vh" }}>
          <Waveform color="#e85d04" />
        </div>
      )}
    </div>
  );
}

export default Posts;
