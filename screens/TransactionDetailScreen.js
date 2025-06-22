import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const TransactionDetailScreen = ({ route }) => {
  const { transaction } = route.params;

  const getCategoryImage = (category) => {
    switch (category.toLowerCase()) {
      case "groceries":
        return require("../assets/groceries.jpeg");
      case "shopping":
        return require("../assets/shopping.jpeg");
      case "transportation":
        return require("../assets/transportation.jpeg");
      case "utilities":
        return require("../assets/utilities.jpeg");
      case "entertainment":
        return require("../assets/entertainment.jpeg");
      case "payroll":
        return require("../assets/payroll.jpeg");
      case "health":
        return require("../assets/health.jpeg");
      default:
        return null;
    }
  };

  const image = getCategoryImage(transaction.category);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {image && (
          <View style={{ marginBottom: 200 }}>
            <ImageBackground
              source={image}
              style={styles.background}
              resizeMode="cover"
              imageStyle={{ width: "100%", height: 200, borderRadius: 10 }}
            />
          </View>
        )}

        <View style={styles.iconBox}>
          <Icon
            name={
              transaction.type === "Deposit" ? "plus-circle" : "minus-circle"
            }
            size={60}
            color={transaction.type === "Deposit" ? "green" : "red"}
          />
        </View>
        <Text
          style={[
            styles.typeHeader,
            transaction.type === "Deposit" ? styles.deposit : styles.expense,
          ]}
        >
          {transaction.type}
        </Text>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{transaction.name}</Text>

            <Text style={styles.label}>Amount</Text>
            <Text
              style={[
                styles.amount,
                transaction.type === "Deposit"
                  ? styles.deposit
                  : styles.expense,
              ]}
            >
              {transaction.type === "Deposit" ? "+" : "-"}${transaction.amount}
            </Text>

            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{transaction.category}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{transaction.location}</Text>

            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{transaction.date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransactionDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#d7f0f6",
    paddingHorizontal: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    marginTop: 20,
  },
  typeHeader: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    color: "#34495e",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 20,
  },
  column: {
    width: "48%",
  },
  value: {
    fontSize: 16,
    color: "#2c3e50",
    marginTop: 4,
  },
  deposit: {
    color: "green",
    fontWeight: "bold",
  },
  expense: {
    color: "red",
    fontWeight: "bold",
  },
  iconBox: {
    marginTop: 40,
    alignItems: "center",
  },
});
