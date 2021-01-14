import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, StyleSheet, Text, View, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { confirmDelivery } from '../api';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { Order } from '../types';

//Foi criado para fazer a navegação do pedido
type Props = {
    route: {
        params : {
            order: Order;
        }
    }
}

function OrderDetails({route }: Props) {
    const {order} = route.params;
    //Essas 2 const abaixo é para redirecionar quando clicar no nome DS DELIVERY, voltar pra home. Essas 2 const trabalham junto com a função TouchableWithoutFeedback  
    const navigation = useNavigation();

    const handleOnCancel = () => {
        navigation.navigate('Orders')

    }

    const HandleConfirmDelivery = () => {
        confirmDelivery(order.id)
        //.then é para quando confirmar a entrega, mostrar uma mensagem e redirecionar para lista de pedidos
        .then(() => {
            Alert.alert(`Pedido ${order.id} confirmado com sucesso!`)
            navigation.navigate('Orders')
        })
        .catch(() => {
            Alert.alert(`Houve um erro ao confirmar o pedido ${order.id}`)
        })
    }

    const handleStartNavigation = () => {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`)
    }

    return (
        <>
        <Header />
            <View style={styles.container}>
                {/*Para poupar codigo, foi reutlizado o componente OrderCard que ja esta pronto 
                O orderCard recebe um order como parametro e foi passado o proprio order |const {order} = route.params;| como parametro
                que foi recebido via rota*/}
                <OrderCard order={order} />
                <RectButton style={styles.button} onPress={handleStartNavigation}>
                    <Text style={styles.buttonText}>INICIAR NAVEGAÇÃO</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={HandleConfirmDelivery}>
                    <Text style={styles.buttonText}>CONFIRMAR ENTREGA</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleOnCancel}>
                    <Text style={styles.buttonText}>CANCELAR</Text>
                </RectButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingRight: '5%',
      paddingLeft: '5%'
    },
    button: {
      backgroundColor: '#DA5C5C',
      flexDirection: 'row',
      borderRadius: 10,
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 50,
      paddingRight: 50,
      fontWeight: 'bold',
      fontSize: 18,
      color: '#FFF',
      letterSpacing: -0.24,
      fontFamily: 'OpenSans_700Bold'
    }
  });

export default OrderDetails;