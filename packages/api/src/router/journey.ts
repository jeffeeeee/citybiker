import { z } from 'zod'
import { Prisma } from '@citybiker/db'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const journeyRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        take: z.number().min(1).max(100).default(10),
        cursor: z.string().optional().nullable()
      })
    )
    .query(async ({ ctx, input }) => {
      const query: Prisma.JourneyFindManyArgs = {
        skip: 1,
        take: 100,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { id: 'desc' }
      }

      const journeys = await ctx.prisma.journey.findMany(query)

      return journeys
    }),

  byId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.station.findFirst({ where: { id: input } })
  })
})
