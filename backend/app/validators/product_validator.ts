import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(100),
    sport: vine.string().trim().minLength(3).maxLength(100),
    image_url: vine.string().trim().minLength(3).maxLength(500),
    price: vine.number().min(0),
    seller: vine.string().trim().minLength(3).maxLength(100),
    details: vine.string().trim().minLength(3).maxLength(500),
    type: vine.string().trim().minLength(3).maxLength(100),
    available_sizes: vine.array(vine.string().minLength(1).maxLength(5)).optional(),
  })
)

export const createProductsValidator = vine.compile(
  vine.object({
    products: vine.array(
      vine.object({
        name: vine.string().trim().minLength(3).maxLength(100),
        sport: vine.string().trim().minLength(3).maxLength(100),
        image_url: vine.string().trim().minLength(3).maxLength(500),
        price: vine.number().min(0),
        seller: vine.string().trim().minLength(3).maxLength(100),
        details: vine.string().trim().minLength(3).maxLength(500),
        type: vine.string().trim().minLength(3).maxLength(100),
        available_sizes: vine.array(vine.string().minLength(1).maxLength(5)).optional(),
      })
    ),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(100).optional(),
    sport: vine.string().trim().minLength(3).maxLength(100).optional(),
    image_url: vine.string().trim().minLength(3).maxLength(100).optional(),
    price: vine.number().min(0).optional(),
    seller: vine.string().trim().minLength(3).maxLength(100).optional(),
    details: vine.string().trim().minLength(3).maxLength(500).optional(),
    type: vine.string().trim().minLength(3).maxLength(100).optional(),
  })
)
