

export interface Category {
    name:           string;
    subcategories?: Category[];
    id:             string;
    isActive:       boolean;
}

export interface GetCategoriesProps {
    categories:    Category[];
    statusCode?:   number;
    message?:      string;
    error?:        string
}
export interface CategoryResponse {
    category:      Category;
    statusCode?:   number;
    message?:      string;
    error?:        string
}

export interface CreateCategory {
    name:       string;
}

export interface UpdateCategory {
    name?:      string;
}