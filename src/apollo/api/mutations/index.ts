import { gql, } from "@apollo/client";

export * from "./__generated__/login";
export * from "./__generated__/BookTrips";

import { LAUNCH_TILE_DATA, } from "@api/fragments";

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export const BOOK_TRIPS = gql`
mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
        message
        success
        launches {
            ...LaunchTile
        }
    }
}
${LAUNCH_TILE_DATA}
`;
