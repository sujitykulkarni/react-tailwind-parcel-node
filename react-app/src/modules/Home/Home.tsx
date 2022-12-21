import React from "react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-2 flex flex-col justify-center items-center rounded-sm w-1/2 min-h-96 gap-8 text-slate-700">
      <div className="flex flex-col justify-center items-center gap-4 py-28">
        <p className="text-5xl text-slate-900 antialiased font-black tracking-tighter lowercase">
          Football. Stats. Visualizations.
        </p>
        <p className="text-justify text-xl leading-relaxed font-serif">
          Welcome to the football stats and visualization app! I built it with{" "}
          <u>React JS and Node JS.</u> The app offers a modern and user-friendly
          platform for exploring and understanding football data.{" "}
          <em>Created while learning these technologies</em>, this app is built
          with best practices and a strong foundation. Access a wide range of
          statistics, such as team and player performance. View them in
          interactive and visually appealing charts and graphs. Whether you're a
          football fan or interested in data analysis, our app has something for
          you. Try it out now and discover the power of football data!
        </p>
        <div>
          <Button
            className="text-2xl"
            intent="primary"
            onClick={() => navigate("players")}
          >
            🌐 Explore
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <Card>
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl">🏆</div>
            <h2 className="font-extrabold text-xl mb-2">Leagues</h2>
            <p>Current Supported Leagues</p>
            <ul className="list-disc list-inside">
              <li>English Premier League</li>
            </ul>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl">🌟</div>
            <h2 className="font-extrabold text-xl mb-2">Features</h2>
            <ul className="list-disc list-inside">
              <li>Full list of Premier League players and teams</li>
              <li>Insightful Visualizations</li>
            </ul>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl">📌</div>
            <h2 className="font-extrabold text-xl mb-2">To-do</h2>
            <p>⬜ Bring in more leagues</p>
            <p>⬜ Bring in more stats</p>
          </div>
        </Card>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold">Dev</h2>
        <a
          href="https://github.com/sujitykulkarni"
          target="_blank"
          className="underline"
        >
          Sujit Kulkarni
        </a>
      </div>
    </div>
  );
};

export default Home;
