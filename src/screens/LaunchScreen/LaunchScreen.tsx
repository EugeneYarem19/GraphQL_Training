import React from 'react';
import { Image, ScrollView, Text, View, Button, } from 'react-native';

import { LaunchDetails_launch_mission, LaunchDetails_launch_rocket, } from "@api/queries";

import styles from './styles';

interface Callback {
  (): void;
}

interface ItemProps {
  isBooked: boolean | null | undefined,
  mission: LaunchDetails_launch_mission | null | undefined,
  rocket: LaunchDetails_launch_rocket | null | undefined,
  bookTrip: Callback,
}

export const LaunchScreen: React.FC<ItemProps> = ({ isBooked, mission, rocket, bookTrip, }): JSX.Element => (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>{mission ? mission.name : "Unnamed"}</Text>
      {mission?.missionPatch && <Image source={{ uri: mission?.missionPatch, }} style={styles.image} />}
      <View>
        <Text style={styles.label}>Rocket: </Text>
        <Text style={styles.text}>{rocket ? rocket.name : "Unnamed"}</Text>
      </View>
    {!isBooked && <Button title="Book me!" onPress={bookTrip} />}
    </ScrollView>
);