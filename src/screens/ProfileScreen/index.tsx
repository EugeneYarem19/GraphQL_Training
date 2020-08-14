import React from 'react';
import { ActivityIndicator, Text, } from "react-native";
import { useQuery, } from "@apollo/client";

import { GET_MY_TRIPS, GetMyTrips, } from "@api/queries";

import { ProfileScreen as ProfileScreenComponent, } from './ProfileScreen';

export const ProfileScreen: React.FC = (): JSX.Element => {
  const { data, loading, error, } = useQuery<GetMyTrips, any>(
    GET_MY_TRIPS,
    { fetchPolicy: "network-only", }
  );
  
  console.warn("&&&", data);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>ERROR</Text>;
  if (!data) return <Text>Not found</Text>;

  return <ProfileScreenComponent trips={data?.me?.trips} />
};
