import {useContext, useEffect} from "react"
import {DAY_NAMES} from "../constants/ConstantsFilters"

import {AccountsContext} from "../context/accounts/AccountsContext"
import {CategoriesContext} from "../context/categories/CategoriesContext"
import {getRange} from "../helpers/getRange"
import {FiltersStatisctics} from "../interfaces/Expense"


export const useFiltersItems = ()=>{

  const {actualAccount} = useContext(AccountsContext)
  const {allCategories, getCategories} = useContext(CategoriesContext)

  useEffect(() => {
    getCategories()
  }, [])

  

  const filtersItems: {filterName: keyof FiltersStatisctics, options: {label: string, value: string}[]}[] = [
    {
      filterName: 'year',
      options: getRange(new Date().getFullYear(), 20).map(num => ({
        label: num,
        value: num
      }))
    },
    {
      filterName: 'month',
      options: getRange(11, 11).sort((a, b) => (+a) - (+b)).map(num => ({
        label: num,
        value: num
      }))
    },
    {
      filterName: 'num_date',
      options: getRange(31).sort((a, b) => (+a) - (+b)).map(num => ({
        label: num,
        value: num
      }))
    },
    {
      filterName: 'day_name',
      options: DAY_NAMES.map(day => ({
        label: day,
        value: day
      }))
    },
    {
      filterName: 'users',
      options: (actualAccount?.users || []).map(user => ({
        label: user.fullName,
        value: user.id
      }))
    },
    {
      filterName: 'categories',
      options: allCategories.map(cat => ({
        label: cat.name,
        value: cat.id
      }))
    },
    // {
    //   filterName: 'Subcategorías',
    //   options: pruebaSubcats
    // },
  ]

  return {
    filtersItems,
  }
}