import React from 'react';
import { FlatList, View, } from 'react-native';

import { ListItem, } from "@components/ListItem";

import { GetMyTrips_me_trips, } from "@api/queries";

import styles from './styles';

interface ItemProps {
  trips: (GetMyTrips_me_trips | null)[] | undefined,
}

export const ProfileScreen: React.FC<ItemProps> = ({ trips, }): JSX.Element => {
  return (
    <View style={styles.screen}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item, }) => (
          <ListItem mission={item.mission} rocket={item.rocket} onPress={() => null} isBooked />
        )}
      />
    </View>
  );
};
