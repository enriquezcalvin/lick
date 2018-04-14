
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },

  {
    path: '/inventory',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        component: () => import('pages/inventory/'),
        children: [
          {
            path: '',
            component: () => import('pages/inventory/inventory')
          }
        ]
      },
      {
        path: 'raw-materials',
        component: () => import('pages/inventory'),
        children: [
          {
            path: '',
            component: () => import('pages/inventory/raw-materials')
          }
        ]
      },
      {
        path: 'items',
        component: () => import('pages/inventory'),
        children: [
          {
            path: '',
            component: () => import('pages/inventory/items')
          }
        ]
      },
      {
        path: 'finished-goods',
        component: () => import('pages/inventory'),
        children: [
          {
            path: '',
            component: () => import('pages/inventory/finished-goods')
          }
        ]
      }
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
