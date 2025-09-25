import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'
import { PhoneListPage } from '../../src/pages/PhoneListPage'

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('PhoneListPage - Core Functionality', () => {
  beforeEach(() => {
    server.resetHandlers()
  })

  describe('Page Loading and Display', () => {
    it('displays page header and phones after loading', async () => {
      render(<PhoneListPage />, { wrapper: TestWrapper })

      // Check page header
      expect(screen.getByText('Phone Catalogue')).toBeInTheDocument()
      expect(screen.getByText('Find your perfect phone')).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
        expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
      }, { timeout: 3000 })

      expect(screen.getByText(/showing 1 to 2 of 2 phones/i)).toBeInTheDocument()

      expect(screen.getByText('Filters')).toBeInTheDocument()
    })

    it('displays phone cards with correct information', async () => {
      render(<PhoneListPage />, { wrapper: TestWrapper })

      await waitFor(() => {
        expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
        expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
      })

      expect(screen.getByText('1199 Ft')).toBeInTheDocument()
      expect(screen.getByText('1299 Ft')).toBeInTheDocument()

      expect(screen.getByText(/the ultimate iPhone/i)).toBeInTheDocument()
      expect(screen.getByText(/galaxy AI is here/i)).toBeInTheDocument()

      const viewDetailsButtons = screen.getAllByText('View Details')
      expect(viewDetailsButtons).toHaveLength(2)

      expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
      expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
    })

    it('displays phone brand information correctly', async () => {
      render(<PhoneListPage />, { wrapper: TestWrapper })

      await waitFor(() => {
        expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
      })

      const appleElements = screen.getAllByText('Apple')
      const samsungElements = screen.getAllByText('Samsung')

      expect(appleElements.length).toBeGreaterThanOrEqual(1)
      expect(samsungElements.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Filter Panel', () => {
    it('displays filter panel with all sections', async () => {
      render(<PhoneListPage />, { wrapper: TestWrapper })

      await waitFor(() => {
        expect(screen.getByText('Filters')).toBeInTheDocument()
      })

      expect(screen.getByText('Brand')).toBeInTheDocument()
      expect(screen.getByText('Price Range')).toBeInTheDocument()
      expect(screen.getByText('Sort By')).toBeInTheDocument()

      expect(screen.getByLabelText(/min price/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/max price/i)).toBeInTheDocument()

      expect(screen.getByRole('button', { name: /reset all filters/i })).toBeInTheDocument()
    })

    it('shows correct results count in filter header', async () => {
      render(<PhoneListPage />, { wrapper: TestWrapper })

      await waitFor(() => {
        expect(screen.getByText('2 results')).toBeInTheDocument()
      })
    })
  })

  describe('API Error Handling', () => {
    it('handles network errors gracefully', async () => {
      server.use(
        http.get('http://localhost:3001/api/phones', () => {
          return HttpResponse.error()
        })
      )

      render(<PhoneListPage />, { wrapper: TestWrapper })

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('handles server errors gracefully', async () => {
      server.use(
        http.get('http://localhost:3001/api/phones', () => {
          return new HttpResponse(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500 }
          )
        })
      )

      render(<PhoneListPage />, { wrapper: TestWrapper })

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('handles empty results', async () => {
      server.use(
        http.get('http://localhost:3001/api/phones', () => {
          return HttpResponse.json({
            success: true,
            data: {
              data: [],
              pagination: {
                currentPage: 1,
                totalPages: 0,
                totalItems: 0,
                itemsPerPage: 12,
                hasNext: false,
                hasPrevious: false
              }
            },
            timestamp: new Date().toISOString()
          })
        })
      )

      render(<PhoneListPage />, { wrapper: TestWrapper })

      await waitFor(() => {
        expect(screen.getByText(/no phones found/i)).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  describe('Loading States', () => {
    it('shows page structure immediately and loads content', async () => {
      render(<PhoneListPage />, { wrapper: TestWrapper })

      expect(screen.getByText('Phone Catalogue')).toBeInTheDocument()
      expect(screen.getByText('Find your perfect phone')).toBeInTheDocument()

      expect(screen.getByText('Filters')).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
        expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  describe('Phone Cards Content', () => {
    it('displays essential phone information in cards', async () => {
      render(<PhoneListPage />, { wrapper: TestWrapper })

      await waitFor(() => {
        expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
      })

      expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
      expect(screen.getByText('1199 Ft')).toBeInTheDocument()
      expect(screen.getByText(/the ultimate iPhone/i)).toBeInTheDocument()

      expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
      expect(screen.getByText('1299 Ft')).toBeInTheDocument()
      expect(screen.getByText(/galaxy AI is here/i)).toBeInTheDocument()
    })
  })
})
