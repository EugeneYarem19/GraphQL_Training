import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';

import { launchList_launches_launches_mission, launchList_launches_launches_rocket, } from "@api/queries";

import styles from './styles';

interface Callback {
  (): void;
}

interface ItemProps {
  isBooked: boolean,
  mission: launchList_launches_launches_mission | null,
  rocket: launchList_launches_launches_rocket | null,
  onPress: Callback
}

export const ListItem: React.FC<ItemProps> = ({ isBooked, mission, rocket, onPress, }): JSX.Element => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.leftBlock}>
      <Text style={styles.title}>{mission ? mission.name : "Unnamed"}</Text>
      <View>
        <Text style={styles.label}>Rocket: </Text>
        <Text style={styles.text}>{rocket ? rocket.name : "Unnamed"}</Text>
      </View>
    </View>
    <View style={styles.rightBlock}>
      {isBooked ? <View style={styles.booked} /> : <View style={styles.noBooked} />}
    </View>
  </TouchableOpacity>
);
