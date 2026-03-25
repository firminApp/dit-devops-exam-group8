import { useEffect, useMemo, useState } from 'react'
import {
  createBook,
  createEmprunt,
  createUser,
  deleteBook,
  deleteUser,
  getEmprunts,
  getRetards,
  getUsers,
  getBooks,
  getHistorique,
  returnEmprunt,
  searchBooks,
} from './api'
import './App.css'

const USER_TYPES = ['Etudiant', 'Professeur', 'Personnel administratif']

function App() {
  const [activeTab, setActiveTab] = useState('books')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])
  const [emprunts, setEmprunts] = useState([])
  const [retards, setRetards] = useState([])
  const [historique, setHistorique] = useState([])

  const [bookSearch, setBookSearch] = useState({ titre: '', auteur: '', isbn: '' })
  const [userHistoryId, setUserHistoryId] = useState('')

  const [bookForm, setBookForm] = useState({
    titre: '',
    auteur: '',
    isbn: '',
    annee: '',
    editeur: '',
  })

  const [userForm, setUserForm] = useState({
    nom: '',
    email: '',
    type: USER_TYPES[0],
  })

  const [empruntForm, setEmpruntForm] = useState({
    user_id: '',
    book_id: '',
  })

  const stats = useMemo(() => {
    const empruntsEnCours = emprunts.filter((item) => !item.rendu).length
    return {
      totalBooks: books.length,
      totalUsers: users.length,
      empruntsEnCours,
      retards: retards.length,
    }
  }, [books, users, emprunts, retards])

  useEffect(() => {
    loadInitialData()
  }, [])

  async function loadInitialData() {
    setLoading(true)
    setError('')
    try {
      const [booksData, usersData, empruntsData, retardsData] = await Promise.all([
        getBooks(),
        getUsers(),
        getEmprunts(),
        getRetards(),
      ])
      setBooks(booksData)
      setUsers(usersData)
      setEmprunts(empruntsData)
      setRetards(retardsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function refreshBooks() {
    setBooks(await getBooks())
  }

  async function refreshUsers() {
    setUsers(await getUsers())
  }

  async function refreshEmpruntsAndRetards() {
    const [empruntsData, retardsData] = await Promise.all([getEmprunts(), getRetards()])
    setEmprunts(empruntsData)
    setRetards(retardsData)
  }

  async function handleAddBook(event) {
    event.preventDefault()
    setError('')
    try {
      await createBook({
        ...bookForm,
        annee: bookForm.annee ? Number(bookForm.annee) : undefined,
        editeur: bookForm.editeur || undefined,
      })
      setBookForm({ titre: '', auteur: '', isbn: '', annee: '', editeur: '' })
      await refreshBooks()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDeleteBook(id) {
    setError('')
    try {
      await deleteBook(id)
      await refreshBooks()
      await refreshEmpruntsAndRetards()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleSearchBooks(event) {
    event.preventDefault()
    setError('')
    try {
      const data = await searchBooks(bookSearch)
      setBooks(data)
    } catch (err) {
      setError(err.message)
    }
  }

  async function clearBookSearch() {
    setBookSearch({ titre: '', auteur: '', isbn: '' })
    setError('')
    try {
      await refreshBooks()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleAddUser(event) {
    event.preventDefault()
    setError('')
    try {
      await createUser(userForm)
      setUserForm({ nom: '', email: '', type: USER_TYPES[0] })
      await refreshUsers()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDeleteUser(id) {
    setError('')
    try {
      await deleteUser(id)
      await refreshUsers()
      if (historique.length > 0 && String(id) === userHistoryId) {
        setHistorique([])
      }
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleCreateEmprunt(event) {
    event.preventDefault()
    setError('')
    try {
      await createEmprunt({
        user_id: Number(empruntForm.user_id),
        book_id: Number(empruntForm.book_id),
      })
      setEmpruntForm({ user_id: '', book_id: '' })
      await refreshEmpruntsAndRetards()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleReturnEmprunt(id) {
    setError('')
    try {
      await returnEmprunt(id)
      await refreshEmpruntsAndRetards()
      if (userHistoryId) {
        const data = await getHistorique(Number(userHistoryId))
        setHistorique(data)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleLoadHistorique(event) {
    event.preventDefault()
    setError('')
    try {
      if (!userHistoryId) {
        setHistorique([])
        return
      }
      const data = await getHistorique(Number(userHistoryId))
      setHistorique(data)
    } catch (err) {
      setError(err.message)
    }
  }

  function formatDate(value) {
    if (!value) {
      return '-'
    }
    return new Date(value).toLocaleString('fr-FR')
  }

  if (loading) {
    return <main className="layout"><p>Chargement des donnees...</p></main>
  }

  return (
    <main className="layout">
      <header className="hero">
        <div className="hero-overlay" aria-hidden="true"></div>
        <h1>Bibliotheque Numerique DIT</h1>
        <p>Gestion des livres, utilisateurs et emprunts depuis une interface React connectee a l API Fastify.</p>
      </header>

      {error ? <p className="error-banner">Erreur: {error}</p> : null}

      <section className="stats-grid">
        <article className="stat-card">
          <h2>Livres</h2>
          <strong>{stats.totalBooks}</strong>
        </article>
        <article className="stat-card">
          <h2>Utilisateurs</h2>
          <strong>{stats.totalUsers}</strong>
        </article>
        <article className="stat-card">
          <h2>Emprunts en cours</h2>
          <strong>{stats.empruntsEnCours}</strong>
        </article>
        <article className="stat-card">
          <h2>Retards</h2>
          <strong>{stats.retards}</strong>
        </article>
      </section>

      <nav className="tabs" aria-label="Navigation principale">
        <button
          type="button"
          className={activeTab === 'books' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('books')}
        >
          Livres
        </button>
        <button
          type="button"
          className={activeTab === 'users' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('users')}
        >
          Utilisateurs
        </button>
        <button
          type="button"
          className={activeTab === 'emprunts' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('emprunts')}
        >
          Emprunts
        </button>
      </nav>

      {activeTab === 'books' ? (
        <section className="panel">
          <h2>Catalogue des livres</h2>
          <form className="form-grid" onSubmit={handleAddBook}>
            <input
              value={bookForm.titre}
              onChange={(event) => setBookForm({ ...bookForm, titre: event.target.value })}
              placeholder="Titre"
              required
            />
            <input
              value={bookForm.auteur}
              onChange={(event) => setBookForm({ ...bookForm, auteur: event.target.value })}
              placeholder="Auteur"
              required
            />
            <input
              value={bookForm.isbn}
              onChange={(event) => setBookForm({ ...bookForm, isbn: event.target.value })}
              placeholder="ISBN"
              required
            />
            <input
              type="number"
              value={bookForm.annee}
              onChange={(event) => setBookForm({ ...bookForm, annee: event.target.value })}
              placeholder="Annee"
            />
            <input
              value={bookForm.editeur}
              onChange={(event) => setBookForm({ ...bookForm, editeur: event.target.value })}
              placeholder="Editeur"
            />
            <button type="submit">Ajouter le livre</button>
          </form>

          <form className="form-grid search-form" onSubmit={handleSearchBooks}>
            <input
              value={bookSearch.titre}
              onChange={(event) => setBookSearch({ ...bookSearch, titre: event.target.value })}
              placeholder="Recherche titre"
            />
            <input
              value={bookSearch.auteur}
              onChange={(event) => setBookSearch({ ...bookSearch, auteur: event.target.value })}
              placeholder="Recherche auteur"
            />
            <input
              value={bookSearch.isbn}
              onChange={(event) => setBookSearch({ ...bookSearch, isbn: event.target.value })}
              placeholder="Recherche ISBN"
            />
            <button type="submit">Rechercher</button>
            <button type="button" className="ghost" onClick={clearBookSearch}>
              Reinitialiser
            </button>
          </form>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titre</th>
                  <th>Auteur</th>
                  <th>ISBN</th>
                  <th>Annee</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.titre}</td>
                    <td>{book.auteur}</td>
                    <td>{book.isbn}</td>
                    <td>{book.annee || '-'}</td>
                    <td>
                      <button
                        type="button"
                        className="danger"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {activeTab === 'users' ? (
        <section className="panel">
          <h2>Utilisateurs</h2>
          <form className="form-grid" onSubmit={handleAddUser}>
            <input
              value={userForm.nom}
              onChange={(event) => setUserForm({ ...userForm, nom: event.target.value })}
              placeholder="Nom"
              required
            />
            <input
              type="email"
              value={userForm.email}
              onChange={(event) => setUserForm({ ...userForm, email: event.target.value })}
              placeholder="Email"
              required
            />
            <select
              value={userForm.type}
              onChange={(event) => setUserForm({ ...userForm, type: event.target.value })}
            >
              {USER_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button type="submit">Ajouter l utilisateur</button>
          </form>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nom}</td>
                    <td>{user.email}</td>
                    <td>{user.type}</td>
                    <td>
                      <button
                        type="button"
                        className="danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {activeTab === 'emprunts' ? (
        <section className="panel">
          <h2>Emprunts et retards</h2>
          <form className="form-grid" onSubmit={handleCreateEmprunt}>
            <input
              type="number"
              value={empruntForm.user_id}
              onChange={(event) => setEmpruntForm({ ...empruntForm, user_id: event.target.value })}
              placeholder="ID utilisateur"
              required
            />
            <input
              type="number"
              value={empruntForm.book_id}
              onChange={(event) => setEmpruntForm({ ...empruntForm, book_id: event.target.value })}
              placeholder="ID livre"
              required
            />
            <button type="submit">Creer emprunt</button>
          </form>

          <form className="form-grid history-form" onSubmit={handleLoadHistorique}>
            <input
              type="number"
              value={userHistoryId}
              onChange={(event) => setUserHistoryId(event.target.value)}
              placeholder="ID utilisateur pour historique"
            />
            <button type="submit">Afficher historique</button>
          </form>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Book ID</th>
                  <th>Date emprunt</th>
                  <th>Date retour</th>
                  <th>Rendu</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {emprunts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.user_id}</td>
                    <td>{item.book_id}</td>
                    <td>{formatDate(item.date_emprunt)}</td>
                    <td>{formatDate(item.date_retour)}</td>
                    <td>{item.rendu ? 'Oui' : 'Non'}</td>
                    <td>
                      {!item.rendu ? (
                        <button type="button" onClick={() => handleReturnEmprunt(item.id)}>
                          Marquer retour
                        </button>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Retards detectes</h3>
          <ul className="chips">
            {retards.length === 0 ? <li>Aucun retard detecte.</li> : null}
            {retards.map((item) => (
              <li key={item.id}>Emprunt #{item.id} - User {item.user_id} - Livre {item.book_id}</li>
            ))}
          </ul>

          <h3>Historique utilisateur</h3>
          <ul className="chips">
            {historique.length === 0 ? <li>Aucun historique charge.</li> : null}
            {historique.map((item) => (
              <li key={item.id}>
                Emprunt #{item.id} - Livre {item.book_id} - {item.rendu ? 'Retourne' : 'En cours'}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  )
}

export default App
