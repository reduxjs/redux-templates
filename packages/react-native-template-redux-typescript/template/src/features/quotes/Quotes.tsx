import { useState } from "react"
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { useGetQuotesQuery } from "./quotesApiSlice"

const options = [5, 10, 20, 30]

export const Quotes = () => {
  const [numberOfQuotes, setNumberOfQuotes] = useState(10)
  const [modalVisible, setModalVisible] = useState(false)
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } =
    useGetQuotesQuery(numberOfQuotes)

  if (isError) {
    return <Text>There was an error!!!</Text>
  }

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  const pickNumberOfQuotes = (value: number) => {
    setNumberOfQuotes(value)
    setModalVisible(false)
  }

  if (isSuccess) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true)
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Select the Quantity of Quotes to Fetch: {numberOfQuotes}
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false)
          }}
        >
          <View style={styles.modalView}>
            <ScrollView style={styles.quotesList}>
              {options.map(option => (
                <TouchableOpacity
                  key={option}
                  style={styles.option}
                  onPress={() => {
                    pickNumberOfQuotes(option)
                  }}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>

        {
          <ScrollView>
            {data.quotes.map(({ author, quote, id }) => (
              <View key={id} style={styles.quoteContainer}>
                <Text style={styles.quoteText}>{`"${quote}"`}</Text>
                <Text style={styles.author}>- {author}</Text>
              </View>
            ))}
          </ScrollView>
        }
      </View>
    )
  }

  return null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "rgba(112, 76, 182, 0.1)",
    borderRadius: 5,
  },
  buttonText: {
    color: "rgb(112, 76, 182)",
    fontSize: 18,
    textAlign: "center",
    margin: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  option: {
    fontSize: 30,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  optionText: {
    fontSize: 20,
  },
  quotesList: {
    width: "auto",
  },
  quoteContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  quoteText: {
    fontStyle: "italic",
  },
  author: {
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 5,
  },
})
