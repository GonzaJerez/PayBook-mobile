import {createContext, useState} from 'react';
import {FiltersStatisctics} from '../../interfaces/Expense';

interface StatisticsState {
  filtersApplied: FiltersStatisctics;
}

interface StatisticsContextProps extends StatisticsState{
  addFilter: (field: keyof FiltersStatisctics, value: string) => void;
  removeFilter: (field: keyof FiltersStatisctics, value: string) => void;
  cleanFilters: () => void;
  cleanOneFilter: (field: keyof FiltersStatisctics) => void;
}

export const StatisticsContext = createContext({} as StatisticsContextProps)

const currentDate = new Date()

const initialValues:FiltersStatisctics = {
  month: [(currentDate.getMonth() + 1).toString()],
  year: [currentDate.getFullYear().toString()]
}


export const StatisticsProvider = ({children}:{children:JSX.Element | JSX.Element[]})=>{

  const [filtersApplied, setFiltersApplied] = useState<FiltersStatisctics>(initialValues)

  const addFilter = (field:keyof FiltersStatisctics, value:string)=>{
    if(field === 'max_amount' || field === 'min_amount'){
      setFiltersApplied({
        ...filtersApplied,
        [field]: (value === '') ? undefined : value
      })
    } else{
      setFiltersApplied({
        ...filtersApplied,
        [field]: [...(filtersApplied[field] || []), value]
      })
    }
  }

  const removeFilter = (field:keyof FiltersStatisctics, value:string)=>{
    if(field === 'max_amount' || field === 'min_amount'){
      setFiltersApplied({
        ...filtersApplied,
        [field]: undefined
      })
    } else {
      setFiltersApplied({
        ...filtersApplied,
        [field]: filtersApplied[field]?.filter(filt => filt !== value)
      })
    }
  }

  const cleanFilters = ()=>{
    setFiltersApplied(initialValues)
  }

  const cleanOneFilter = (field:keyof FiltersStatisctics)=>{
    setFiltersApplied({
      ...filtersApplied,
      [field]: []
    })
  }

  return (
    <StatisticsContext.Provider
      value={{
        filtersApplied,
        addFilter,
        removeFilter,
        cleanFilters,
        cleanOneFilter
      }}
    >
      {children}
    </StatisticsContext.Provider>
  )
}