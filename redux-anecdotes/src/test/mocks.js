import { useDispatch } from 'react-redux'


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}))

const _dispatchMock = jest.fn()
const useDispatchMock = useDispatch
useDispatchMock.mockImplementation(() => _dispatchMock)

export const dispatchMock = _dispatchMock
