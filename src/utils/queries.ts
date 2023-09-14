import { graphql } from "@/types/gql";

export const LOGINMUTATION = /* GraphQL */ `
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        username
        name
        bio
      }
    }
  }
`;

export const ADDTWEET = graphql(/* GraphQL */ `
  mutation AddTweet($content: String!, $authorID: String!) {
    addTweet(content: $content, authorID: $authorID) {
      id
      content
    }
  }
`);

export const GETFOLLOWINGTWEETS = graphql(/* GraphQL */ `
  query FollowingTweets($user_id: ID!) {
    tweetsByFollowing(user_id: $user_id) {
      id
      content
      createdAt
      author {
        username
        name
      }
    }
  }
`);
