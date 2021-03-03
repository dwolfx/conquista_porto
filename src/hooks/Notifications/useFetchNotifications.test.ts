import { renderHook } from '@testing-library/react-hooks'
import useFetchNotifications from './useFetchNotifications'

describe('Notifications', () => {
  it('should call hook useFetchNotifications', () => {
    const { result } = renderHook(() => useFetchNotifications())
    expect(result).toBeDefined()
  })
})
