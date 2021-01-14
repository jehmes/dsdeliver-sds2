import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Alert, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchOrders } from '../api';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { Order } from '../types';


function Orders() {
    //quando se colocar colchetes dentro do () é para começar uma lista vazia
    const [orders, setOrders] = useState<Order[]>([]);
    //Foi criado para quando estiver carregando os pedidos do back pro front, aparecer um loading para melhor interatividade
    const [isLoading, setIsLoading] = useState(false);
    //Foi criado uma variavel para fazer uma navegação quando for clicado no PEDIDO, seja redirecionado
    const navigation = useNavigation();
    //Essa const é para atualizar a lista de pedidos quando for confirmado um pedido. Toda vez que renderiza a tela de listagem dos pedidos irá mudar o valor da varivel para true ou false
    const isFocused = useIsFocused();

    const fetchData = () => {
         //SetisLoading fica true quando faz a comunicação com o banco
         setIsLoading(true);
         fetchOrders()
             .then(response => setOrders(response.data))
             .catch(error => Alert.alert('Houve um erro ao buscar os pedidos!'))
             //independente se deu erro ou não, irá ficar false
             .finally(() => setIsLoading(false));
    }
    //Técnica para atualziar a lista de pedidos. Quando o isFocused for true é pq a tela Orders foi mostrada e então ele chama o metodo fetchData
    useEffect(() => {
       if (isFocused) {
        fetchData();
       }
    }, [isFocused]);

   
        //Quando o pedido for pressionado irá chamar a função handleOnPress que ira redirecionar para o 'OrderDetails'
        //Foi passado um parâmetro tipo Order para receber o pedido quando clicado nele
        const handleOnPress = (order: Order) => {
            navigation.navigate('OrderDetails', {
                order
            });
        }
    

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                {/*Esse isLoading é como se fosse um if. Se isLoading é true, irá aparecer a mensagem "buscando pedido", se for false, mostra os pedidos*/}
                {isLoading ? (
                    <Text>Buscando pedidos...</Text>
                ) : (
                        orders.map(order => (
                            //O TouchableWithoutFeedback é para deixar clicavel | O onPress={handleOnPress} é para quando clicar chamar essa função para redirecionar a pagina
                            //Mas foi retirado o onPress={handleOnPress}. Porque irá chamar o handleonPress passando o order como parametro.
                            //esse order.map é tipo um for, para cada pedido, vai entrar na função abaixo dele. Então
                            //quando clicar no pedido, o handleOnPress vai passar esse pedido que foi clicado 
                            <TouchableWithoutFeedback 
                            key={order.id} 
                            onPress={() => {handleOnPress(order)}}
                            >
                                <OrderCard order={order} />
                            </TouchableWithoutFeedback>
                        ))
                    )}

            </ScrollView>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        //Foi usado % para adaptar-se melhor a diferentes telas. Invez de colocar um valor fixo, coloca % para ser mais acertivo
        paddingRight: '5%',
        paddingLeft: '5%',
    }
});

export default Orders;