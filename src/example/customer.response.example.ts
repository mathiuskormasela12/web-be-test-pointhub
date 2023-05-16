// ========== Customer Response Example

export const successCreateCustomerExample = {
  code: 200,
  message: 'The customer data is created successfully',
  result: {
    _id: '6462ff5539cbacccda18a335',
    name: 'Jhon Doe',
    phone: '628392991'
  }
}

export const failedCreateCustomerExample = {
  code: 400,
  message: 'Failed to create customer data',
  errors: {
    phone: ['phone already exists']
  }
}

export const failedServerCreatedCustomerExample = {
  code: 500,
  message: 'Failed to create customer data',
  errors: {
    serverError: ['Server Error']
  }
}

export const successCreateInvoiceExample = {
  code: 200,
  message: 'The invoice data is created successfully',
  result: {
    _id: '64639830d666e7192a3a60f8',
    customerId: '64639297810ef4266e75da44',
    total: 10,
    date: new Date()
  }
}

export const failedCreateInvoiceExample = {
  code: 400,
  message: 'Failed to create invoice data',
  errors: {
    phone: ['phone does not exists']
  }
}

export const failedServerCreateInvoiceExample = {
  code: 500,
  message: 'Failed to create customer data',
  errors: {
    serverError: ['Server Error']
  }
}

export const successGetInvoice = {
  code: 200,
  message: 'Success get invoices',
  results: [
    {
      _id: '646396f5f44778fd2fa6362b',
      total: 10,
      customer: {
        name: 'Matthew',
        phone: '6283838383'
      },
      date: '2023-05-16 21-45-09'
    },
    {
      _id: '64639830d666e7192a3a60f8',
      total: 10,
      customer: {
        name: 'Matthew',
        phone: '6283838383'
      },
      date: '2023-05-16 21-50-24'
    }
  ]
}

export const failedServerGetInvoice = {
  code: 500,
  message: 'Failed get invoices',
  errors: {
    serverError: ['Server Error']
  }
}
