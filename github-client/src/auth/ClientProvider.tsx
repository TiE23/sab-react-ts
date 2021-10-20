import React, { FC, PropsWithChildren } from "react"
import { useState } from "react"
import { useEffect } from "react"
import * as keytar from "keytar"
import { getCode } from "./getCode"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo-hooks"

const GITHUB_BASE_URL = "https://api.github.com/graphql"

export const ClientProvider: FC<PropsWithChildren<{}>> = ({
  children
}) => {
  const [token, setToken] = useState<string>()

  /**
   * Pretty basic method of placing Apollo's client as a provider component
   * and using this hook to grab the token.
   * I will say, I don't like how the author named these functions and variables.
   * It's the token, but the function to get it is `getCode()` and the variable
   * it is saved to is `key`. That's annoying.
   * keytar is a cool library that takes care of keeping your token secure in
   * the OS's own credentials management system.
   */
  useEffect(() => {
    const getToken = async () => {
      let key: any = await keytar.getPassword(
        "github",
        process.env.CLIENT_ID!
      )
      if (!key) {
        key = await getCode()
      }
      setToken(key)
    }
    getToken()
  }, [])

  if (!token) {
    return <>Loading...</>
  }

  /**
   * Here we build the ApolloClient, which involves a two-step process of gaining
   * a token from GitHub. We get that with the useEffect hook above.
   */
  const client = new ApolloClient({
    uri: GITHUB_BASE_URL,
    request: (operation) => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
