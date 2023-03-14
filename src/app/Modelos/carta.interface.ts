export interface CartaI {
    category:    Category;
    name:        string;
    price:       number;
    description: string;
    imgUrl:      string;
    available:   boolean;
    slug:        string;
}

export interface Category {
    name: string;
}