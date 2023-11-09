import { renderHook } from '@testing-library/react'
import { useValidator } from '../src'

import 'jest-canvas-mock'

describe('useValidator', () => {
  it('renders without crashing', () => {
    const { result } = renderHook(useValidator)
    expect(result.current.valid).toBe(true)
  })
})
