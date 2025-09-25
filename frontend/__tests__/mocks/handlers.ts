import { http, HttpResponse } from 'msw'

const mockPhones = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 1199,
    description: 'The ultimate iPhone',
    specs: {
      display: '6.7-inch',
      storage: '256GB',
      camera: '48MP',
      battery: '29 hours'
    },
    image: 'https://example.com/iphone.jpg',
    inStock: true
  },
  {
    id: 2,
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1299,
    description: 'Galaxy AI is here',
    specs: {
      display: '6.8-inch',
      storage: '512GB',
      camera: '200MP',
      battery: '5000mAh'
    },
    image: 'https://example.com/galaxy.jpg',
    inStock: false
  }
]

export const handlers = [
  http.get('http://localhost:3001/api/phones', ({ request }) => {
    const url = new URL(request.url)
    const brand = url.searchParams.get('brand')
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '12')

    let phones = mockPhones
    if (brand && brand !== 'all') {
      phones = mockPhones.filter(phone => phone.brand === brand)
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPhones = phones.slice(startIndex, endIndex)
    const totalPages = Math.ceil(phones.length / limit)

    return HttpResponse.json({
      success: true,
      data: {
        data: paginatedPhones,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: phones.length,
          itemsPerPage: limit,
          hasNext: page < totalPages,
          hasPrevious: page > 1
        }
      },
      timestamp: new Date().toISOString()
    })
  }),

  http.get('http://localhost:3001/api/phones/:id', ({ params }) => {
    const phone = mockPhones.find(p => p.id === parseInt(params.id as string))

    if (!phone) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json({
      success: true,
      data: phone,
      timestamp: new Date().toISOString()
    })
  })
]
