import vine from '@vinejs/vine'

export const createSizeValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(5),
  })
)

export const createSizesValidator = vine.compile(
  vine.object({
    sizes: vine.array(
      vine.object({
        name: vine.string().trim().minLength(1).maxLength(5),
      })
    ),
  })
)

export const updateSizeValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(5),
  })
)
