// src/pages/_app.tsx
import '../styles/globals.css'
import type { AppType } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ChakraProvider } from '@chakra-ui/react'
import { api } from '../utils/api'
import Appbar from '../components/appbar'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

const CustomApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const router = useRouter()

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        {router.pathname !== '/' && <Appbar />}

        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default api.withTRPC(CustomApp)
