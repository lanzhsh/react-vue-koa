const menuList = [
    // {
    //     title: '首页',
    //     key: '/home'
    // },
    {
        title: '订单管理',
        key: '/user/order',
        children: [
            {
                title: '订单列表',
                key: '/user/order/list',
            },
            {
                title: '退货管理',
                key: '/user/order/returnGoods',
            },
            {
                title: '生产管理',
                key: '/user/order/product',
                children:[
                    {
                        title: '生产列表',
                        key: '/user/order/product/list',
                    },
                    {
                        title: '审核管理',
                        key: '/user/order/product/review',
                    }
                ]
            }
        ]
    },
    {
        title: '产品管理',
        key: '/user/goods',
        children:[
            {
                title: '产品列表',
                key: '/user/goods/list',
            },
            {
                title: '产品分类',
                key: '/user/goods/classify',
            }
        ]

    },
    {
        title: '权限管理',
        key: '/user/permission',
        children:[
            {
                title: '用户管理',
                key: '/user/permission/user',
            },
            {
                title: '角色管理',
                key: '/user/permission/role',
            },
            {
                title: '菜单管理',
                key: '/user/permission/menu',
            }
        ]
    },
    {
        title: '1到10',
        key: '/user/oneTen',
        children:[
            {
                title: '技能1',
                key: '/user/oneTen/one',
            }
        ]
    },
];
export default menuList;