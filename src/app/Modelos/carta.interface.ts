export interface CartaI {
    _id:         string;
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