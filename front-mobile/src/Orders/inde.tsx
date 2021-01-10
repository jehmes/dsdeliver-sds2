import React from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import Header from '../Header';
import OrderCard from   '../OrderCard';

function Orders() {
    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
               <OrderCard />
               <OrderCard />
               <OrderCard />
               <OrderCard />
               <OrderCard />
            </ScrollView>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        //Foi usado % para adaptar-se melhor a diferentes telas. Invez de colocar um valor fixo, coloca % para ser mais acertivo
        paddingRight: '5%',
        paddingLeft:  '5%',
    }
});

export default Orders;