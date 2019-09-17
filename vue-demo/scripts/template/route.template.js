/*
 * @Author: _author_
 * @Email: _email_
 * @Date: _date_
 * @Description: _comment_
 */
export default [
  {
    path: "/_mainPath",
    component: () => import("@/views/frame/Frame"),
    redirect: "/_filePath",
    name: "_mainPath",
    icon: "",
    noDropdown: false,
    children: [
      {
        path: "/_filePath",
        component: () => import("@/views/_filePath/index"),
        name: "_module",
        meta: {
          keepAlive: false
        }
      }
    ]
  }
]