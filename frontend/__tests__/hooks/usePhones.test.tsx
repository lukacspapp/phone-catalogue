import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePhones, usePhone } from '../../src/hooks/usePhones'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } }
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('usePhones Hook', () => {
  beforeEach(() => {
    server.resetHandlers()
  })

  it('fetches phones successfully', async () => {
    const { result } = renderHook(() => usePhones(), {
      wrapper: createWrapper()
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data).toBeDefined()
      expect(result.current.data?.data).toHaveLength(2)
      expect(result.current.error).toBeNull()
    })
  })

  it('handles filters correctly', async () => {
    const { result } = renderHook(() => usePhones({ brand: 'Apple' }), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data?.data).toHaveLength(1)
      expect(result.current.data?.data[0].brand).toBe('Apple')
    })
  })

  it('handles pagination parameters', async () => {
    const { result } = renderHook(() => usePhones({ page: 1, limit: 1 }), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data?.pagination.currentPage).toBe(1)
      expect(result.current.data?.data).toHaveLength(1)
    })
  })

  it('handles pagination with multiple pages', async () => {
    const { result } = renderHook(() => usePhones({ page: 2, limit: 1 }), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data?.pagination.currentPage).toBe(2)
      expect(result.current.data?.data).toHaveLength(1)
    })
  })

  it('handles pagination beyond available data', async () => {
    const { result } = renderHook(() => usePhones({ page: 10, limit: 1 }), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data?.pagination.currentPage).toBe(10)
      expect(result.current.data?.data).toHaveLength(0)
    })
  })

  it('handles default pagination parameters', async () => {
    const { result } = renderHook(() => usePhones({}), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data?.pagination.currentPage).toBe(1)
      expect(result.current.data?.pagination.itemsPerPage).toBe(12)
      expect(result.current.data?.data).toHaveLength(2)
    })
  })

  it('handles API errors gracefully', async () => {
    server.use(
      http.get('http://localhost:3001/api/phones', () => {
        return HttpResponse.error()
      })
    )

    const { result } = renderHook(() => usePhones(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeDefined()
      expect(result.current.data).toBeUndefined()
    })
  })
})

describe('usePhone Hook', () => {
  it('fetches single phone successfully', async () => {
    const { result } = renderHook(() => usePhone(1), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data?.name).toBe('iPhone 15 Pro Max')
      expect(result.current.error).toBeNull()
    })
  })

  it('handles phone not found', async () => {
    server.use(
      http.get('http://localhost:3001/api/phones/999', () => {
        return new HttpResponse(null, { status: 404 })
      })
    )

    const { result } = renderHook(() => usePhone(999), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeDefined()
    })
  })
})
