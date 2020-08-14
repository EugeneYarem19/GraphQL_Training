import React from 'react';
import {FlatList, View,} from 'react-native';

import { ListItem, } from '@components/ListItem';

import { launchList_launches_launches, } from "@api/queries";

import styles from './styles';

interface Callback {
  (id: string | undefined): void;
}

interface ItemProps {
  data: (launchList_launches_launches | null)[],
  onItemPress: Callback,
  onEndReached: () => void;
}

export const HomeScreen: React.FC<ItemProps> = ({ data, onItemPress, onEndReached, }): JSX.Element => {
  // console.warn('posts', posts);

  return (
    <View style={styles.screen}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, }) => (
          <ListItem mission={item.mission} rocket={item.rocket} onPress={() => onItemPress(item.id)} isBooked={item?.isBooked || false} />
        )}
        onEndReachedThreshold={0}
        onEndReached={onEndReached}
      />
    </View>
  );
};
