
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        path: '/',
        component: () => import('pages/index')
      },
      {
        path: 'inventory',
        component: () => import('pages/inventory'),
        children: [
          {
            path: 'raw-materials',
            component: () => import('pages/inventory/raw-materials')
          },
          {
            path: 'packaging-materials',
            component: () => import('pages/inventory/packaging-materials')
          },
          {
            path: 'other-materials',
            component: () => import('pages/inventory/other-materials')
          },
          {
            path: 'finished-goods',
            component: () => import('pages/inventory/finished-goods')
          },
          {
            path: 'bad-orders',
            component: () => import('pages/inventory/bad-orders')
          },
          {
            path: 'expired-goods',
            component: () => import('pages/inventory/expired-goods')
          },
          {
            path: 'suppliers',
            component: () => import('pages/inventory/suppliers')
          }
        ]
      },
      {
        path: 'production',
        component: () => import('pages/production')
      },
      {
        path: 'sales',
        component: () => import('pages/sales')
      },
      {
        path: 'signin',
        component: () => import('pages/signin')
      }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
