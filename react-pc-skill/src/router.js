import AsyncComponent from "./utils/asyncComponent";
const path = require('path')
const files = require.context('./pages', true, /\.jsx$/)
const modules = {}
files.keys().forEach(key => {
  const name = path.basename(key, '.jsx')
  modules[name] = files(key).default || files(key)
})

console.log('modules值为')
console.log(modules)
const Home = AsyncComponent(() => import("./pages/Home"));
const Login = AsyncComponent(() => import("./pages/Login"));
const User = AsyncComponent(() => import("./pages/User"));

const NotFound = AsyncComponent(() => import("./pages/NotFound"));

const SecondLevelComponent = AsyncComponent(() =>
  import("./common/SecondLevelComponent")
);
// 布局模板三
// const ThirdLevelComponent = AsyncComponent(() =>
//   import("./common/ThirdLevelComponent")
// );

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
        icon: "github",
        children: [
          {
            path: "/user/oneTen/one",
            pathName: "one",
            component: modules.one,
            name: "技能1",
            icon: "github"
          },
          {
            path: "/user/oneTen/two",
            pathName: "two",
            component: modules.two,
            name: "技能2",
            icon: "github"
          },
          {
            path: "/user/oneTen/three",
            pathName: "three",
            component: modules.three,
            name: "技能3",
            icon: "github"
          },
          {
            path: "/user/oneTen/four",
            pathName: "four",
            component: modules.four,
            name: "技能4",
            icon: "github"
          },
          {
            path: "/user/oneTen/five",
            pathName: "five",
            component: modules.five,
            name: "技能5",
            icon: "github"
          },
          {
            path: "/user/oneTen/six",
            pathName: "six",
            component: modules.six,
            name: "技能6",
            icon: "github"
          },
          {
            path: "/user/oneTen/seven",
            pathName: "seven",
            component: modules.seven,
            name: "技能7",
            icon: "github"
          },
          {
            path: "/user/oneTen/eight",
            pathName: "eight",
            component: modules.eight,
            name: "技能8",
            icon: "github"
          },
          {
            path: "/user/oneTen/nine",
            pathName: "nine",
            component: modules.nine,
            name: "技能9",
            icon: "github"
          },
          {
            path: "/user/oneTen/ten",
            pathName: "ten",
            component: modules.ten,
            name: "技能10",
            icon: "github"
          },
        ]
      },
      {
        path: "/user/twoTen",
        component: SecondLevelComponent,
        pathName: "twoTen",
        name: "10到20",
        icon: "html5",
        children: [
          {
            path: "/user/twoTen/eleven",
            pathName: "eleven",
            component: modules.eleven,
            name: "技能11",
            icon: "html5"
          },
          {
            path: "/user/twoTen/twelve",
            pathName: "twelve",
            component: modules.twelve,
            name: "技能12",
            icon: "html5"
          },
          {
            path: "/user/twoTen/thirteen",
            pathName: "thirteen",
            component: modules.thirteen,
            name: "技能13",
            icon: "html5"
          },
          {
            path: "/user/twoTen/fourteen",
            pathName: "fourteen",
            component: modules.fourteen,
            name: "技能14",
            icon: "html5"
          },
          {
            path: "/user/twoTen/fifteen",
            pathName: "fifteen",
            component: modules.fifteen,
            name: "技能15",
            icon: "html5"
          },
          {
            path: "/user/twoTen/sixteen",
            pathName: "sixteen",
            component: modules.sixteen,
            name: "技能16",
            icon: "html5"
          },
          {
            path: "/user/twoTen/seventeen",
            pathName: "seventeen",
            component: modules.seventeen,
            name: "技能17",
            icon: "html5"
          },
          {
            path: "/user/twoTen/eighteen",
            pathName: "eighteen",
            component: modules.eighteen,
            name: "技能18",
            icon: "html5"
          },
          {
            path: "/user/twoTen/nineteen",
            pathName: "nineteen",
            component: modules.nineteen,
            name: "技能19",
            icon: "html5"
          },
          {
            path: "/user/twoTen/twenty",
            pathName: "twenty",
            component: modules.twenty,
            name: "技能20",
            icon: "html5"
          }
        ]
      },
      {
        path: "/user/threeTen",
        component: SecondLevelComponent,
        pathName: "threeTen",
        name: "21到30",
        icon: "chrome",
        children: [
          {
            path: "/user/threeTen/twentyOne",
            pathName: "twentyOne",
            component: modules.twentyOne,
            name: "技能21",
            icon: "chrome"
          },
          {
            path: "/user/threeTen/twentyTwo",
            pathName: "twentyTwo",
            component: modules.twentyTwo,
            name: "技能22",
            icon: "chrome"
          },
          {
            path: "/user/threeTen/twentyThree",
            pathName: "twentyThree",
            component: modules.twentyThree,
            name: "技能23",
            icon: "chrome"
          },
          {
            path: "/user/threeTen/twentyFour",
            pathName: "twentyFour",
            component: modules.twentyFour,
            name: "技能24",
            icon: "chrome"
          },
          {
            path: "/user/threeTen/twentyFive",
            pathName: "twentyFive",
            component: modules.twentyFive,
            name: "技能25",
            icon: "chrome"
          },
          {
            path: "/user/threeTen/twentySix",
            pathName: "twentySix",
            component: modules.twentySix,
            name: "技能26",
            icon: "chrome"
          },
          {
            path: "/user/threeTen/twentySeven",
            pathName: "twentySeven",
            component: modules.twentySeven,
            name: "技能27",
            icon: "chrome"
          },
          {
            path: "/user/threeTen/twentyEight",
            pathName: "twentyEight",
            component: modules.twentyEight,
            name: "技能28",
            icon: "chrome"
          },
          {
            path: "/user/threeTen/twentyNine",
            pathName: "twentyNine",
            component: modules.twentyNine,
            name: "技能29",
            icon: "chrome"
          },
          {
            path: "/user/threeTen/thirty",
            pathName: "thirty",
            component: modules.thirty,
            name: "技能30",
            icon: "chrome"
          }
        ]
      },
      {
        path: "/user/fourTen",
        component: SecondLevelComponent,
        pathName: "fourTen",
        name: "31到34",
        icon: "chrome",
        children: [
          {
            path: "/user/fourTen/thirtyOne",
            pathName: "thirtyOne",
            component: modules.thirtyOne,
            name: "技能31",
            icon: "chrome"
          },
          {
            path: "/user/fourTen/thirtyTwo",
            pathName: "thirtyTwo",
            component: modules.thirtyTwo,
            name: "技能32",
            icon: "chrome"
          },
          {
            path: "/user/fourTen/thirtyThree",
            pathName: "thirtyThree",
            component: modules.thirtyThree,
            name: "技能33",
            icon: "chrome"
          },
          {
            path: "/user/fourTen/thirtyFour",
            pathName: "thirtyFour",
            component: modules.thirtyFour,
            name: "技能34",
            icon: "chrome"
          },
        ]
      }
    ]
  },
  {
    path: "*",
    component: NotFound,
    requiresAuth: false
  }
];

export default routes;
