import React, { forwardRef } from "react"

type ListItem = {
  content: string
}

type ListProps = {
  top?: string | number
  left?: string | number
  right?: string | number
  bottom?: string | number
  height?: string | number
  width?: string | number
  onAction?(item: ListItem): void
  items: string[]
}

/**
 * Interesting to point out that the blessed library isn't really... imported.
 * I don't really know what's the reasoning behind it all, if it's just laziness
 * or necessity. But it's weird how the components aren't brought in specifically
 * and the hints don't really work.
 */
export const List = forwardRef<any, ListProps>(
  ({ onAction, items, ...rest }, ref) => {
    return (
      <blessed-list
        ref={ref}
        onAction={onAction}
        focused
        mouse
        keys
        vi
        items={items}
        style={{
          bg: "white",
          fg: "black",
          selected: {
            bg: "blue",
            fg: "white"
          },
          border: {
            type: 'line'
          }
        }}
        {...rest}
      />
    )
  }
)
