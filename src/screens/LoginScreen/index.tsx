import React, {useState, useCallback,} from 'react';
import { ActivityIndicator, Text, } from "react-native";
import { useApolloClient, useMutation, ApolloClient, } from "@apollo/client";
import AsyncStorage from '@react-native-community/async-storage';

import { GET_LAUNCHES, } from "@api/queries";
import { LOGIN_USER, login as loginType, loginVariables, } from "@api/mutations";
import { IS_LOGGED_IN, } from "@src/apollo/local";

import { LoginScreen as LoginScreenComponent, } from './LoginScreen';

export const LoginScreen: React.FC = (): JSX.Element => {
  const client: ApolloClient<any> = useApolloClient();
  const [login, { loading, error, },] = useMutation<loginType, loginVariables>(LOGIN_USER,
    {
      onCompleted: async ({ login: resultLogin, }) => {
        client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: true, }, });
        // console.warn("token", resultLogin);
        await AsyncStorage.setItem('token', resultLogin as string);
        const data = await client.query({ query: GET_LAUNCHES, fetchPolicy: "network-only", });
        // console.warn("updated data", data);
      },
      update(cache) {
        cache.writeQuery({query: GET_LAUNCHES, data: {launches: {},},});
      },
    });
  
  const [currentEmail, setCurrentEmail,] = useState("");

  const onTextChanged = useCallback((text) => setCurrentEmail(text), [setCurrentEmail,]);
  
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>ERROR</Text>;

  return <LoginScreenComponent login={() => login({ variables: { email: currentEmail, }, })} onTextChanged={onTextChanged} />
};
