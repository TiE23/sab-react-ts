import { gql } from "apollo-boost"
import React, { useState } from "react"
import { useApolloClient, useMutation } from "react-apollo-hooks"
import { Field } from "../Field"
import { Form, FormValues } from "../Form"
import { Panel } from "../Panel"
import { NewIssueSuccess } from "./NewIssueSuccess"
import {
  createNewIssue,
  createNewIssueVariables,
  createNewIssue_createIssue_issue
} from "./types/createNewIssue"
import { GET_REPOSITORY } from "../queries/getRepository"
import { getRepository, getRepositoryVariables } from "../queries/types/getRepository"

const CREATE_ISSUE = gql`
  mutation createNewIssue(
    $title: String!   # Updated API states this is required
    $body: String
    $repository: ID!  # Updated API states this is required
  ) {
    createIssue(
      input: { title: $title, body: $body, repositoryId: $repository }
    ) {
      issue {
        title
        url
      }
    }
  }
`

export const NewIssue = () => {
  const [
    issue,
    setIssue
  ] = useState<createNewIssue_createIssue_issue | null>()

  /**
   * The useMutation hook, we call this later to perform the actual mutation.
   */
  const [createIssue] = useMutation<
    createNewIssue,
    createNewIssueVariables
  >(CREATE_ISSUE)

  const client = useApolloClient()

  const onSubmit = async (values: FormValues) => {
    const [repo, title, body] = values.textbox
    const [owner, name] = repo.split("/")

    /**
     * First we grab the repository using the operator we import from the shared
     * queries file.
     */
    const { data } = await client.query<
      getRepository,
      getRepositoryVariables
    >({
      query: GET_REPOSITORY,
      variables: {
        owner,
        name
      }
    })

    /**
     * No error handling or anything. Kinda lame. But eh, it's a lesson.
     */
    if (!data || !data.repository) {
      return
    }

    const result = await createIssue({
      variables: {
        title,
        body,
        repository: data.repository.id
      }
    })

    setIssue(result.data?.createIssue?.issue)
  }

  /**
   * Not using routing to forward you. Instead, just returning a different
   * component when a new issue is created.
   */
  if (issue) {
    return <NewIssueSuccess issue={issue} />
  }

  /**
   * Take a look at Form.tsx for notes on how we need to do a hacky method to
   * support submit functionality correctly.
   */
  return (
    <Panel top="25%" left="center" height={10}>
      <blessed-text
        left="center"
        bg="white"
        fg="black"
        content="New Issue"
      />
      <Form onSubmit={onSubmit}>
        {(triggerSubmit) => {
          return (
            <>
              <Field
                top={0}
                label="Repo: "
                onSubmit={triggerSubmit}
              />
              <Field
                top={1}
                label="Title: "
                onSubmit={triggerSubmit}
              />
              <Field
                top={2}
                label="Body: "
                onSubmit={triggerSubmit}
              />
            </>
          )
        }}
      </Form>
      <blessed-text
        left="center"
        bg="white"
        fg="black"
        bottom={1}
        content="Tab: Next Field"
      />
      <blessed-text
        left="center"
        bg="white"
        fg="black"
        bottom={0}
        content="Enter: Submit"
      />
    </Panel>
  )
}
