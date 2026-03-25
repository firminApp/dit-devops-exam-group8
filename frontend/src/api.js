const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let message = `Erreur HTTP ${response.status}`
    try {
      const payload = await response.json()
      message = payload.error || message
    } catch {
      // Keep default message when body is not JSON.
    }
    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

function toQuery(params) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value)
    }
  })
  const search = query.toString()
  return search ? `?${search}` : ''
}

export function getBooks() {
  return request('/books')
}

export function searchBooks(params) {
  return request(`/books/search${toQuery(params)}`)
}

export function createBook(payload) {
  return request('/books', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function deleteBook(id) {
  return request(`/books/${id}`, { method: 'DELETE' })
}

export function getUsers() {
  return request('/users')
}

export function createUser(payload) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function deleteUser(id) {
  return request(`/users/${id}`, { method: 'DELETE' })
}

export function getEmprunts() {
  return request('/emprunts')
}

export function createEmprunt(payload) {
  return request('/emprunts', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function returnEmprunt(id) {
  return request(`/emprunts/${id}/retour`, { method: 'PUT' })
}

export function getRetards() {
  return request('/emprunts/retards')
}

export function getHistorique(userId) {
  return request(`/emprunts/historique/${userId}`)
}