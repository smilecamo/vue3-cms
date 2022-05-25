export const rules = {
  name: [
    {
      required: true,
      message: '必须输入账号',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '账号5,10位',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      pattern: /^[0-9]{4,}$/,
      message: '请输入4位密码',
      trigger: 'blur',
    },
  ],
};

export const phoneRules = {
  phoneNum: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur',
    },
    {
      pattern: /^[0-9]{11}$/,
      message: '账号11位手机号',
      trigger: 'blur',
    },
  ],
  verify: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
    {
      pattern: /^[0-9]{4,}$/,
      message: '请输入4位验证码',
      trigger: 'blur',
    },
  ],
};
