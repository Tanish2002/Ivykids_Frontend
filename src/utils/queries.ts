import { graphql } from "@/types/gql";

export const LOGINMUTATION = graphql(/* GraphQL */ `
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        username
        name
        bio
        followers {
          id
        }
        following {
          id
        }
      }
    }
  }
`);

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

export const GETUSERNOTFOLLOWING = graphql(/* GraphQL */ `
  query UsersNotFollowing($user_id: ID!) {
    usersNotFollowing(user_id: $user_id) {
      id
      username
      name
    }
  }
`);

export const GETUSERTWEETS = graphql(/*GraphQL */ `
  query Tweets($user_id: ID!) {
    tweets(author_id: $user_id) {
      id
      content
      createdAt
    }
  }
`);
export const DELETETWEET = graphql(/* GraphQL */ `
  mutation DeleteTweet($tweet_id: ID!) {
    deleteTweet(tweet_id: $tweet_id) {
      id
    }
  }
`);

export const UPDATEUSER = graphql(/*GraphQL */ `
  mutation UpdateUser(
    $user_id: String!
    $name: String
    $bio: String
    $followingToAdd: [ID]
    $followingToRemove: [ID]
  ) {
    updateUser(
      user_id: $user_id
      followingToAdd: $followingToAdd
      followingToRemove: $followingToRemove
      name: $name
      bio: $bio
    ) {
      id
      username
      name
      password
      bio
    }
  }
`);
