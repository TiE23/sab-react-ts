import React, { FC, ReactNode, useRef } from "react"

export type FormValues = {
  textbox: string[]
}

/**
 * Here we define the children to be a function. We need to do this to be able
 * to send the triggerSubmit function to form children. Unfortunately react-blessed
 * does not trigger the form onSubmit automatically when its inputs are submitted,
 * so we have to have this hack here.
 */
type FormProps = {
  onSubmit(values: FormValues): void
  children(triggerSubmit: () => void): ReactNode
}

export const Form: FC<FormProps> = ({ children, onSubmit }) => {
  const form = useRef<any>()

  const triggerSubmit = () => {
    form.current.submit()
  }

  /**
   * The author doesn't explain why he uses setTimeout() in such a strange way.
   * The documentation explains that 0 isn't accepted - the minimum time is 1ms.
   */
  React.useEffect(() => {
    setTimeout(() => {
      form.current.focus()
    }, 0)
  }, [])

  return (
    <blessed-form
      top={3}
      keys
      focused
      ref={form}
      style={{
        bg: "white"
      }}
      onSubmit={onSubmit}
    >
      {children(triggerSubmit)}
    </blessed-form>
  )
}
