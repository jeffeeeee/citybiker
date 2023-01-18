import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Spinner
} from '@chakra-ui/react'
import Link from 'next/link'
import { api } from '../utils/api'

// convert seconds to minutes and hours
const convertTime = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time - hours * 3600) / 60)
  const seconds = time - hours * 3600 - minutes * 60
  if (hours) return `${hours}h ${minutes}m ${seconds}s`
  return `${minutes}m ${seconds}s`
}

const convertDistance = (distance: number) => {
  return (distance / 1000).toFixed(1)
}
const Journeys: NextPage = () => {
  const journeyQuery = api.journey.getAll.useInfiniteQuery(
    {
      take: 50
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length < 50) return null
        return lastPage[lastPage.length - 1].id
      }
    }
  )

  if (journeyQuery.isLoading) {
    return (
      <div className="flex align-center content-center justify-center my-2">
        <Spinner />
      </div>
    )
  }

  if (!journeyQuery.isSuccess) {
    return <h1>Failed</h1>
  }

  return (
    <>
      <Head>
        <title>Citybiker - Journeys</title>
      </Head>
      <main className="px-4 pb-4 max-w-4xl m-auto my-4">
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Departure station</Th>
                <Th>Return station</Th>
                <Th isNumeric>Distance travelled (km)</Th>
                <Th isNumeric>Duration of the ride (min)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {journeyQuery.data.pages.map((journeyPage, i) => (
                <React.Fragment key={i}>
                  {journeyPage.map((journey) => (
                    <Tr key={journey.id}>
                      <Td>
                        <Link href={`/station/${journey.departureStationId}`}>
                          {journey.departureStationName}
                        </Link>
                      </Td>
                      <Td>
                        <Link href={`/station/${journey.returnStationId}`}>
                          {journey.returnStationName}
                        </Link>
                      </Td>
                      <Td isNumeric>
                        {convertDistance(journey.coveredDistance)}
                      </Td>
                      <Td isNumeric>{convertTime(journey.duration)}</Td>
                    </Tr>
                  ))}
                </React.Fragment>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Button
          onClick={() => journeyQuery.fetchNextPage()}
          isLoading={journeyQuery.isFetchingNextPage}
          variant="ghost"
          className="my-2"
        >
          {journeyQuery.isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </Button>
      </main>
    </>
  )
}

export default Journeys
