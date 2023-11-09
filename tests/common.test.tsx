import { renderHook } from '@testing-library/react'
import { useValidator } from '../src'

import 'jest-canvas-mock'

describe('useValidator', () => {
  it('renders without crashing', () => {
    const { result } = renderHook(() => useValidator('test_form', { rules: { username: ['required'] } }))
    expect(result.current.valid).toBe(false)
  })
})
