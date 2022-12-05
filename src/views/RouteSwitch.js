import { Route, Routes } from "react-router-dom";
// import About from "./About";
import Homepage from "./Homepage";
import PostPage from "./PostPage";
import Posts from "./Posts";
import Privacy from "./Privacy";
import TermsAndConditions from "./TermsConditons";

function RouteSwitch(props) {
  const { posts, allComments, isDarkMode, getBlogPosts, getAllComments, api } =
    props;
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
        element={<PostPage isDarkMode={isDarkMode} api={api} />}
      ></Route>
      {/* <Route path="/about" element={<About />}></Route> */}
      <Route path="/privacy" element={<Privacy />}></Route>
      <Route
        path="/terms-and-conditions"
        element={<TermsAndConditions />}
      ></Route>
    </Routes>
  );
}

export default RouteSwitch;
