// src/pages/_app.tsx
import '../styles/globals.css'
import type { AppType } from 'next/app'
import { MantineProvider } from '@mantine/core'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { api } from '../utils/api'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light'
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default api.withTRPC(MyApp)