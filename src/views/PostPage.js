import { useEffect, useState } from "react";
import { useFormAction, useParams } from "react-router-dom";

function PostPage() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [currentComments, setCurrentComments] = useState();
  // const { register, reset, handleSubmit } = useFormAction();

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

    async function getComments() {
      try {
        const reqComments = await fetch(
          `http://localhost:8888/posts/${id}/comments`
        );

        // console.log(id);

        if (reqComments.status !== 200) return;

        const commentsJson = await reqComments.json();
        setComments(commentsJson);
        setCurrentComments(commentsJson);
      } catch (err) {
        console.log(err);
      }
    }
    getComments();
  });

  // const product =
  return (
    <div className="container">
      {post ? (
        <div className="content-container">
          <section className="post-container">
            <div>
              <h1>{post.title}</h1>
              <div>{post.user.username}</div>
            </div>
            <article>
              <div>{post.text}</div>
            </article>
          </section>

          <section className="comments-container">
            {comments ? (
              comments.map((comment) => {
                return (
                  <div>
                    <div>{comment.name}</div>
                    <div>{comment.text}</div>
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
