import { gql } from "apollo-boost"
import React, { useState } from "react"
import { useMutation } from "react-apollo-hooks"
import { Field } from "../Field"
import { Form, FormValues } from "../Form"
import { Panel } from "../Panel"
import { NewRepositorySuccess } from "./NewRepositorySuccess"
import {
  createNewRepository_createRepository_repository,
  createNewRepository,
  createNewRepositoryVariables,
} from "./types/createNewRepository"
import { RepositoryVisibility } from "../types/graphql-global-types"

/**
 * Here's our first mutation example. You'll see that there's a matching type
 * available at ./types/createNewRepository.ts to handle the return values.
 */
const CREATE_REPOSITORY = gql`
  mutation createNewRepository(
    $name: String!
    $description: String!
    $visibility: RepositoryVisibility!
  ) {
    createRepository(
      input: {
        name: $name
        description: $description
        visibility: $visibility
      }
    ) {
      repository {
        name
        url
        id
      }
    }
  }
`

export const NewRepository = () => {
  /**
   * We need to keep track of any new repository we create successfully so we
   * put a useState function here and give it the type that was created for us.
   * The name of the type isn't very wieldy but it appears to be based off
   * what we name the operation, the mutation itself, and the root payload.
   * ->         createNewRepository     createRepository          repository
   * The file itself is named after our operation.
   * -> https://graphql.org/learn/queries/#operation-name
   * -> https://graphql.org/learn/queries/#mutations
   */
  const [
    repository,
    setRepository
  ] = useState<createNewRepository_createRepository_repository | null>()

  /**
   * Here is our mutation. useMutation() is a hook that is activated when you
   * call the returned variable later.
   */
  const [createRepository] = useMutation<
    createNewRepository,
    createNewRepositoryVariables
  >(CREATE_REPOSITORY)

  const onSubmit = async (values: FormValues) => {
    const [name, description] = values.textbox

    /**
     * Here we use the mutation. We provide the necessary variables indicated
     * by createNewRepositoryVariables. If you erase some of the variables
     * Intellisense will let you know you're missing some values.
     * We get the visiblity from the generated types as well.
     */
    const result = await createRepository({
      variables: {
        name,
        description,
        visibility: RepositoryVisibility.PUBLIC
      }
    })

    setRepository(result.data?.createRepository?.repository)
  }

  if (repository) {
    return <NewRepositorySuccess repository={repository} />
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
        content="New repository"
      />
      <Form onSubmit={onSubmit}>
        {(triggerSubmit) => {
          return (
            <>
              <Field
                top={0}
                label="Name: "
                onSubmit={triggerSubmit}
              />
              <Field
                top={1}
                label="Description: "
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
