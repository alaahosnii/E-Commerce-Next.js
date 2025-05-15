export type Product = {
    _id: string;
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    flashSale: boolean;
    previousPrice: number;
    salePercentage: number;
    bestSelling: boolean;
    quantity?: number; // Optional, since it's only in the cart
    subTotalPrice?: number; // Optional, since it's only in the cart
};

export type Cart = {
    products: Product[];
    totalQuantity: number;
    totalPrice: number;
};

export type User = {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    cart?: Cart;
    favorites?: Product[];
    address?: string;
    phone?: string;
    confirmPass?: string;
    newPass?: string;
};
export type Size = {
    id: number;
    sizeNumber: string;
    selected: boolean;
}

export type Error = {
    status: boolean;
    message: string;
}

export type LoginData = {
    email: string,
    password: string
}
export type FormError = {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    message?: string;
    confirmPass?: string;
    newPass?: string;
}


export type paymentRequestBody = {
    apartment: string;
    firstName: string;
    lastName: string;
    streetAddress: string;
    phone: string;
    email: string;
    state: string;
    amount: number;
};