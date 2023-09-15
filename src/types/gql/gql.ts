/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation LoginUser($username: String!, $password: String!) {\n    loginUser(username: $username, password: $password) {\n      token\n      user {\n        id\n        username\n        name\n        bio\n        followers {\n          id\n        }\n        following {\n          id\n        }\n      }\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation AddUser(\n    $username: String!\n    $password: String!\n    $name: String!\n    $bio: String\n  ) {\n    addUser(username: $username, password: $password, name: $name, bio: $bio) {\n      token\n      user {\n        id\n        username\n        name\n        password\n        bio\n        followers {\n          id\n        }\n        following {\n          id\n        }\n      }\n    }\n  }\n": types.AddUserDocument,
    "\n  mutation AddTweet($content: String!, $authorID: String!) {\n    addTweet(content: $content, authorID: $authorID) {\n      id\n      content\n    }\n  }\n": types.AddTweetDocument,
    "\n  query FollowingTweets($user_id: ID!) {\n    tweetsByFollowing(user_id: $user_id) {\n      id\n      content\n      createdAt\n      author {\n        username\n        name\n      }\n    }\n  }\n": types.FollowingTweetsDocument,
    "\n  query UsersNotFollowing($user_id: ID!) {\n    usersNotFollowing(user_id: $user_id) {\n      id\n      username\n      name\n    }\n  }\n": types.UsersNotFollowingDocument,
    "\n  query Tweets($user_id: ID!) {\n    tweets(author_id: $user_id) {\n      id\n      content\n      createdAt\n    }\n  }\n": types.TweetsDocument,
    "\n  mutation DeleteTweet($tweet_id: ID!) {\n    deleteTweet(tweet_id: $tweet_id) {\n      id\n    }\n  }\n": types.DeleteTweetDocument,
    "\n  mutation UpdateUser(\n    $user_id: String!\n    $name: String\n    $bio: String\n    $followingToAdd: [ID]\n    $followingToRemove: [ID]\n  ) {\n    updateUser(\n      user_id: $user_id\n      followingToAdd: $followingToAdd\n      followingToRemove: $followingToRemove\n      name: $name\n      bio: $bio\n    ) {\n      id\n      username\n      name\n      password\n      bio\n    }\n  }\n": types.UpdateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginUser($username: String!, $password: String!) {\n    loginUser(username: $username, password: $password) {\n      token\n      user {\n        id\n        username\n        name\n        bio\n        followers {\n          id\n        }\n        following {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($username: String!, $password: String!) {\n    loginUser(username: $username, password: $password) {\n      token\n      user {\n        id\n        username\n        name\n        bio\n        followers {\n          id\n        }\n        following {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddUser(\n    $username: String!\n    $password: String!\n    $name: String!\n    $bio: String\n  ) {\n    addUser(username: $username, password: $password, name: $name, bio: $bio) {\n      token\n      user {\n        id\n        username\n        name\n        password\n        bio\n        followers {\n          id\n        }\n        following {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddUser(\n    $username: String!\n    $password: String!\n    $name: String!\n    $bio: String\n  ) {\n    addUser(username: $username, password: $password, name: $name, bio: $bio) {\n      token\n      user {\n        id\n        username\n        name\n        password\n        bio\n        followers {\n          id\n        }\n        following {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddTweet($content: String!, $authorID: String!) {\n    addTweet(content: $content, authorID: $authorID) {\n      id\n      content\n    }\n  }\n"): (typeof documents)["\n  mutation AddTweet($content: String!, $authorID: String!) {\n    addTweet(content: $content, authorID: $authorID) {\n      id\n      content\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FollowingTweets($user_id: ID!) {\n    tweetsByFollowing(user_id: $user_id) {\n      id\n      content\n      createdAt\n      author {\n        username\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query FollowingTweets($user_id: ID!) {\n    tweetsByFollowing(user_id: $user_id) {\n      id\n      content\n      createdAt\n      author {\n        username\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UsersNotFollowing($user_id: ID!) {\n    usersNotFollowing(user_id: $user_id) {\n      id\n      username\n      name\n    }\n  }\n"): (typeof documents)["\n  query UsersNotFollowing($user_id: ID!) {\n    usersNotFollowing(user_id: $user_id) {\n      id\n      username\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Tweets($user_id: ID!) {\n    tweets(author_id: $user_id) {\n      id\n      content\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query Tweets($user_id: ID!) {\n    tweets(author_id: $user_id) {\n      id\n      content\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTweet($tweet_id: ID!) {\n    deleteTweet(tweet_id: $tweet_id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteTweet($tweet_id: ID!) {\n    deleteTweet(tweet_id: $tweet_id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser(\n    $user_id: String!\n    $name: String\n    $bio: String\n    $followingToAdd: [ID]\n    $followingToRemove: [ID]\n  ) {\n    updateUser(\n      user_id: $user_id\n      followingToAdd: $followingToAdd\n      followingToRemove: $followingToRemove\n      name: $name\n      bio: $bio\n    ) {\n      id\n      username\n      name\n      password\n      bio\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser(\n    $user_id: String!\n    $name: String\n    $bio: String\n    $followingToAdd: [ID]\n    $followingToRemove: [ID]\n  ) {\n    updateUser(\n      user_id: $user_id\n      followingToAdd: $followingToAdd\n      followingToRemove: $followingToRemove\n      name: $name\n      bio: $bio\n    ) {\n      id\n      username\n      name\n      password\n      bio\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;