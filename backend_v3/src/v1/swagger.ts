import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Application, Request, Response } from 'express'
import { log } from '../utils/functions'

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CheckV.dev API',
      version: '1.0.0',
    },
  },
  apis: ['./src/v1/routes/*.ts', './src/database/*.ts'],
}

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options)

// This function will be called when the user visits the /api-docs route
export const swaggerDocs = (app: Application, port: number | string) => {
  // Route-Handler to visit our docs
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Make our docs in JSON format available
  app.get('/api/v1/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  log('INFO', `📓 Version 1 Docs are available at http://localhost:${port}/api/v1/docs`)
}
