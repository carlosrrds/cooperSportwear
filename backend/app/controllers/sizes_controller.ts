import Size from '#models/size'
import {
  createSizesValidator,
  createSizeValidator,
  updateSizeValidator,
} from '#validators/size_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class SizesController {
  async index({}: HttpContext) {
    const sizes = await Size.all()
    return sizes
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createSizeValidator)
    const sizer = await Size.create(payload)
    return sizer
  }

  async createMany({ request }: HttpContext) {
    const payloads = await request.validateUsing(createSizesValidator)
    const createdSizes = []
    for (const payload of payloads.sizes) {
      const size = await Size.create(payload)
      createdSizes.push(size)
    }

    return createdSizes
  }

  async show({ request }: HttpContext) {
    const sizeId = request.param('id')
    const size = Size.find(sizeId)
    return size
  }

  async update({ request }: HttpContext) {
    const sizeId = request.param('id')
    const payload = await request.validateUsing(updateSizeValidator)
    const size = await Size.findOrFail(sizeId)
    await size.merge(payload).save()
    return size
  }

  async destroy({ request }: HttpContext) {
    const sizeId = request.param('id')
    const size = await Size.findOrFail(sizeId)
    await size.delete()
    return true
  }
}
