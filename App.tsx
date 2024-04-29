import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
} from "react-native";

export default function App() {
  const [input, setNumber] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [randomInt, setRandomInt] = useState([]);

  useEffect(() => {
    const randomNumbers = [];
    while (randomNumbers.length < 100) {
      const r = Math.floor(Math.random() * 100) + 1;
      if (!randomNumbers.includes(r)) randomNumbers.push(r);
    }
    setRandomInt(randomNumbers);
  }, []);

  function below() {
    return Alert.alert("It needs to be below 100");
  }
  function above() {
    return Alert.alert("It needs to be above 0");
  }

  function lower() {
    return Alert.alert("Lower");
  }

  function higher() {
    return Alert.alert("Higher");
  }

  function success() {
    Alert.alert("You got it!");
    setGuesses([]);
    const newRandomInt = [];
    while (newRandomInt.length < 100) {
      const r = Math.floor(Math.random() * 100) + 1;
      if (!newRandomInt.includes(r)) newRandomInt.push(r);
    }
    setRandomInt(newRandomInt);
  }
  function confirmNumber({ input }) {
    const randomIndex = Math.floor(Math.random() * randomInt.length);
    const randomNum = randomInt[randomIndex];

    if (input === randomNum) {
      success();
    } else if (input > randomNum && input < 100) {
      lower();
    } else if (input < randomNum && input > 0) {
      higher();
    } else if (input > 100) {
      below();
    } else if (input < 0) {
      above();
    }
    setGuesses((prevGuesses) => [...prevGuesses, input]);

    if (guesses.length === 7 && input !== randomNum) {
      setGuesses([]);
      const newRandomInt = [];
      while (newRandomInt.length < 100) {
        const r = Math.floor(Math.random() * 100) + 1;
        if (!newRandomInt.includes(r)) newRandomInt.push(r);
      }
      setRandomInt(newRandomInt);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("./gradient.png")} style={styles.image}>
        <Text style={styles.text}>Guess the number</Text>
        <TextInput
          style={styles.input}
          placeholder="Pick from 1 to 100"
          onChangeText={(input) => setNumber(input)}
        />
        <Button
          title="Submit"
          color="#000"
          onPress={() => confirmNumber({ input })}
        />
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          data={guesses}
          renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    alignItems: "center",
  },
  listItem: {
    textAlign: "center",
    marginVertical: 5,
    fontSize: 14,
  },
  flatList: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    backgroundColor: "#FFFFFF",
    opacity: 0.8,
    textAlign: "center",
  },
  container: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
  },
  scroll: {
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
  text: {
    textAlign: "center",
    fontSize: 24,

    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});
