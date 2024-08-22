import { ReadonlyURLSearchParams } from "next/navigation"

interface IHnadleFilters {
  route: string
  name: string
  value: string | boolean | any[]
  filters: ReadonlyURLSearchParams | URLSearchParams
}

export const handleFilters = ({ route, name, value, filters }: IHnadleFilters) => {
    const newParams = new URLSearchParams(filters.toString());
    if (value === null || value === false || (Array.isArray(value) && value.length < 1)) {
      newParams.delete(name);
    } else{
      newParams.set(name, value as string);
    }
    const queryString = newParams.toString();
    
    return `${route}${queryString ? `?${queryString}` : ''}`
}
