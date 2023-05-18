// ========== Customer Service
// import all modules
import { Request as ExpressRequest } from 'express'
import { Body, Example, Post, Request, Response, Route, Security, SuccessResponse, Tags, Header, Get } from 'tsoa'
import { ICreateCustomerSchemaBody, ICreateInvoiceSchemaBody, ICreateInvoiceSchemaResponse, IGetInvoiceSchemaResponse } from '../schemas/CustomerSchema'
import customerModel from '../models/customerModel'
import invoiceModel from '../models/invoiceModel'
import { IResponse } from '../types/response.types'
import { ICreateCustomerResponse } from '../types/customer.response.types'
import { failedCreateCustomerExample, failedCreateInvoiceExample, failedServerCreateInvoiceExample, failedServerCreatedCustomerExample, failedServerGetInvoice, successCreateCustomerExample, successCreateInvoiceExample, successGetInvoice } from '../example/customer.response.example'

@Route('/api/v1/customers')
@Tags('Customers')
class CustomerService {
  /**
	 * This API can be used to create a customer data
	*/
  @Security('jwt', ['x-access-token'])
  @SuccessResponse(200, 'Success Create Customer Data')
  @Example<IResponse<ICreateCustomerResponse>>(successCreateCustomerExample)
  @Response<IResponse<ICreateCustomerResponse>>(400, 'Failed Create Customer', failedCreateCustomerExample)
  @Response<IResponse<ICreateCustomerResponse>>(500, 'Failed Create Customer (Server Error)', failedServerCreatedCustomerExample)
  @Post('/')
  public async createCustomer (
    @Body() body: ICreateCustomerSchemaBody,
      @Request() req: ExpressRequest,
      @Header('x-access-token') _: string
  ): Promise<IResponse<ICreateCustomerResponse>> {
    try {
      const customer = await customerModel.findOne({ phone: body.phone }).lean()

      if (customer != null) {
        return {
          code: 400,
          message: 'Failed to create customer data',
          errors: {
            phone: ['phone already exists']
          }
        }
      }

      const result = await customerModel.create({
        name: body.name,
        phone: body.phone
      })

      return {
        code: 200,
        message: 'The customer data is created successfully',
        result: {
          _id: result._id.toString(),
          name: result.name,
          phone: result.phone
        }
      }
    } catch (err) {
      const error = err as Error

      return {
        code: 500,
        message: 'Failed to create customer data',
        errors: {
          serverError: [error.message]
        }
      }
    }
  }

  /**
	 * This API can be used to create a invoice data
	*/
  @Security('jwt', ['x-access-token'])
  @SuccessResponse(200, 'Success Create Invoice Data')
  @Example<IResponse<ICreateInvoiceSchemaResponse>>(successCreateInvoiceExample)
  @Response<IResponse<ICreateInvoiceSchemaResponse>>(400, 'Failed Create Invoice', failedCreateInvoiceExample)
  @Response<IResponse<ICreateInvoiceSchemaResponse>>(500, 'Failed Create Invoice (Server Error)', failedServerCreateInvoiceExample)
  @Post('/invoice')
  public async createInvoice (
    @Body() body: ICreateInvoiceSchemaBody,
      @Request() req: ExpressRequest,
      @Header('x-access-token') _: string
  ): Promise<IResponse<ICreateInvoiceSchemaResponse>> {
    try {
      const customer = await customerModel.findOne({ phone: body.phone }).lean()

      if (customer === null) {
        return {
          code: 400,
          message: 'Failed to create invoice data',
          errors: {
            phone: ['phone does not exists']
          }
        }
      }

      const result = await invoiceModel.create({
        customerId: customer._id,
        total: body.total
      })

      return {
        code: 200,
        message: 'The invoice data is created successfully',
        result: {
          _id: result._id.toString(),
          customerId: result.customerId.toString(),
          total: result.total,
          date: result.createdAt
        }
      }
    } catch (err) {
      const error = err as Error

      return {
        code: 500,
        message: 'Failed to create customer data',
        errors: {
          serverError: [error.message]
        }
      }
    }
  }

  /**
	 * This API can be used to get invoice data
	*/
  @Security('jwt', ['x-access-token'])
  @SuccessResponse(200, 'Success Get Invoice Data')
  @Example<IResponse<IGetInvoiceSchemaResponse>>(successGetInvoice)
  @Response<IResponse<IGetInvoiceSchemaResponse>>(500, 'Failed Create Invoice (Server Error)', failedServerGetInvoice)
  @Get('/invoice')
  public async getInvoice (
    @Request() req: ExpressRequest,
      @Header('x-access-token') _: string
  ): Promise<IResponse<IGetInvoiceSchemaResponse>> {
    try {
      const invoices = await invoiceModel.aggregate([
        {
          $lookup: {
            from: 'customers',
            localField: 'customerId',
            foreignField: '_id',
            as: 'customer'
          }
        },
        {
          $unwind: {
            path: '$customer',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $set: {
            date: {
              $dateToString: {
                date: '$createdAt',
                format: '%Y-%m-%d %H-%M-%S',
                timezone: 'Asia/Jakarta'
              }
            }
          }
        },
        {
          $project: {
            _id: 1,
            'customer.name': 1,
            'customer.phone': 1,
            date: 1,
            total: 1
          }
        }
      ])

      return {
        code: 200,
        message: 'Success get invoices',
        results: invoices
      }
    } catch (err) {
      const error = err as Error

      return {
        code: 500,
        message: 'Failed get invoices',
        errors: {
          serverError: [error.message]
        }
      }
    }
  }
}

export default CustomerService
