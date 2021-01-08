export type Product = {
    id: number;
        name: string;
        price: number;
        description: string;
        imageUri: string;
}

export type OrderLocationData = {
    address: string;
    latitude: number;
    longitude: number; 
}

type ProductId = {
    id: number;
}

//O Payload é para mandar para o banco de dados os produtos selecionados.
//Esse & é para juntar 2 types, ele ta juntando as variaveis de OrderLocationData com o OrderPayload
export type OrderPayload = {
    products: ProductId[];
} & OrderLocationData;

