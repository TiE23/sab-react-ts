import open from "open"
import React, { useRef, useEffect, FC } from "react"
import { Panel } from "../Panel"
import { createNewRepository_createRepository_repository } from "./types/createNewRepository"

type NewIssueSuccessProps = {
  repository: createNewRepository_createRepository_repository;
}

export const NewRepositorySuccess:FC<NewIssueSuccessProps> = ({repository}) => {
  const ref = useRef<any>()

  /**
   * Like other components, we offer keyboard shortcuts by putting this in a
   * useEffect hook. Other keyboard shortcuts were defined in other specific
   * ways. To use keys in a component this is the way to do them, by using a ref
   * for the elements we use.
   */
  useEffect(() => {
    ref.current.key("o", () => open(repository.url))
  }, [])

  return (
    <Panel ref={ref} top="25%" left="center" height={10}>
      <blessed-text
        left="center"
        bg="white"
        fg="black"
        content="Repository Created"
      />

      <blessed-text
        left="center"
        top={3}
        bg="white"
        fg="black"
        content="o: Open Repository in Browser"
      />
    </Panel>
  )
}
