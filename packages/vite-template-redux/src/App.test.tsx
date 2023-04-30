import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "./App"

describe("Simple working test", () => {
  it("the title is visible", () => {
    render(<App />)
    expect(screen.getByText("Vite + React")).toBeInTheDocument()
  })

  it("should increment count on click", async () => {
    render(<App />)
    const counter = screen.getByRole("button", { name: /count is/i })
    expect(counter.textContent).toBe("count is 0")
    await userEvent.click(counter)
    expect(counter.textContent).toBe("count is 1")
  })
})
