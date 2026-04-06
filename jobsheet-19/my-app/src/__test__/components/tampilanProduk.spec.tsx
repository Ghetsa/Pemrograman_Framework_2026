import { render, screen } from "@testing-library/react"
import TampilanProduk from "@/views/produk"

// MOCK next/image biar gak error
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />
})

describe("TampilanProduk Component", () => {
  const mockProducts = [
    {
      id: "1",
      name: "HP",
      price: 2000000,
      image: "/hp.png",
      category: "Elektronik",
    },
  ]

  it("renders correctly (snapshot)", () => {
    const page = render(<TampilanProduk products={mockProducts} />)
    expect(page).toMatchSnapshot()
  })

  it("should display title", () => {
    render(<TampilanProduk products={mockProducts} />)
    expect(screen.getByTestId("title").textContent).toBe("Daftar Produk")
  })

  it("should show product", () => {
    render(<TampilanProduk products={mockProducts} />)
    const item = screen.getAllByTestId("product-item")
    expect(item.length).toBe(1)
  })

  it("should show skeleton if empty", () => {
    render(<TampilanProduk products={[]} />)
    expect(screen.getByTestId("skeleton")).toBeTruthy()
  })
})