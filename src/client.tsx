import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const headers = {
  "x-hasura-admin-secret":
    "8qkOnLoc91V5iJ3hbNENZSwd62GUhq1Vr7S1yUe5AUzTmbgRTom0DpqD5PelixSC",
};

const URL_BASE = "precise-bulldog-97.hasura.app/v1/graphql";
const httpLink = new HttpLink({ uri: `https://${URL_BASE}`, headers });

const wsLink = new WebSocketLink({
  uri: `wss://${URL_BASE}`,
  options: {
    connectionParams: {
      headers,
    },
  },
});

export const createApolloClient = () =>
  new ApolloClient({
    name: "web-link",
    version: "2.1",
    link: httpLink,
    cache: new InMemoryCache(),
  });

export const createWSClient = () =>
  new ApolloClient({
    name: "ws-link",
    version: "2.1",
    link: wsLink,
    cache: new InMemoryCache(),
  });
