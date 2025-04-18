import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    userName?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    token: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/sys/login', data);
}

/**
 * 游客登录
 */
export async function guestLoginApi(data: any) {
  return requestClient.post<any>('/sys/guestLogin', data);
}
/**
 * 注册
 */
export async function registerApi(data: any) {
  return requestClient.post<any>('/sys/register', data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/sys/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.post<string[]>('/sys/user/permCode');
}
/**
 * 图片验证码
 */
export async function captcha(data: any) {
  return requestClient.post('/sys/captcha', data);
}
/**
 * 获取登录图片验证码是否启用标识
 */
export async function getCaptchaOpenFlag() {
  return requestClient.post('/sys/getCaptchaOpenFlag');
}
