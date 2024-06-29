// src/screens/Conversion.js
import * as React from 'react';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, Button, Provider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { convertCurrency } from '../store/currencySlice';

const Conversion = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { amount, fromCurrency, toCurrency } = route.params;
  const { convertedAmount, status } = useSelector((state) => state.currency);

  useEffect(() => {
    dispatch(convertCurrency({ amount, fromCurrency, toCurrency }));
  }, [amount, fromCurrency, toCurrency, dispatch]);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {status === 'loading' && <Text>Loading...</Text>}
          {status === 'succeeded' && convertedAmount !== null && (
            <Text variant="headlineLarge" style={styles.result}>
              {`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`}
            </Text>
          )}
          {status === 'failed' && (
            <Text style={styles.error}>Conversion failed. Please try again.</Text>
          )}
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            Back to Dashboard
          </Button>
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  result: {
    marginBottom: 16,
  },
  backButton: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default Conversion;
