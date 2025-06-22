import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import TransactionListScreen from "./screens/TransactionListScreen";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";
import NewTransactionScreen from "./screens/NewTransactionScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen
          name="TransactionList"
          component={TransactionListScreen}
          options={({ navigation }) => ({
            title: "Transactions",
            headerRight: () => (
              <Button
                title="Logout"
                color="#3498db"
                onPress={() => navigation.replace("Login")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetailScreen}
          options={{ title: "Transaction Details" }}
        />
        <Stack.Screen
          name="NewTransaction"
          component={NewTransactionScreen}
          options={{ title: "Add Transaction" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
