import { useState } from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RouteSwitch from "./views/RouteSwitch";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [posts, setPosts] = useState();
  const [allComments, setAllComments] = useState();

  const options = {
    method: "GET",
  };

  const api = process.env.REACT_APP_API_ENDPOINT;

  //To get all posts
  async function getBlogPosts() {
    try {
      const getPosts = await fetch(`${api}/posts`, options);

      const postInfo = await getPosts.json();
      console.log(postInfo);
      setPosts(postInfo);
    } catch (error) {
      console.log(error);
    }
  }

  //To get all comments
  async function getAllComments() {
    try {
      const getComments = await fetch(`${api}/comments`, options);

      const commentInfo = await getComments.json();
      setAllComments(commentInfo);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <HashRouter basename="/">
      <div className="App">
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <RouteSwitch
          api={api}
          posts={posts}
          allComments={allComments}
          isDarkMode={isDarkMode}
          getBlogPosts={getBlogPosts}
          getAllComments={getAllComments}
        />
        <Footer isDarkMode={isDarkMode} />
      </div>
    </HashRouter>
  );
}

export default App;
