import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import transactionslist from "./TransactionList";

const TransactionListScreen = ({ navigation, route }) => {
  const [transactions, setTransactions] = useState(transactionslist);

  useEffect(() => {
    if (route?.params?.newTransaction) {
      setTransactions((prev) => [route.params.newTransaction, ...prev]);
      route.params.newTransaction = null;
    }
  }, [route?.params?.newTransaction]);

  const calculateBalance = () => {
    let deposits = 0;
    let expenses = 0;

    transactions.forEach((t) => {
      if (t.type === "Deposit") deposits += t.amount;
      else expenses += t.amount;
    });

    return deposits - expenses;
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Delete Transaction",
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updated = transactions.filter((t) => t.id !== item.id);
            setTransactions(updated);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("TransactionDetail", { transaction: item })
      }
    >
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text
            style={[
              styles.amount,
              item.type === "Deposit" ? styles.deposit : styles.expense,
            ]}
          >
            {item.type === "Deposit" ? "+" : "-"}${item.amount}
          </Text>
        </View>
        <Icon
          name="trash"
          size={24}
          color="red"
          onPress={() => handleDelete(item)}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Balance: ${calculateBalance().toFixed(2)}
        </Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={<Text style={styles.empty}>No Transactions</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TouchableOpacity
        style={styles.newTransactionButton}
        onPress={() => navigation.navigate("NewTransaction")}
      >
        <Text style={styles.newTransactionText}>Make New Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#d7f0f6",
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  amount: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  deposit: {
    color: "green",
  },
  expense: {
    color: "red",
  },
  empty: {
    marginTop: 50,
    fontSize: 18,
    textAlign: "center",
    color: "gray",
  },
  newTransactionButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  newTransactionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
