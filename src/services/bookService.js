const API_BASE_URL = 'http://localhost:9000'

class BookService {
  async getAllBooks(filters = {}) {
    const params = new URLSearchParams()
    
    if (filters.name) params.append('name', filters.name)
    if (filters.reading !== undefined) params.append('reading', filters.reading)
    if (filters.finished !== undefined) params.append('finished', filters.finished)
    
    const queryString = params.toString()
    const url = `${API_BASE_URL}/books${queryString ? `?${queryString}` : ''}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  }

  async getBookById(id) {
    const response = await fetch(`${API_BASE_URL}/books/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  }

  async addBook(bookData) {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData)
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`)
    }
    
    return result
  }

  async updateBook(id, bookData) {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData)
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`)
    }
    
    return result
  }

  async deleteBook(id) {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE'
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`)
    }
    
    return result
  }
}

export const bookService = new BookService()