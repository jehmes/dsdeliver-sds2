import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'
import Home from "./Home/inde";
import Orders from "./Orders/inde";

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
            //Esses codigos headermode é para tirar ja que nao precisa 
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#FFF'
                    }
                }}
            >
                {/* Diferente do react pra web, aqui as rotas não tem URL, mas são identifcados pelos nomes */}
                <Stack.Screen name ="Home" component={Home}></Stack.Screen>   
                <Stack.Screen name="Orders" component={Orders}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default Routes;