import { Product } from "./types";

                                //Entre os parenteses são os parametros que irá receber. Uma lista de produto e um produto
export function checkIsSelected(selectedProducts: Product[], product: Product) {
    return selectedProducts.some(item => item.id === product.id);
}


//Esse metodo trata a formatação da moeda para R$ 35,00 por exemplo. Sem isso ficaria tipo R$ 35
export function formatPrice(price: number) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });

    return formatter.format(price);
}