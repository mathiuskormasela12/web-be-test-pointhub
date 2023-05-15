// ========== User Schema
// import all modules

import mongoose from 'mongoose'

export interface IRegisterUserSchemaBody {
  name: string
  phoneNumber: string
}

export interface ILoginUserSchemaBody {
  phoneNumber: string
}

export interface IUserSchemaModel {
  _id: mongoose.Types.ObjectId
  name: string
  phoneNumber: string
  photo?: string
  createdAt: Date
  updatedAt: Date
}
