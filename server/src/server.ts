import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { fastifyMultipart } from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { uploadRoutes } from './routes/upload'
import { authRoutes } from './routes/auth'
import { resolve } from 'node:path'

const app = fastify()

app.register(fastifyMultipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads/'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true, // todas as URLs de front-end poderão acessar nosso backend
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => console.log('🚀 HTTP server runing on http://localhost:3333'))
