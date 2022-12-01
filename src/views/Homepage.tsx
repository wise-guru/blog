import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <div>Homepage</div>
      <Link to={"/posts"}>
        <button>View posts</button>
      </Link>
    </div>
  );
}

export default Homepage;
