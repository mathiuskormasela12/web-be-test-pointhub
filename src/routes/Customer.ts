// ========== Customer Routes
// import all modules
import { Router } from 'express'
import IRoutes from './IRoutes'
import CustomerController from '../controllers/CustomerController'
import authMiddleware from '../middlewares/auth.middleware'
import { validateCreateCustomerBody, validateCreateInvoiceBody } from '../middlewares/customer.middleware'

class CustomerRoutes extends IRoutes {
  protected router: Router

  constructor () {
    super()
    this.router = Router()
    this.setup()
  }

  private setup (): void {
    this.router.post('/customers', authMiddleware.isLoggedIn, validateCreateCustomerBody, CustomerController.createCustomer)
    this.router.post('/customers/invoice', authMiddleware.isLoggedIn, validateCreateInvoiceBody, CustomerController.createInvoice)
    this.router.get('/customers/invoice', authMiddleware.isLoggedIn, CustomerController.getInvoice)
  }

  public get routes (): Router {
    return this.router
  }
}

export default new CustomerRoutes()
