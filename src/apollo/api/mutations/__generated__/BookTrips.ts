/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BookTrips
// ====================================================

export interface BookTrips_bookTrips_launches_rocket {
  __typename: "Rocket";
  id: string;
  name: string | null;
}

export interface BookTrips_bookTrips_launches_mission {
  __typename: "Mission";
  name: string | null;
  missionPatch: string | null;
}

export interface BookTrips_bookTrips_launches {
  __typename: "Launch";
  id: string;
  isBooked: boolean;
  rocket: BookTrips_bookTrips_launches_rocket | null;
  mission: BookTrips_bookTrips_launches_mission | null;
}

export interface BookTrips_bookTrips {
  __typename: "TripUpdateResponse";
  message: string | null;
  success: boolean;
  launches: (BookTrips_bookTrips_launches | null)[] | null;
}

export interface BookTrips {
  bookTrips: BookTrips_bookTrips;
}

export interface BookTripsVariables {
  launchIds: (string | null)[];
}
