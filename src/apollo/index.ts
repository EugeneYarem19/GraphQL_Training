import { ApolloClient, InMemoryCache, } from "@apollo/client";
import { HttpLink, } from 'apollo-link-http';
import { setContext, } from "apollo-link-context";
import { concatPagination, } from "@apollo/client/utilities";
import AsyncStorage from '@react-native-community/async-storage';

import { IS_LOGGED_IN, typeDefs, } from './local';

const authorizationLink = setContext(async (request, previousContext) => {
  const token = await AsyncStorage.getItem("token");
  // console.warn("/////", token);
  return {
    ...previousContext,
    headers: {
      ...previousContext.headers,
     authorization: token,
    },
  };
});

const link = new HttpLink({ uri: "http://localhost:4000/", });

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  link: authorizationLink.concat(link),
    cache: new InMemoryCache(/* {
    typePolicies: {
      Query: {
        fields: {
          launches: concatPagination(),{
            merge(prev = {}, incoming: launchList) {
              
              console.warn("!", prev?.launches?.launches);
              console.warn("?", incoming?.launches?.launches);

              if (!incoming) return prev;

              return { ...prev, ...incoming, }

              return {
                ...incoming,
                launches: {
                  ...incoming.launches,
                  launches: [
                    ...(prev?.launches?.launches ? prev.launches.launches : []),
                    ...(incoming?.launches?.launches ? incoming.launches.launches : []),
                  ],
                },
              };

              // return [...existing, ...incoming];
            },
          },
        },
      },
    },
  } */),
    typeDefs,
});

export const initializeClient = async (): Promise<any> => {
  const token = await AsyncStorage.getItem("token");

  client.cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {isLoggedIn: token?.length,},
  })
}
