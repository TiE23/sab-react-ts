import React from "react"
import { Product } from "../shared/types"
import { ProductCard } from "./ProductCard"
import { useProducts } from "./useProducts"

/**
 * The author of this lesson argues that by defining the different return values
 * individually doesn't just make testing a bit easier, but actually makes
 * future development a little cleaner because it requires the coder to more
 * directly consider what values they're going to be using from the hook.
 * Effectively they'll be required to define the new values individually as they
 * add them.
 */
/*
import { Category } from "../shared/types"
interface HomeProps {
  useProductsHook?: () => {
    categories: Category[]
    isLoading: boolean
    error: boolean
  }
};
*/

/**
 * But, alternatively, this is the sleeker way of going about defining this
 * component's props.
 */
interface HomeProps {
  useProductsHook?: () => Pick<
    ReturnType<typeof useProducts>,
    "categories" | "isLoading" | "error"
  >,
};

export const Home = ({ useProductsHook = useProducts }: HomeProps) => {
  const { categories, isLoading, error } = useProductsHook()

  if (isLoading) {
    return <>Loading...</>
  }

  if (error) {
    return <>Error</>
  }

  return (
    <>
      {categories.map((category) => {
        return (
          <section key={category.name} className="nes-container with-title showcase">
            <h2 className="title">{category.name}</h2>
            <section className="items">
              {category.items.map((item: Product) => {
                return <ProductCard key={item.name} datum={item} />
              })}
            </section>
          </section>
        )
      })}
    </>
  )
}
