
import { Routes, Route } from "react-router-dom";
import ShowBallSwiper from "./ShowBallSwiper";
import PlayerLoginForm from "../../players/components/PlayerLoginForm";

const ROUTES = [
  { path: "/", component: <ShowBallSwiper /> },
  { path: "/login", component: <PlayerLoginForm /> },
];

const Router = () => {
  return (
    <Routes>
      {ROUTES.map((route, id) => (
        <Route key={`route_${id}`} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};

export default Router;
