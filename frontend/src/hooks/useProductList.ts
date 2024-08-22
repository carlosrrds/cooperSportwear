import { fetcher } from "@/api/producs";
import { NEXT_PUBLIC_API_URL } from "@/configs/config";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useMemo } from "react";
import useSWR, { SWRConfiguration } from "swr";

interface IUseProductList {
  filters?: ReadonlyURLSearchParams | URLSearchParams
  options: SWRConfiguration
}

export const useProductList = ({ filters, options }: IUseProductList) => {

    const URL = useMemo(() => {
        let params = new URLSearchParams()

        if(filters){
            applyFiltersToParams(filters, params)
        }

        return decodeURIComponent(`${NEXT_PUBLIC_API_URL}/products?${params.toString()}`)
    }, [filters])

    const {data, isLoading, error} = useSWR(URL, fetcher, options)

    const memoizedProductList = useMemo(() => ({
        productList: data?.data ?? [],
        isLoading,
        error,
        pagination: data?.meta ?? {}
    }), [data, isLoading, error])

    return memoizedProductList
}

function applyFiltersToParams(filters: ReadonlyURLSearchParams | URLSearchParams, param: URLSearchParams) {
    filters.forEach((value, key) => {
      key = decodeURIComponent(key)
      switch(key){
        case 'search':
          param.append('search', value)
          break;
        case 'sports[]':
          param.append('sports[]', value)
          break;
        case 'types[]':
          param.append('types[]', value)
          break;       
        case 'sellers[]':
          param.append('sellers[]', value)
          break;
        case 'min_price':
          param.append('min_price', value)
          break;  
        case 'max_price':
          param.append('max_price', value)
          break;
        case 'sizes[]':
        param.append('sizes[]', value)
        break;      
        case 'page':
            param.append('page', value)
            break;                                                
        default:
          break;  
      }
    })
    
   return param
}
