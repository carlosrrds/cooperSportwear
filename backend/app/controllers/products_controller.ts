import Product from '#models/product'
import Size from '#models/size'
import type { HttpContext } from '@adonisjs/core/http'
import {
  createProductsValidator,
  createProductValidator,
  updateProductValidator,
} from '#validators/product_validator'

export default class ProductsController {
  async index({ request }: HttpContext) {
    const search = request.input('search')
    const types = request.input('types', [])
    const sellers = request.input('sellers', [])
    const sports = request.input('sports', [])
    const minPrice = request.input('min_price')
    const maxPrice = request.input('max_price')
    const sizes = request.input('sizes', [])
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const productsQuery = Product.query()
      .apply((scopes) => {
        scopes.filterBySearch(search)
        scopes.filterByType(types)
        scopes.filterBySport(sports)
        scopes.filterBySeller(sellers)
        scopes.filterByPriceRange(minPrice, maxPrice)
        scopes.filterBySizes(sizes)
      })
      .preload('available_sizes', (query) => {
        query.select('name')
      })

    const products = await productsQuery.paginate(page, limit)

    const formattedProducts = products.toJSON().data.map((product) => {
      return {
        id: product.id,
        name: product.name,
        image_url: product.image_url,
        type: product.type,
        price: product.price,
        seller: product.seller,
        available_sizes: product.available_sizes.map((size: Size) => size.name),
        details: product.details,
        sport: product.sport,
      }
    })

    return {
      ...products.toJSON(),
      data: formattedProducts,
    }
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createProductValidator)
    const sizeNames = payload.available_sizes || []
    const product = await Product.create(payload)
    if (sizeNames.length > 0) {
      const sizes = await Size.query().whereIn('name', sizeNames).select('id')
      const sizeIds = sizes.map((size) => size.id)
      await product.related('available_sizes').attach(sizeIds)
    }
    await product.load('available_sizes')
    return product
  }

  async createMany({ request }: HttpContext) {
    const payloads = await request.validateUsing(createProductsValidator)

    const createdProducts = []

    for (const payload of payloads.products) {
      const sizeNames = payload.available_sizes || []

      const product = await Product.create(payload)

      if (sizeNames.length > 0) {
        const sizes = await Size.query().whereIn('name', sizeNames).select('id')
        const sizeIds = sizes.map((size) => size.id)
        await product.related('available_sizes').attach(sizeIds)
      }

      await product.load('available_sizes')
      createdProducts.push(product)
    }

    return createdProducts
  }

  async show({ request }: HttpContext) {
    const productId = request.param('id')
    const product = await Product.findOrFail(productId)
    return product
  }

  async update({ request }: HttpContext) {
    const productId = request.param('id')
    const payload = await request.validateUsing(updateProductValidator)
    const product = await Product.findOrFail(productId)
    await product.merge(payload).save()
    return product
  }

  async destroy({ request }: HttpContext) {
    const productId = request.param('id')
    const product = await Product.findOrFail(productId)
    await product.delete()
    return true
  }
}
