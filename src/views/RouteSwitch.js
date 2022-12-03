import { Route, Routes } from "react-router-dom";
import About from "./About";
import Homepage from "./Homepage";
import PostPage from "./PostPage";
import Posts from "./Posts";

function RouteSwitch(props) {
  const {
    posts,
    post,
    allComments,
    comments,
    currentComments,
    isDarkMode,
    getBlogPosts,
    getAllComments,
    // getPost,
    // getPostComments,
  } = props;
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route
        exact
        path="/posts"
        element={
          <Posts
            posts={posts}
            allComments={allComments}
            isDarkMode={isDarkMode}
            getBlogPosts={getBlogPosts}
            getAllComments={getAllComments}
          />
        }
      ></Route>
      <Route
        path="/posts/:id"
        element={<PostPage isDarkMode={isDarkMode} />}
      ></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  );
}

export default RouteSwitch;
