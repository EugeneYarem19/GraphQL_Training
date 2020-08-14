import React from 'react';
import { ActivityIndicator, Text, Alert, } from "react-native";
import { RouteProp, } from '@react-navigation/native';
import { useQuery, useMutation, } from "@apollo/client";

import { GET_LAUNCH_DETAILS, LaunchDetails, LaunchDetailsVariables, } from "@api/queries";
import { BOOK_TRIPS, BookTrips, BookTripsVariables, } from "@api/mutations";

import { RootStackParamList, } from "@src/navigation";

import { LaunchScreen as LaunchScreenComponent, } from './LaunchScreen';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Launch'>;

type Props = {
  route: ProfileScreenRouteProp;
};

export const LaunchScreen: React.FC<Props> = ({ route, }): JSX.Element => {
  const { data, loading, error, } = useQuery<LaunchDetails, LaunchDetailsVariables>(GET_LAUNCH_DETAILS, { variables: { launchId: route.params.launchId, }, });
  const [bookTrips,] = useMutation<BookTrips, BookTripsVariables>(BOOK_TRIPS,
    {
      variables: { launchIds: [route.params.launchId,], },
      onCompleted({bookTrips : {success, message,},}) {
        if (success) {
          Alert.alert("Launch was booked");
        } else {
          Alert.alert("Error", message as string);
        }
      },
    });
  
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>ERROR</Text>;
  if (!data) return <Text>Not found</Text>;

  return (
    <LaunchScreenComponent
      isBooked={data?.launch?.isBooked}
      mission={data?.launch?.mission}
      rocket={data?.launch?.rocket}
      bookTrip={() => bookTrips()}
    />
)
};
