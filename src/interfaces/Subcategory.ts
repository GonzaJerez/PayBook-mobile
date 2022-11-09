export interface Subcategory {
  name:     string;
  id:       string;
  isActive: boolean
}

export interface SubcategoryResponse {
  subcategory:   Subcategory;
  statusCode?:   number;
  message?:      string;
  error?:        string
}

export interface CreateSubcategory {
  name:     string;
}

export interface UpdateSubcategory {
  name?:     string;
}