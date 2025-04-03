import { act, screen } from "@testing-library/react"
import { App } from "./App"
import { renderWithProviders } from "./utils/test-utils"

test("App should have correct initial render", () => {
  renderWithProviders(<App />)

  const countLabel = screen.getByLabelText("Count")

  const incrementValueInput = screen.getByLabelText("Set increment amount")

  // The app should be rendered correctly
  expect(screen.getByText(/learn/i)).toBeInTheDocument()

  // Initial state: count should be 0, incrementValue should be 2
  expect(countLabel).toHaveTextContent("0")
  expect(incrementValueInput).toHaveValue(2)
})

test("Increment value and Decrement value should work as expected", async () => {
  const { user } = renderWithProviders(<App />)

  const countLabel = screen.getByLabelText("Count")

  const incrementValueButton = screen.getByLabelText("Increment value")

  const decrementValueButton = screen.getByLabelText("Decrement value")

  // Click on "+" => Count should be 1
  await user.click(incrementValueButton)
  expect(countLabel).toHaveTextContent("1")

  // Click on "-" => Count should be 0
  await user.click(decrementValueButton)
  expect(countLabel).toHaveTextContent("0")
})

test("Add Amount should work as expected", async () => {
  const { user } = renderWithProviders(<App />)

  const countLabel = screen.getByLabelText("Count")

  const incrementValueInput = screen.getByLabelText("Set increment amount")

  const addAmountButton = screen.getByText("Add Amount")

  // "Add Amount" button is clicked => Count should be 2
  await user.click(addAmountButton)
  expect(countLabel).toHaveTextContent("2")

  // incrementValue is 2, click on "Add Amount" => Count should be 4
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "2")
  await user.click(addAmountButton)
  expect(countLabel).toHaveTextContent("4")

  // [Negative number] incrementValue is -1, click on "Add Amount" => Count should be 3
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "-1")
  await user.click(addAmountButton)
  expect(countLabel).toHaveTextContent("3")
})

it("Add Async should work as expected", async () => {
  jest.useFakeTimers()

  const { user } = renderWithProviders(<App />, {
    userEventOptions: { advanceTimers: jest.runOnlyPendingTimers },
  })

  const addAsyncButton = screen.getByText("Add Async")

  const countLabel = screen.getByLabelText("Count")

  const incrementValueInput = screen.getByLabelText("Set increment amount")

  await user.click(addAsyncButton)

  act(() => {
    jest.advanceTimersByTime(500)
  })

  // "Add Async" button is clicked => Count should be 2
  expect(countLabel).toHaveTextContent("2")

  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "2")

  await user.click(addAsyncButton)

  act(() => {
    jest.advanceTimersByTime(500)
  })

  // incrementValue is 2, click on "Add Async" => Count should be 4
  expect(countLabel).toHaveTextContent("4")

  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "-1")
  await user.click(addAsyncButton)

  act(() => {
    jest.advanceTimersByTime(500)
  })

  // [Negative number] incrementValue is -1, click on "Add Async" => Count should be 3
  expect(countLabel).toHaveTextContent("3")

  jest.useRealTimers()
})

test("Add If Odd should work as expected", async () => {
  const { user } = renderWithProviders(<App />)

  const countLabel = screen.getByLabelText("Count")

  const addIfOddButton = screen.getByText("Add If Odd")

  const incrementValueInput = screen.getByLabelText("Set increment amount")

  const incrementValueButton = screen.getByLabelText("Increment value")

  // "Add If Odd" button is clicked => Count should stay 0
  await user.click(addIfOddButton)
  expect(countLabel).toHaveTextContent("0")

  // Click on "+" => Count should be updated to 1
  await user.click(incrementValueButton)
  expect(countLabel).toHaveTextContent("1")

  // "Add If Odd" button is clicked => Count should be updated to 3
  await user.click(addIfOddButton)
  expect(countLabel).toHaveTextContent("3")

  // incrementValue is 1, click on "Add If Odd" => Count should be updated to 4
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "1")
  await user.click(addIfOddButton)
  expect(countLabel).toHaveTextContent("4")

  // click on "Add If Odd" => Count should stay 4
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "-1")
  await user.click(addIfOddButton)
  expect(countLabel).toHaveTextContent("4")
})
