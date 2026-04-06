// jobsheet-19/my-app/src/__test__/pages/about.spec.tsx

import { render, screen } from "@testing-library/react"
import AboutPage from "@/pages/about"

describe("About Page", () => {
  it("renders correctly", () => {
    const page = render(<AboutPage />)
    expect(screen.getByTestId("title").textContent).toBe("About Page")
    expect(page).toMatchSnapshot()
  })
})