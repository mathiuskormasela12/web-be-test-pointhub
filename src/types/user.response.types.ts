// ========== User Response Types

export interface IRegisterUserResponse {
  _id: string
  accessToken: string
  refreshToken: string
}

export interface IGenerateTokenResponse {
  error?: string
  accessToken: string
  refreshToken: string
}
