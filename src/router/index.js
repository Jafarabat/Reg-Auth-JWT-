import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile.jsx";
import Registration from "../pages/registration/Registartion.jsx";

export const publicRoutes = [
  { path: "/login", component: Login, exact: true },
  { path: "/registration", component: Registration, exact: true },
  //{ path: "/profile", component: Profile, exact: true }
];

export const privateRoutes = [
  { path: "/profile", component: Profile, exact: true },
  //{ path: "/login", component: Login, exact: true },
  //{ path: "/registration", component: Registration, exact: true }
];
