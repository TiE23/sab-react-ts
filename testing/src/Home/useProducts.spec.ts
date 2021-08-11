import { renderHook, act } from "@testing-library/react-hooks";
import { useProducts } from "./useProducts";

describe("useProducts", () => {
  it("fetches products on mount", async () => {
    const mockApiGetProducts = jest.fn();

    await act(async () => {
      renderHook(() => useProducts(mockApiGetProducts));
    });

    expect(mockApiGetProducts).toHaveBeenCalled();
  });

  describe("while waiting API response", () => {
    it("returns correct loading state data", () => {
      const mockApiGetProducts = jest.fn(
        () => new Promise(() => {}),  // Mocking the API: it's a promise!
        // Do pay attention: it never resolves or rejects.
      );

      const { result } = renderHook(() => useProducts(mockApiGetProducts));

      expect(result.current.isLoading).toEqual(true);
      expect(result.current.error).toEqual(false);
      expect(result.current.categories).toEqual([]);
    });
  });

  describe("with error response", () => {
    it("returns error state data", async () => {
      // Here we mock a failing promise, rejected with a string. Useful!
      const mockApiGetProducts = jest.fn(
        () => new Promise((_, reject) => {
          reject("Error");
        }),
      );

      const { result, waitForNextUpdate } = renderHook(() =>
        useProducts(mockApiGetProducts),
      );

      // The fetching happens in renderHook. With act() the test will continue
      // when the component updates (the mock api returns).
      // https://react-hooks-testing-library.com/reference/api#async-utilities
      await act(() => waitForNextUpdate());

      expect(result.current.isLoading).toEqual(false);
      expect(result.current.error).toEqual("Error");
      expect(result.current.categories).toEqual([]);
    });
  });

  describe("with successful response", () => {
    it("returns successful state data", async () => {
      const mockApiGetProducts = jest.fn(
        () =>
          new Promise((resolve, _) => {
            resolve({
              categories: [{ name: "Category", items: [] }],
            });
          }),
      );

      const { result, waitForNextUpdate } = renderHook(() =>
        useProducts(mockApiGetProducts),
      );

      await act(() => waitForNextUpdate());

      expect(result.current.isLoading).toEqual(false);
      expect(result.current.error).toEqual(false);
      expect(result.current.categories).toEqual([
        {
          name: "Category",
          items: [],
        },
      ]);
    });
  });
});