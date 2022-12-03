import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Profile from "../assets/profile.png";
import ProfileDark from "../assets/profile-dark.png";

function PostPage(props) {
  //For Form fields
  const [name, setName] = useState("");
  const [commentText, setcommentText] = useState("");
  const [message, setMessage] = useState("");

  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  // const [currentComments, setCurrentComments] = useState();

  // const { post, getPost, getComments, comments} = props;

  const { isDarkMode } = props;

  let { id } = useParams();

  useEffect(() => {
    // document.title = `${props.title}` || "Coding Guru"

    async function getPost() {
      try {
        const reqPost = await fetch(`http://localhost:8888/posts/${id}`);

        if (reqPost.status !== 200) return;

        const postJson = await reqPost.json();
        setPost(postJson);
      } catch (err) {
        console.log(err);
      }
    }
    getPost();

    async function getPostComments() {
      try {
        const reqComments = await fetch(
          `http://localhost:8888/posts/${id}/comments`
        );

        // console.log(id);

        if (reqComments.status !== 200) return;

        const commentsJson = await reqComments.json();
        setComments(commentsJson);
        // setCurrentComments(commentsJson);
      } catch (err) {
        console.log(err);
      }
    }
    getPostComments();
  }, []);

  async function submitComment(e) {
    e.preventDefault();
    // setCurrentComments([...currentComments, data]);
    // setComments([...comments, data]);

    // const formData = JSON.stringify(data);
    try {
      const req = await fetch(`http://localhost:8888/comments`, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          post: post,
          text: commentText,
          date: new Date(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let resJson = await req.json();
      if (req.status === 200) {
        setName("");
        setcommentText("");
        setMessage("Sucessful!");
        console.log();
      } else {
        setMessage("Some error occured");
      }
      // reset();
    } catch (err) {
      console.log(err);
    }
  }

  // const product =
  return (
    <div className="post-page container">
      {post ? (
        <div className="content-container">
          <section className="post-container">
            <div>
              <h1>{post.title}</h1>
              <div>{post.user.username}</div>
            </div>

            <div className="image-box">
              <Link to={`/posts/${post._id}`}>
                <img
                  src={require(`../assets/${post.image}`)}
                  alt="Laptop with scenic background"
                />
              </Link>
            </div>

            <article>
              <div className="post-text">{post.text}</div>
            </article>
          </section>

          <section className="comment-form-container">
            <form onSubmit={submitComment}>
              <div className="field">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="commentText">Comment:</label>
                <textarea
                  name="commentText"
                  onChange={(e) => setcommentText(e.target.value)}
                ></textarea>
              </div>

              {/* <div className="field"></div> */}
              <button type="submit">Submit comment</button>
              <div className="error-message">
                {message ? <p>{message}</p> : null}
              </div>
            </form>
          </section>

          <section className="comments-container">
            <h1>Comments</h1>
            {comments ? (
              comments.map((comment) => {
                const date = new Date(comment.date);
                const month = date.toLocaleString("default", {
                  month: "short",
                });
                const day = date.getDate();

                const year = date.getFullYear();
                const newDate = `${month} ${day}, ${year}`;

                return (
                  <div className="comment-box" key={comment._id}>
                    <div className="comment-top">
                      <div className="left">
                        {isDarkMode ? (
                          <img src={ProfileDark} alt="avatar" />
                        ) : (
                          <img src={Profile} alt="avatar" />
                        )}
                      </div>
                      <div className="right">
                        <p>{comment.name}</p>
                        <p className="date" title={comment.date}>
                          {newDate}
                        </p>
                      </div>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
          </section>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default PostPage;
