import { renderHook, act } from "@testing-library/react-hooks";
import { Product } from "../shared/types";
import { useCart } from "./useCart";

/**
 * Local storage is the source of the cart information. It's not some API that
 * we're having to mock (like we do in useProducts.spec), instead we just need
 * too re-create some of the behavior of localStorage.
 * From that point, our mocked localStorage will be accessed by useCart and we
 * can do some testing. It's a pretty slick solution!
 */
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};  // Key definition is same to Flow.
  return {
    clear: () => {
      store = {}
    },
    getItem: (key: string) => {
      return store[key] || null;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value ? value.toString() : "";
    }),
  }
})();

// Hijacking the normal localStorage window variable!
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

/**
 * The author adopts a naming scheme from another source to refer to function
 * names by prefixing them with a # character. Nothing special about it, it's
 * just a style choice.
 */
describe("useCart", () => {
  afterEach(() => {
    localStorageMock.clear();
  });

  describe("on mount", () => {
    it("it loads data from localStorage", () => {
      const products: Product[] = [
        {
          name: "Product foo",
          price: 0,
          image: "image.jpg",
        },
      ];
      localStorageMock.setItem(
        "products",
        JSON.stringify(products),
      );

      const { result } = renderHook(useCart);

      expect(result.current.products).toEqual(products);
    });
  });

  describe("#addToCart", () => {
    it("adds item to the cart", () => {
      const product: Product =
      {
        name: "Product foo",
        price: 0,
        image: "image.jpg",
      };

      const { result } = renderHook(useCart);

      act(() => {
        result.current.addToCart(product);
      });

      expect(result.current.products).toEqual([product]);

      // setItem is a not-mock function. It still manages to do something. But
      // defining it as a jest.fn() we're able to check if it was called.
      // Pretty slick!
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "products",
        JSON.stringify([product]),
      );
    });
  });

  describe("#removeFromCart", () => {
    it("removes item from the cart", () => {
      const product: Product = {
        name: "Product foo",
        price: 0,
        image: "image.jpg",
      };

      localStorageMock.setItem(
        "products",
        JSON.stringify([product]),
      );

      const { result } = renderHook(useCart);

      act(() => {
        result.current.removeFromCart(product);
      });

      expect(result.current.products).toEqual([]);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "products",
        "[]",
      );
    });
  });

  describe("#totalPrice", () => {
    it("returns total products price", () => {
      const product: Product = {
        name: "Product foo",
        price: 21,
        image: "image.jpg",
      };

      localStorageMock.setItem(
        "products",
        JSON.stringify([product, product]),
      );

      const { result } = renderHook(useCart);

      expect(result.current.totalPrice()).toEqual(42);
    });
  });

  describe("#clearCart", () => {
    it("removes all the products from the cart", () => {
      const product: Product = {
        name: "Product foo",
        price: 21,
        image: "image.jpg",
      };

      localStorageMock.setItem(
        "products",
        JSON.stringify([product, product]),
      );

      const { result } = renderHook(useCart);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.products).toEqual([]);

      // This is a bit extra, but it works. Normally I wouldn't bother with this
      // check but it makes sense.
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "products",
        "[]",
      );
    });
  });
});
