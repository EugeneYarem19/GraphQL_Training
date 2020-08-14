import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { createStackNavigator, } from '@react-navigation/stack';
import { useQuery, } from "@apollo/client";
import AsyncStorage from '@react-native-community/async-storage';

import { HomeScreen, LaunchScreen, ProfileScreen, LoginScreen, } from '@src/screens';

import { IS_LOGGED_IN, IsUserLoggedIn, } from "@src/apollo/local";

export * from "./types";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackNavigation: React.FC = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name="Launches" component={HomeScreen} />
    <Stack.Screen name="Launch" component={LaunchScreen} />
  </Stack.Navigator>
);

export const Navigation: React.FC = (): JSX.Element => {
  const { data, client, } = useQuery<IsUserLoggedIn>(IS_LOGGED_IN);
  const logout = () => {
    AsyncStorage.removeItem("token");
    client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false, }, });
  }

  const loginPage = (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );

  const mainNav = (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            onPress={() => {
              props.navigation.navigate("Home");
              logout();
            }}
          />
        </DrawerContentScrollView>
      )
    }}
    >
      <Drawer.Screen name="Home" component={StackNavigation} />
      {data?.isLoggedIn && <Drawer.Screen name="Profile" component={ProfileScreen} />}
      {!data?.isLoggedIn && <Drawer.Screen name="Login" component={LoginScreen} />}
    </Drawer.Navigator>
  )

  return data?.isLoggedIn ? mainNav : loginPage;
}
