import { Link } from "react-router-dom";
import Developer from "../assets/vector.jpg";
import RubberDuck from "../assets/rubber-duck.jpg";
import SunDucks from "../assets/sun-ducks.avif";
import WaterDuck from "../assets/water-duck.jpeg";
import KiwaniDuck from "../assets/kiwani.jpg";
import { useEffect, useState } from "react";

function Homepage() {
  const sentences = [
    `The go-to blog for devs and rubber ducks alike.`,
    "Enjoy your stay!",
  ];
  const [delta, setDelta] = useState(100);
  const [isWriting, setIsWriting] = useState(true);
  const [text, setText] = useState("");
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let tick = setInterval(() => {
      writeOrDelete();
    }, delta);

    return () => {
      clearInterval(tick);
    };
  }, [text]);

  const writeOrDelete = () => {
    let index = loopNum % sentences.length;
    let fullText = sentences[index];
    let currentText = isWriting
      ? fullText.substring(0, text.length + 1)
      : fullText.substring(0, text.length - 1);

    setText(currentText);

    if (!isWriting) {
      setDelta((prev) => prev / 2);
    }
    if (!isWriting && currentText === "") {
      setIsWriting(true);
      setLoopNum((prev) => prev + 1);
      setDelta(100);
    }
    if (isWriting && currentText === fullText) {
      setIsWriting(false);
      setDelta(2000);
    }
  };
  return (
    <div className="homepage container">
      <section className="main-image-container">
        <div className="image-wrapper">
          <img src={RubberDuck} alt="Rubber Duck" className="main-image" />
          <img
            src={SunDucks}
            alt="Rubber Ducks with sunglasses"
            className="alt-image"
          />
        </div>

        {/* <h1>The Rubber Duck Blog</h1> */}

        <div className="home-text">
          <h1 className="title">Welcome to the Rubber Ducky Blog!</h1>
          <div className="view-posts">
            <Link to={"/posts"}>
              <button type="button" className="view-posts-btn">
                View posts
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="second">
        <div className="wrapper">
          <h2 className="typing-demo">
            {text}
            <span className="span-h1"></span>
          </h2>
        </div>

        <div className="image-box">
          <img src={Developer} alt="Black female developer" />
        </div>
      </section>
    </div>
  );
}

export default Homepage;
