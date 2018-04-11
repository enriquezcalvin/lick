
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },

  {
    path: '/products',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        component: () => import('pages/products'),
        children: [
          {
            path: '',
            component: () => import('pages/products/finished-goods')
          }
        ]
      },
      { 
        path: 'raw', 
        component: () => import('pages/products'),
        children: [
          {
            path: '',
            component: () => import('pages/products/raw-materials')
          }
        ] 
      },
      
    ]
  },

  {
    path: '/accounts',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/accounts') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
