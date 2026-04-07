import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import Navbar from "../../components/layouts/navbar"

// Mock next-auth
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

jest.mock("next/image", () => (props: any) => {
  return <img {...props} />
})

jest.mock("next/link", () => {
  return ({ children }: any) => children
})

jest.mock("next/dist/client/script", () => {
  return ({ children }: any) => <>{children}</>
})

describe("Navbar Component", () => {
  const { useSession, signIn, signOut } = require("next-auth/react")

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // 1. Snapshot Test
  it("should match snapshot", () => {
    useSession.mockReturnValue({ data: null })

    const { asFragment } = render(<Navbar />)
    expect(asFragment()).toMatchSnapshot()
  })

  // 2. getByTestId + toBe()
  it("should render navbar", () => {
    useSession.mockReturnValue({ data: null })

    render(<Navbar />)

    const navbar = screen.getByTestId("navbar")
    expect(navbar).toBeInTheDocument() // toBe()
  })

  // 3. Sign In muncul (getByTestId)
  it("should show Sign In button when not logged in", () => {
    useSession.mockReturnValue({ data: null })

    render(<Navbar />)

    const button = screen.getByTestId("signin-button")
    expect(button).toBeInTheDocument()
    expect(button.textContent).toBe("Sign In") // toBe()
  })

  // 4. Klik Sign In
  it("should call signIn when clicked", () => {
    useSession.mockReturnValue({ data: null })

    render(<Navbar />)

    const button = screen.getByTestId("signin-button")
    fireEvent.click(button)

    expect(signIn).toHaveBeenCalled()
  })

  // 5. User login tampil
  it("should show user data when logged in", () => {
    useSession.mockReturnValue({
      data: {
        user: {
          fullname: "Lilisya",
          image: "/user.jpg",
        },
      },
    })

    render(<Navbar />)

    expect(screen.getByText(/Welcome, Lilisya/i)).toBeInTheDocument()
  })

  // 6. Avatar tampil (getByTestId)
  it("should render user image", () => {
    useSession.mockReturnValue({
      data: {
        user: {
          fullname: "Lilisya",
          image: "/user.jpg",
        },
      },
    })

    render(<Navbar />)

    const image = screen.getByTestId("user-image")
    expect(image).toBeInTheDocument()
  })

  // 7. Klik Sign Out
  it("should call signOut when clicked", () => {
    useSession.mockReturnValue({
      data: {
        user: {
          fullname: "Lilisya",
          image: "/user.jpg",
        },
      },
    })

    render(<Navbar />)

    const button = screen.getByTestId("signout-button")
    fireEvent.click(button)

    expect(signOut).toHaveBeenCalled()
  })
})