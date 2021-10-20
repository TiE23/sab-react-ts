import React, { useRef } from "react"
import { Panel } from "../Panel"
import { useEffect } from "react"
import open from "open"
import { gql } from "apollo-boost"
import { useQuery } from "react-apollo-hooks"
import { listIssues } from "./types/listIssues"
import { List } from "../List"

/**
 * Can see that GitHub API uses node and edge style. Never quite got why they
 * need to use nodes but eh, there you go.
 */
const LIST_ISSUES = gql`
  query listIssues {
    viewer {
      issues(first: 100) {
        nodes {
          title
          url
        }
      }
    }
  }
`

/**
 * Interesting thing about these components is that there's no loading indicator
 * or error handling. Figure he just skipped them because they load so quickly.
 * @returns Component
 */
export const ListIssues = () => {
  const { loading, error, data } = useQuery<listIssues>(LIST_ISSUES, {
    notifyOnNetworkStatusChange: true,
    pollInterval: 0,
    fetchPolicy: "no-cache"
  })

  const listRef = useRef<any>()

  const issues = data?.viewer.issues.nodes

  useEffect(() => {
    listRef.current.focus()
  }, [data])

  return (
    <Panel height={10} top="25%" left="center">
      <blessed-text
        left="center"
        bg="white"
        fg="black"
        content="List Issues"
      />

      <List
        ref={listRef}
        top={2}
        onAction={(el) =>
          open(
            issues?.find((issue) => issue?.title === el.content)
              ?.url || ""
          )
        }
        items={issues?.map((issue) => issue?.title || "") || []}
      />
    </Panel>
  )
}
