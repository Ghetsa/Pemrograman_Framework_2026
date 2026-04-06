import { render, screen } from "@testing-library/react"
import HalamanProduk, {
  getStaticProps,
  getStaticPaths,
} from "@/pages/produk/[produk]"

// mock fetch
global.fetch = jest.fn()

describe("Detail Product Page", () => {
  const mockProduct = {
    id: "1",
    name: "Sepatu",
    price: 1000000,
    image: "/sepatu.png",
    category: "Fashion",
    size: "40",
  }

  // ✅ snapshot
  it("renders correctly (snapshot)", () => {
    const page = render(<HalamanProduk product={mockProduct} />)
    expect(page).toMatchSnapshot()
  })

  // ✅ UI test
  it("should show product detail", () => {
    render(<HalamanProduk product={mockProduct} />)

    expect(screen.getByTestId("title").textContent).toBe("Detail Produk")
    expect(screen.getByTestId("product-name").textContent).toBe("Sepatu")
    expect(screen.getByTestId("product-category").textContent).toBe("Fashion")
  })

  // ✅ TEST getStaticPaths
  it("should generate static paths", async () => {
    ; (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        data: [{ id: "1" }, { id: "2" }],
      }),
    })

    const result = await getStaticPaths()

    expect(result.paths.length).toBe(2)
    expect(result.fallback).toBe(false)
  })

  // ✅ TEST getStaticProps
  it("should fetch product detail", async () => {
    ; (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        data: mockProduct,
      }),
    })

    const result = await getStaticProps({
      params: { produk: "1" },
    } as any)

    expect(result.props.product.name).toBe("Sepatu")
  })
})