// ========== IRoutes
// import all modules
import { type Router } from 'express'

abstract class IRoutes {
  protected abstract router: Router

  public abstract get routes (): Router
}

export default IRoutes
