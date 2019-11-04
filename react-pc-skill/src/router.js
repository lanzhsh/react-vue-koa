import One from "./pages/OneTen/one";
import Eleven from "./pages/TwoTen/Eleven";

import AsyncComponent from "./utils/asyncComponent";
const Home = AsyncComponent(() => import("./pages/Home"));
const Login = AsyncComponent(() => import("./pages/Login"));
const User = AsyncComponent(() => import("./pages/User"));

const NotFound = AsyncComponent(() => import("./pages/NotFound"));

const SecondLevelComponent = AsyncComponent(() =>
  import("./common/SecondLevelComponent")
);
const ThirdLevelComponent = AsyncComponent(() =>
  import("./common/ThirdLevelComponent")
);

const routes = [
  { path: "/", exact: true, component: Home, requiresAuth: false },
  {
    path: "/login",
    component: Login,
    requiresAuth: false
  },
  {
    path: "/user",
    component: User,
    requiresAuth: true, //需要登陆后才能跳转的页面

    children: [ 
      {
        path: "/user/oneTen",
        component: SecondLevelComponent,
        pathName: "oneTen",
        name: "1到10",
        icon: "table",
        children: [
          {
            path: "/user/oneTen/one",
            pathName: "one",
            component: One,
            name: "技能1",
            icon: "table"
          }
        ]
      },
      {
        path: "/user/twoTen",
        component: ThirdLevelComponent,
        pathName: "twoTen",
        name: "10到20",
        icon: "table",
        children: [
          {
            path: "/user/twoTen/eleven",
            pathName: "eleven",
            component: Eleven,
            name: "技能11",
            icon: "table"
          }
        ]
      },
    ]
  },
  {
    path: "*",
    component: NotFound,
    requiresAuth: false
  }
];

export default routes;
