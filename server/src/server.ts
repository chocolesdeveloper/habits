import Fastify from "fastify"
import cors from "@fastify/cors"

import { appRoutes } from "./routes"
import { notificationRoutes } from "./notification-routes"

const app = Fastify()

app.register(cors)
app.register(appRoutes)
// app.register(notificationRoutes)

const port = 3333
const host = "0.0.0.0"

app
  .listen({
    port,
    host,
  })
  .then(() => {
    console.log(`Server HTTP runing in port ${port}!`)
  })
