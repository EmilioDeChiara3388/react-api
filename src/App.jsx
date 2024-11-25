import { useState, useEffect } from 'react'
import AppHeader from './components/AppHeader'
import './App.css'

const initialPostsData = {
  title: '',
  slug: '',
  content: '',
  image: '',
  //tags: ""
}

function App() {

  const [newPost, setNewPost] = useState(initialPostsData)
  const [posts, setPosts] = useState([])

  function fetchData(url = "http://127.0.0.1:3000/") {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        setPosts(data)
      })
  }

  useEffect(fetchData, [])

  const addPost = (e) => {
    e.preventDefault();

    const postToAdd = {
      ...newPost,
    }

    fetch("http://127.0.0.1:3000/posts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postToAdd)
    })
      .then(resp => resp.json())
      .then(addedPost => {
        setPosts([...posts.data, addedPost]);
        setNewPost({});
      })
      .catch(error => console.error("Errore nell'aggiunta del post:", error));
  }

  const handleFormField = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  }

  const postToRemove = (slug) => {
    fetch(`http://127.0.0.1:3000/posts/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setPosts(posts.data.filter(post => post.slug !== slug));
      })
      .catch(error => console.error("Errore nella cancellazione del post:", error));
  }

  return (
    <>
      <AppHeader />
      <main>
        <section className='posts'>
          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {
                posts.data ?
                  posts.data.map(post => (
                    <div className="col" key={post.slug}  >
                      <div className="card border border-danger" >
                        <img className='rounded' src={'http://localhost:3000/imgs/posts/' + post.image} alt="" />
                        <div className='d-flex justify-content-between align-items-center'>
                          <div>
                            <p className='m-2'> {post.title} </p>
                          </div>
                          <div>
                            <button className='mx-1 px-1' onClick={() => postToRemove(post.slug)} >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) :
                  <p>Nessun risultato</p>
              }
            </div>
          </div>
        </section>

        <div className="container my-5">
          <div className="p-2 mb-4 bg-dark text-white rounded-3">
            <div className="container-fluid py-2">
              <h3 className="display-5 fw-bold mb-3">Aggiungi articolo</h3>
              <button className="btn btn-primary btn-lg" type="button" popovertarget="off-canvas-form">
                Aggiungi
              </button>
            </div>
          </div>

          <div id="off-canvas-form" popover="true" className='p-5' style={{ minHeight: "100dvh", width: "50%" }}>
            <div className='d-flex justify-content-between align-item-center'>
              <h4>Aggiungi Articolo</h4>
              <button className="btn btn-primary" type="button" popovertarget="off-canvas-form" popovertargetaction="hide">
                Chiudi
              </button>
            </div>

            <form className='my-3' onSubmit={addPost}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Titolo Articolo</label>
                <div className="input-group mb-3">
                  <input name='title' id='title' type="text" className="form-control" placeholder="Inserisci Titolo Articolo" aria-label="Titolo Articolo" aria-describedby="button-addon2" value={newPost.title} onChange={handleFormField} required />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="slug" className="form-label">Slug Articolo</label>
                <div className="input-group mb-3">
                  <input name='slug' id='slug' type="text" className="form-control" placeholder="Inserisci Slug Articolo" aria-label="Slug Articolo" aria-describedby="button-addon2" value={newPost.slug} onChange={handleFormField} required />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="content" className="form-label">Contenuto</label>
                <textarea className="form-control" name="content" id="content" rows="7" placeholder="Inserisci Contenuto Articolo" value={newPost.content} onChange={handleFormField} required></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">Immagine</label>
                <div className="input-group mb-3">
                  <input name='image' id='image' type="text" className="form-control" placeholder="Inserisci percorso immagine" aria-label="Immagine Articolo" aria-describedby="button-addon2" value={newPost.image} onChange={handleFormField} />
                </div>
              </div>

              {/* <div className='d-flex justify-content-around'>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="tags" value={postsData.data.tags} onChange={handleAddingForm} />
                  <label className="form-check-label" htmlFor="tags"> Antipasti </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="tags" value={postsData.data.tags} onChange={handleAddingForm} />
                  <label className="form-check-label" htmlFor="tags"> Primi </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="tags" value={postsData.data.tags} onChange={handleAddingForm} />
                  <label className="form-check-label" htmlFor="tags"> Secondi </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="tags" value={postsData.data.tags} onChange={handleAddingForm} />
                  <label className="form-check-label" htmlFor="tags"> Dolci </label>
                </div>
              </div> */}

              <div>
                <button type="submit" className="btn btn-primary my-3">Pubblica</button>
              </div>

            </form>
          </div>
        </div>

      </main>
    </>
  )
}

export default App
