import React, {useCallback,} from 'react';
import { ActivityIndicator, Text, } from "react-native";

import { StackActions, } from '@react-navigation/native';
import { useQuery, } from "@apollo/client";

import { GET_LAUNCHES, launchList, launchListVariables, } from "@api/queries";

import { StackNavigationProp, } from "@react-navigation/stack";
import { RootStackParamList, } from "@src/navigation";

import { HomeScreen as HomeScreenComponent, } from './HomeScreen';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Launches'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = ({navigation,}): JSX.Element => {  
  const { data, loading, error, fetchMore, } = useQuery<launchList, launchListVariables>(GET_LAUNCHES);

  // console.warn("loading", loading);
  console.warn("@@@", data);

  const onEndReached = () => {
    if (data?.launches.hasMore) {
      // console.warn("???");
      fetchMore({
        variables: {after: data.launches.cursor,},
        updateQuery: (prev, { fetchMoreResult, }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...fetchMoreResult,
            launches: {
              ...fetchMoreResult.launches,
              launches: [
                ...prev.launches.launches,
                ...fetchMoreResult.launches.launches,
              ],
            },
          };
        },
      });
    }
  }

  const onItemPress = useCallback((id) => navigation.dispatch(StackActions.push('Launch', { launchId: id, })), [navigation,]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>ERROR</Text>;
  if (!data) return <Text>Not found</Text>;

  return <HomeScreenComponent data={data?.launches?.launches} onEndReached={onEndReached} onItemPress={onItemPress} />
};
