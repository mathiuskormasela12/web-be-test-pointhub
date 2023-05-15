// ========== App
// import all modules
import express, { type Application } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors, { type CorsOptions } from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import config from '../config'
import UserRoutes from '../routes/User'

class App {
  private readonly app: Application

  constructor () {
    this.app = express()
    this.setup()
  }

  private setup (): void {
    // Setup url-encoded & json
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())

    // setup helmet & compression
    this.app.use(helmet())
    this.app.use(compression())

    // Setup morgan
    if (config.env === 'development') {
      this.app.use(require('morgan')('dev'))
    }

    // Setup static files
    this.app.use(express.static(path.join(__dirname, '../../public')))

    // Setup cors
    const corsOptions: CorsOptions = {
      origin (origin, callback) {
        if ((typeof origin === 'undefined') || (config.clients.includes(origin))) {
          callback(null, true)
        } else {
          callback(new Error('Blocked by cors'))
        }
      }
    }
    this.app.use(cors(corsOptions))

    // Setup database
    mongoose.connect(config?.dbUri)
      .then(() => { console.log('The database has been connected') })
      .catch((err: Error) => { console.log(err) })

    this.app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: '/swagger.json'
        }
      })
    )

    this.app.use('/api/v1', UserRoutes.routes)
  }

  public listen (): void {
    this.app.listen(config.port, () => {
      console.log('The RESTful API is being run at port', config.port)
    })
  }
}

export default App
