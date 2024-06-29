// src/screens/Dashboard.js
import * as React from 'react';
import { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, Card, Menu, Provider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  setAmount,
  setFromCurrency,
  setToCurrency,
  setIsFromMenuVisible,
  setIsToMenuVisible,
  fetchCurrencies,
  resetAmount,
} from '../store/currencySlice';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    amount,
    fromCurrency,
    toCurrency,
    currencies,
    isFromMenuVisible,
    isToMenuVisible,
    status,
  } = useSelector((state) => state.currency);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCurrencies());
    }
  }, [status, dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(resetAmount());
    }, [dispatch])
  );

  const handleConvert = () => {
    if (amount === '') {
      alert('Please enter an amount');
      return;
    }
    if (fromCurrency === 'Select Currency' || toCurrency === 'Select Currency') {
      alert('Please select both currencies');
      return;
    }
    navigation.navigate('Conversion', {
      amount,
      fromCurrency,
      toCurrency,
    });
  };

  return (
    <Provider>
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.content}>
              <Text variant="headlineLarge" style={styles.heading}>
                Currency Converter
              </Text>
              <TextInput
                label="Amount"
                value={amount}
                onChangeText={(text) => dispatch(setAmount(text))}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
              />
              <View style={styles.dropdownContainer}>
                <Menu
                  visible={isFromMenuVisible}
                  onDismiss={() => dispatch(setIsFromMenuVisible(false))}
                  anchor={
                    <Button
                      onPress={() => dispatch(setIsFromMenuVisible(true))}
                      mode="outlined"
                      style={styles.dropdown}>
                      {fromCurrency}
                    </Button>
                  }>
                  {currencies.map((currency) => (
                    <Menu.Item
                      key={currency}
                      onPress={() => {
                        dispatch(setFromCurrency(currency));
                        dispatch(setIsFromMenuVisible(false));
                      }}
                      title={currency}
                    />
                  ))}
                </Menu>
                <Menu
                  visible={isToMenuVisible}
                  onDismiss={() => dispatch(setIsToMenuVisible(false))}
                  anchor={
                    <Button
                      onPress={() => dispatch(setIsToMenuVisible(true))}
                      mode="outlined"
                      style={styles.dropdown}>
                      {toCurrency}
                    </Button>
                  }>
                  {currencies.map((currency) => (
                    <Menu.Item
                      key={currency}
                      onPress={() => {
                        dispatch(setToCurrency(currency));
                        dispatch(setIsToMenuVisible(false));
                      }}
                      title={currency}
                    />
                  ))}
                </Menu>
              </View>
              <Button
                mode="contained"
                onPress={handleConvert}
                style={styles.convertButton}>
                Convert
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f9f9f9', // Light background color for the card
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow radius
    elevation: 5, // Android shadow effect
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    marginBottom: 16,
    fontWeight: 'bold',
    fontSize: 24, // Larger font size for the heading
    color: '#333', // Darker color for better contrast
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  dropdown: {
    flex: 1,
    marginHorizontal: 5, // Adjusted margin for better spacing
    maxWidth: '100%',
  },
  convertButton: {
    width: '100%',
    paddingVertical: 10,
    marginTop: 16,
  },
});

export default Dashboard;
