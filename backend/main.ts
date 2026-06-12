import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
const cookieParser = require('cookie-parser')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  })

  // Use PORT from env or default to 3001 to avoid conflict with Next.js (3000)
  const port = process.env.PORT || 3001
  await app.listen(port)
  console.log(`Backend listening on port ${port}`)
}
bootstrap()
