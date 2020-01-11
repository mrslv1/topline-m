// 专门操作本地存储的工具模块
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    // 把data转为一个js对象 成功的化数据是一个json对象 失败就报错
    return JSON.parse(data)
  } catch (err) {
    // 在这里直接原样返回
    return data
  }
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
