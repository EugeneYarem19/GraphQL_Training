/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,} from "react";

import {ApolloProvider,} from "@apollo/client";
import { NavigationContainer, } from '@react-navigation/native';

import { Navigation, } from "@src/navigation";
import { client, initializeClient, } from "@src/apollo";

const App: React.FC = (): JSX.Element => {
  useEffect(() => { initializeClient() }, []);
  
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
