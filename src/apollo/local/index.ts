import { gql, } from '@apollo/client';

export * from "./queries";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;