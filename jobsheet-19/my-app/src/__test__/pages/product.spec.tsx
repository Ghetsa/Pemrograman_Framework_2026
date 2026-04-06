// jobsheet-19/my-app/src/__test__/pages/product.spec.tsx
import { render, screen } from "@testing-library/react"
import ProductPage from "@/pages/produk"

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/produk",
      pathname: "/produk",
      query: {},
      asPath: "/produk",
      push: jest.fn(),
    }
  },
}))

jest.mock("swr", () => ({
  __esModule: true,
  default: () => ({
    data: {
      data: [
        {
          id: "1",
          name: "Sepatu",
          price: 1000000,
          image: "/sepatu.png",
          category: "Fashion",
          size: "40",
        },
      ],
    },
    error: null,
    isLoading: false,
  }),
}))

describe("Product Page", () => {
  it("renders correctly (snapshot)", () => {
    const page = render(<ProductPage />)
    expect(page).toMatchSnapshot()
  })

  it("should show title", () => {
    render(<ProductPage />)
    expect(screen.getByTestId("title").textContent).toBe("Daftar Produk")
  })

  it("should render product item", () => {
    render(<ProductPage />)
    const items = screen.getAllByTestId("product-item")
    expect(items.length).toBe(1)
  })
})