import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProfileDark from "../assets/profile-dark.png";
import Avatar from "../assets/avatar.png";
import ShareIcon from "../assets/share.png";
import ShareIconDark from "../assets/shareD.png";
import { Waveform } from "@uiball/loaders";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

function PostPage(props) {
  //For Form fields
  const [name, setName] = useState("");
  const [commentText, setcommentText] = useState("");
  const [message, setMessage] = useState("");

  const [post, setPost] = useState();
  const [postDate, setPostDate] = useState();
  const [comments, setComments] = useState();
  const [currentComments, setCurrentComments] = useState();

  // const { post, getPost, getComments, comments} = props;

  const { api } = props;

  const { isDarkMode } = props;

  let { id } = useParams();

  useEffect(() => {
    //Get specific post
    async function getPost() {
      try {
        const reqPost = await fetch(`${api}/posts/${id}`);

        if (reqPost.status !== 200) return;

        const postJson = await reqPost.json();
        setPost(postJson);

        const date = new Date(postJson.date);
        const month = date.toLocaleString("default", {
          month: "short",
        });
        const day = date.getDate();
        const blogPostDate = `${month} ${day}`;

        setPostDate(blogPostDate);
      } catch (err) {
        console.log(err);
      }
    }
    getPost();

    //Get post-specific comments
    async function getPostComments() {
      try {
        const reqComments = await fetch(`${api}/posts/${id}/comments`);

        if (reqComments.status !== 200) return;
        const commentsJson = await reqComments.json();
        setComments(commentsJson);
        setCurrentComments(commentsJson);
      } catch (err) {
        console.log(err);
      }
    }
    getPostComments();
  }, [id]);

  async function submitComment(e) {
    e.preventDefault();
    try {
      const req = await fetch(`${api}/posts/${id}/comments`, {
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
      // let resJson = await req.json();
      if (req.status === 200) {
        setName("");
        setcommentText("");
        setMessage("Sucessful!");
        window.location.reload();
      } else {
        setMessage("Some error occured");
      }
      // reset();
    } catch (err) {
      console.log(err);
    }
  }

  //To copy link to clipboard and show notification
  function copy() {
    navigator.clipboard.writeText(window.location.href);
    document.getElementById("custom-tooltip").style.display = "inline";
    setTimeout(function () {
      document.getElementById("custom-tooltip").style.display = "none";
    }, 1000);
  }

  return (
    <div className="post-page container">
      {post ? (
        <div className="content-container">
          <div className="author-box">
            <div className="author-profile">
              <div className="left">
                <img src={Avatar} alt="Laptop Clip Art" />
              </div>

              <div className="right">
                <div className="top">{post.user.author}</div>
                <div className="bottom">
                  <div className="date">{postDate}</div>
                </div>
              </div>
            </div>
            <div className="share-links">
              <div style={{ marginRight: "12px" }}></div>

              <div title="Copy link">
                {/* <div className="button-tooltip-container"> */}
                <button type="button" onClick={() => copy()}>
                  {/* <div className="copy-link"> */}
                  {/* <div className="image"> */}
                  <img
                    src={isDarkMode ? ShareIconDark : ShareIcon}
                    alt="copy link"
                  />

                  <span id="custom-tooltip">Copied!</span>
                  {/* </div> */}
                </button>
              </div>

              {/* <textarea className="visuallyhidden" id="box"></textarea> */}

              <div title="Share to Twitter">
                <TwitterShareButton
                  title={`${post.title} by ${post.author}:`}
                  url={window.location.href}
                >
                  <TwitterIcon />
                </TwitterShareButton>
              </div>

              <div title="Share to Facebook">
                <FacebookShareButton url={window.location.href}>
                  <FacebookIcon />
                </FacebookShareButton>
              </div>

              <div title="Share to LinkedIn">
                <LinkedinShareButton url={window.location.href}>
                  <LinkedinIcon
                    title={`${post.title} by ${post.author}:`}
                    url={window.location.href}
                  />
                </LinkedinShareButton>
                {/* </div> */}
              </div>
            </div>
          </div>

          <section className="post-container">
            <h1 className="post-title">{post.title}</h1>

            <div className="image-box">
              <Link to={`/posts/${post._id}`}>
                <img
                  src={require(`../assets/${post.image}`)}
                  alt="Laptop with scenic background"
                />
              </Link>
            </div>

            <article>
              {/* <HashLink to="#comments">Link to Comments</HashLink> */}
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

          <section className="comments-container" id="comments">
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
                        <img src={ProfileDark} alt="avatar" />
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
              <div className="loading-animation" style={{ padding: "28px 0" }}>
                <Waveform color="#e85d04" />
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="loading-animation">
          <Waveform color="#e85d04" />
        </div>
      )}
    </div>
  );
}

export default PostPage;
