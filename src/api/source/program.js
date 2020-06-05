import request from '@/utils/request'

// 查询程序配置列表
export function listProgram(query) {
  return request({
    url: '/source/program/list',
    method: 'get',
    params: query
  })
}

// 查询程序配置详细
export function getProgram(id) {
  return request({
    url: '/source/program/' + id,
    method: 'get'
  })
}

// 新增程序配置
export function addProgram(data) {
  return request({
    url: '/source/program',
    method: 'post',
    data: data
  })
}

// 修改程序配置
export function updateProgram(data) {
  return request({
    url: '/source/program',
    method: 'put',
    data: data
  })
}

// 删除程序配置
export function delProgram(id) {
  return request({
    url: '/source/program/' + id,
    method: 'delete'
  })
}

// 导出程序配置
export function exportProgram(query) {
  return request({
    url: '/source/program/export',
    method: 'get',
    params: query
  })
}