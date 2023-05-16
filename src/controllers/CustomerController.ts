// ========== Customer Controller
// import all modules
import { Request, type Response } from 'express'
import CustomerService from '../services/CustomerService'
import { response } from '../helpers/response'
import { ICreateCustomerResponse } from '../types/customer.response.types'
import { ICreateInvoiceSchemaResponse, IGetInvoiceSchemaResponse } from '../schemas/CustomerSchema'

class CustomerController {
  public async createCustomer (req: Request, res: Response): Promise<Response> {
    const customerService = new CustomerService()
    const result = await customerService.createCustomer(req.body, req, req.headers['x-access-token']?.toString() ?? '')
    return response<ICreateCustomerResponse>(res, result)
  }

  public async createInvoice (req: Request, res: Response): Promise<Response> {
    const customerService = new CustomerService()
    const result = await customerService.createInvoice(req.body, req, req.headers['x-access-token']?.toString() ?? '')
    return response<ICreateInvoiceSchemaResponse>(res, result)
  }

  public async getInvoice (req: Request, res: Response): Promise<Response> {
    const customerService = new CustomerService()
    const result = await customerService.getInvoice(req, req.headers['x-access-token']?.toString() ?? '')
    return response<IGetInvoiceSchemaResponse>(res, result)
  }
}

export default new CustomerController()
