import { gql, } from "@apollo/client";

export * from "./__generated__/IsUserLoggedIn";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;