import React from 'react';
import { ScrollView, TextInput, Button, } from 'react-native';

import styles from './styles';

interface OnButtonCallback {
  (): void;
}

interface OnTextCallback {
  (text: string | undefined): void;
}

interface ItemProps {
  login: OnButtonCallback,
  onTextChanged: OnTextCallback,
}

export const LoginScreen: React.FC<ItemProps> = ({ login, onTextChanged, }): JSX.Element => {
  return (
    <ScrollView style={styles.screen}>
      <TextInput onChangeText={onTextChanged} style={styles.input} />
      <Button title="Login" onPress={login} />
    </ScrollView>
  );
};
