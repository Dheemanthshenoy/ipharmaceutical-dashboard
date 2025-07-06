import '@testing-library/jest-dom'

Object.defineProperty(window.Element.prototype, 'hasPointerCapture', {
  value: () => false,
  writable: true,
})

Object.defineProperty(window.Element.prototype, 'setPointerCapture', {
  value: () => {},
  writable: true,
})

Object.defineProperty(window.Element.prototype, 'releasePointerCapture', {
  value: () => {},
  writable: true,
})

Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  value: () => {},
  writable: true,
})

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
