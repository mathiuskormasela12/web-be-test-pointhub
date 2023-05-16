// ========== User Schema
// import all modules
import mongoose from 'mongoose'

export interface IRegisterUserSchemaBody {
  name: string
  phoneNumber: string
  password: string
}

export interface ILoginUserSchemaBody {
  phoneNumber: string
  password: string
}

export interface IUserSchemaModel {
  _id: mongoose.Types.ObjectId
  name: string
  password: string
  phoneNumber: string
  photo?: string
  createdAt: Date
  updatedAt: Date
}

export interface ICreateAccessTokenBody {
  refreshToken: string
}
