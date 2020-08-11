import reducer from './reducer'
import { Types } from './types'

describe('Notifications Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      data: {
        novas: [],
        anteriores: [],
      },
    })
  })

  it('should handle GET_DATA_SUCCESS', () => {
    expect(
      reducer(
        {
          data: {
            novas: [],
            anteriores: [],
          },
        },
        {
          type: Types.GET_DATA_SUCCESS,
          payload: {
            novas: [
              { titulo: 'nova mensagem', textoConteudo: 'nova mensagem' },
            ],
            anteriores: [
              { titulo: 'mensagem antiga', textoConteudo: 'mensagem antiga' },
            ],
          },
        }
      )
    ).toEqual({
      data: {
        novas: [
          { titulo: 'nova mensagem', textoConteudo: 'nova mensagem' },
        ],
        anteriores: [
          { titulo: 'mensagem antiga', textoConteudo: 'mensagem antiga' },
        ],
      },
    })
  })

  it('should handle SEND_NOTIFICATION_READ_SUCCESS', () => {
    expect(
      reducer(
        {
          data: {
            novas: [],
            anteriores: [],
          },
        },
        {
          type: Types.SEND_NOTIFICATION_READ_SUCCESS,
          payload: {
            novas: [],
            anteriores: [],
          },
        }
      )
    ).toEqual({
      data: {
        novas: [],
        anteriores: [{ lida: true }],
      },
    })
  })

  it('should handle GET_DATA_FAILURE', () => {
    expect(
      reducer(
        {
          data: {
            novas: [],
            anteriores: [],
          },
        },
        {
          type: Types.GET_DATA_FAILURE
        }
      )
    ).toEqual({
      data: {
        novas: [],
        anteriores: [],
      },
    })
  })
})
