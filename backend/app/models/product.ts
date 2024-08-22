import { DateTime } from 'luxon'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, manyToMany, scope } from '@adonisjs/lucid/orm'
import Size from '#models/size'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare image_url: string

  @column()
  declare type: string

  @column()
  declare price: number

  @column()
  declare seller: string

  @column()
  declare details: string

  @column()
  declare sport: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Size)
  declare available_sizes: ManyToMany<typeof Size>

  static filterBySearch = scope((query, search: string) => {
    if (search) {
      const lowerSearch = search.toLowerCase()
      query
        .whereRaw('LOWER(name) LIKE ?', [`%${lowerSearch}%`])
        .orWhereRaw('LOWER(sport) LIKE ?', [`%${lowerSearch}%`])
        .orWhereRaw('LOWER(seller) LIKE ?', [`%${lowerSearch}%`])
        .orWhereRaw('LOWER(type) LIKE ?', [`%${lowerSearch}%`])
    }
  })

  static filterBySport = scope((query, sports: string[]) => {
    if (sports && sports.length > 0) {
      sports.forEach((sport) => {
        query.orWhereRaw('LOWER(sport) = ?', [sport.toLowerCase()])
      })
    }
  })

  static filterByType = scope((query, types: string[]) => {
    if (types && types.length > 0) {
      types.forEach((type) => {
        query.orWhereRaw('LOWER(type) = ?', [type.toLowerCase()])
      })
    }
  })

  static filterBySeller = scope((query, sellers: string[]) => {
    if (sellers && sellers.length > 0) {
      sellers.forEach((seller) => {
        query.orWhereRaw('LOWER(seller) = ?', [seller.toLowerCase()])
      })
    }
  })

  static filterByPriceRange = scope((query, minPrice?: number, maxPrice?: number) => {
    if (minPrice !== undefined && maxPrice !== undefined) {
      query.whereBetween('price', [minPrice, maxPrice])
    } else if (minPrice !== undefined) {
      query.where('price', '>=', minPrice)
    } else if (maxPrice !== undefined) {
      query.where('price', '<=', maxPrice)
    }
  })

  static filterBySizes = scope((query, sizes: string[]) => {
    if (sizes && sizes.length > 0) {
      query.whereHas(
        'available_sizes' as any,
        (builder: ModelQueryBuilderContract<typeof Size>) => {
          builder.whereIn('name', sizes)
        }
      )
    }
  })
}
