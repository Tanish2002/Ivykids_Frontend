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
        avatar {
          url
        }
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

export const REGISTERMUTATION = graphql(/* GraphQL */ `
  mutation AddUser(
    $username: String!
    $password: String!
    $name: String!
    $bio: String
    $avatar: File
  ) {
    addUser(
      username: $username
      password: $password
      name: $name
      bio: $bio
      avatar: $avatar
    ) {
      token
      user {
        id
        username
        name
        password
        bio
        avatar {
          url
        }
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
  mutation AddTweet($content: String!, $authorID: String!, $file: File) {
    addTweet(content: $content, authorID: $authorID, file: $file) {
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
        avatar {
          url
        }
      }
      media {
        url
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
      avatar {
        url
      }
    }
  }
`);

export const GETUSER = graphql(/* GraphQL */ `
  query User($user_id: ID!) {
    user(user_id: $user_id) {
      username
      name
      bio
      followers {
        id
        username
        name
        avatar {
          url
        }
      }
      following {
        id
        username
        name
        avatar {
          url
        }
      }
      avatar {
        url
      }
    }
  }
`);

export const GETUSERTWEETS = graphql(/* GraphQL */ `
  query Tweets($user_id: ID!) {
    tweets(author_id: $user_id) {
      id
      content
      createdAt
      author {
        username
        name
        avatar {
          url
        }
      }
      media {
        url
      }
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
    $avatar: File
  ) {
    updateUser(
      user_id: $user_id
      followingToAdd: $followingToAdd
      followingToRemove: $followingToRemove
      name: $name
      bio: $bio
      avatar: $avatar
    ) {
      id
      username
      name
      password
      bio
      avatar {
        url
        publicID
      }
    }
  }
`);
