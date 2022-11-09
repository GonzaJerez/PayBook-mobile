import {Category} from '../../interfaces/Category';


export interface CategoriesState {
  allCategories:  Category[];
  actualCategory: Category | null;
}

type CategoriesActions = 
  | {type: 'getCategories', payload:{categories:Category[]}}
  | {type: 'setActualCategory', payload:{category:Category | null}}
  | {type: 'createCategory', payload:{category:Category}}
  | {type: 'updateCategory', payload:{category:Category}}
  | {type: 'removeCategory', payload:{idCategory:string}}


export const CategoriesReducer = (state:CategoriesState, action:CategoriesActions):CategoriesState => {
  switch (action.type) {

    case 'getCategories':
      return {
        ...state,
        allCategories: action.payload.categories
      }

    case 'setActualCategory':
      return {
        ...state,
        actualCategory: action.payload.category
      }

    case 'createCategory':
      return {
        ...state,
        allCategories: [...state.allCategories, action.payload.category].sort((a,b)=>a.name.localeCompare(b.name)),
      }

    case 'updateCategory':
      return {
        ...state,
        allCategories: state.allCategories.map( 
          cat => cat.id === action.payload.category.id 
            ? action.payload.category
            : cat 
        ),
        actualCategory: action.payload.category
      }

    case 'removeCategory':
      return {
        ...state,
        allCategories: state.allCategories.filter( cat => cat.id !== action.payload.idCategory)
      }
  
    default:
      return state;
  }
}