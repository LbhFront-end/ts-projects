import Mock from 'mockjs'

type MsgType = string | number

const success = (msg: MsgType = '', data?: any) => {
  return {
    code: 0,
    msg,
    data,
  }
}

const error = (code: number, msg: MsgType = '', data?: any) => {
  return {
    code,
    msg,
    data,
  }
}

interface PostResInterface {
  body: string
  type: 'POST'
  url: string
}

Mock.mock(/\/api\/user\/login/, loginRes)

function loginRes(req: PostResInterface) {
  const { userName, password } = JSON.parse(req.body)
  if (userName === 'laibh.top' && String(password) === '123456') {
    return success('登录成功', {
      userName: 101,
    });
  }
  return error(1001, '用户名或者密码错误')
}

Mock.mock(/\/api\/user\/getInfo/, getInfoRes);

function getInfoRes(req: PostResInterface) {
  return success('', {
    userName: 'laibh.top',
    avatar: '',
    email: '544289495@qq.com',
  })
}
