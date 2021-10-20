import React from "react"
import { gql } from "apollo-boost"
import { useQuery } from "react-apollo-hooks"
import { getUserInfo } from "./types/getUserInfo"

const GET_USER_INFO = gql`
  query getUserInfo {
    viewer {
      name
      bio
    }
  }
`

/**
 * Types are defined later through a codegen system provided by Apollo.
 * But before that point we needed this type to be defined.
 *
 * You're able to download the schema using Apollo hooking direct into the api
 * endpoint URL and generating a JSON from it. Pretty damn cool.
 * `yarn run apollo schema:download --header="Authorization:\
 *  Bearer c55448233ba17de366e633fb59a39733dcb3536f"\
 *  --endpoint=https://api.github.com/graphql graphql-schema.json`
 *
 * Then, you're able to codegen the types with this command:
 * `yarn run apollo codegen:generate --localSchemaFile=graphql-schema.json\
 * --target=typescript --tagName=gql --addTypename\
 * --globalTypesFile=src/types/graphql-global-types.ts types`
 *
 * What this ends up doing is Apollo looks through your entire project looking
 * for GraphQL code and generates a new ./types directory next to these files
 * and within them new saves type definitions.
 *
 * You need to re-run that second script every time you write a new GraphQL
 * query/mutation. That'll get you the type definitions you need to write
 * the rest of your code.
 */
type UserInfoData = {
  viewer: {
    name: string
    bio: string
  }
};

export const WelcomeWindow = () => {
  // Before codegen and getUserInfo interface, we had to write "useQuery<UserInfoData>".
  const { loading, data } = useQuery<getUserInfo>(GET_USER_INFO, {
    notifyOnNetworkStatusChange: true,
    pollInterval: 0,
    fetchPolicy: "no-cache"
  })

  if (loading) {
    return null
  }

  return (
    <blessed-box
      draggable
      focused
      width="50%"
      height="50%"
      left="25%"
      top="25%"
      mouse
      shadow
      border={{
        type: "line"
      }}
      keys
      align="center"
      style={{
        bg: "white",
        shadow: true,
        border: {
          bg: "white",
          fg: "black"
        },
        label: {
          bg: "white",
          fg: "black"
        }
      }}
      vi
    >
      <blessed-text
        left="center"
        bg="white"
        fg="black"
        content="Welcome to Github Manager"
      />
      <blessed-text
        top={3}
        bg="white"
        fg="black"
        content={`Name: ${data?.viewer.name}`}
      />
      <blessed-text
        top={5}
        bg="white"
        fg="black"
        content={`Bio: ${data?.viewer.bio}`}
      />

    </blessed-box>
  )
}
