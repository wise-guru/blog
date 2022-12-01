import { Route, Routes } from "react-router-dom";
import About from "./About";
import Homepage from "./Homepage";
import PostPage from "./PostPage";
import Posts from "./Posts";

function RouteSwitch() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route exact path="/posts" element={<Posts />}></Route>
      <Route path="/posts/:id" element={<PostPage />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  );
}

export default RouteSwitch;
