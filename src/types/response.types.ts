// ========== Response Types
// import all modules

export interface IResponse<T> {
  code: number
  message?: string
  result?: T
  results?: T[]
  errors?: Record<string, string[]>
}
