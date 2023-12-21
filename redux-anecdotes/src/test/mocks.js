import { useDispatch } from 'react-redux'


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}))

const _useDispatchMock = useDispatch
const _dispatchMock = jest.fn()
_useDispatchMock.mockImplementation(() => _dispatchMock)

export const useDispatchMock = _useDispatchMock
export const dispatchMock = _dispatchMock
