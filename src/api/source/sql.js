import request from '@/utils/request'

// 查询SQL执行与结果查询列表
export function listSql(query) {
  return request({
    url: '/sql/sql/list',
    method: 'get',
    params: query
  })
}
// 获取数据库名称
export function getdatabase() {
  return request({
    url: '/sql/database/databaseList',
    method: 'post'
  })
}

// 查询SQL执行与结果查询详细
export function getSql(id) {
  return request({
    url: '/sql/sql/' + id,
    method: 'get'
  })
}

// 新增SQL执行与结果查询
export function addSql(data) {
  return request({
    url: '/sql/sql',
    method: 'post',
    data: data
  })
}

// 修改SQL执行与结果查询
export function updateSql(data) {
  return request({
    url: '/sql/sql',
    method: 'put',
    data: data
  })
}

// 删除SQL执行与结果查询
export function delSql(id) {
  return request({
    url: '/sql/sql/' + id,
    method: 'delete'
  })
}

// 导出SQL执行与结果查询
export function exportSql(query) {
  return request({
    url: '/sql/sql/export',
    method: 'get',
    params: query
  })
}
