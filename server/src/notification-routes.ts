import WebPush from "web-push"

import { FastifyInstance } from "fastify"
import { z } from "zod"

// Mostra as chaves publicas e privada
// console.log(WebPush.generateVAPIDKeys())

const publicKey =
  "BMC9jQBZBFA1Dlu-qNm7xkxJfJeDXUwn0HyuWSQG62ypRBFvSHHqUbwniAm59DfxxjvG5uSFwD4SqyvEwaTxurA"

const privateKey = "YHSBdkuWV2ljCbjHH2p60BlpU5ns1u4zMnetCNBIFnc"

WebPush.setVapidDetails("http://localhost:3333", publicKey, privateKey)

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return { publicKey }
  })

  app.post("/push/register", (request, reply) => {
    console.log(request.body)

    return reply.status(201).send
  })

  app.post("/push/send", async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    })

    const { subscription } = sendPushBody.parse(request.body)

    WebPush.sendNotification(subscription, "Hello do Backend")

    return reply.status(201).send
  })
}
