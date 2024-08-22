import router from '@adonisjs/core/services/router'

const ProductsController = () => import('#controllers/products_controller')
const SizesController = () => import('#controllers/sizes_controller')

router.get('/', async () => {
  return {
    hello: 'Cooper Sportwear API',
  }
})

router.resource('products', ProductsController).apiOnly()
router.post('products/bulk', [ProductsController, 'createMany'])
router.resource('sizes', SizesController).apiOnly()
router.post('sizes/bulk', [SizesController, 'createMany'])
