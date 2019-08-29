import request from '@/utils/request'

export const getRouterReq = (access) => {
  return request({
    url: 'get_router',
    params: {
      access
    },
    method: 'get'
  })
}
