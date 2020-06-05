import request from '@/utils/request'

// 查询工厂配置列表
export function listStoredProcedure(query) {
  return request({
    url: '/storedProcedure/storedProcedure/list',
    method: 'get',
    params: query
  })
}

// 查询工厂配置详细
export function getStoredProcedure(id) {
  return request({
    url: '/storedProcedure/storedProcedure/' + id,
    method: 'get'
  })
}

// 新增工厂配置
export function addStoredProcedure(data) {
  return request({
    url: '/storedProcedure/storedProcedure',
    method: 'post',
    data: data
  })
}

// 修改工厂配置
export function updateStoredProcedure(data) {
  return request({
    url: '/storedProcedure/storedProcedure',
    method: 'put',
    data: data
  })
}

// 删除工厂配置
export function delStoredProcedure(id) {
  return request({
    url: '/storedProcedure/storedProcedure/' + id,
    method: 'delete'
  })
}

// 导出工厂配置
export function exportStoredProcedure(query) {
  return request({
    url: '/storedProcedure/storedProcedure/export',
    method: 'get',
    params: query
  })
}