import { useState, useEffect } from 'react'
import AppHeader from './components/AppHeader'
import './App.css'

const initialPostsData = {
  title: "",
  slug: "",
  content: "",
  image: '',
  /* tags: "" */
}

function App() {

  const [postsData, setPostsData] = useState(initialPostsData)
  const [posts, setPosts] = useState([])


  function fetchData(url = "http://127.0.0.1:3000/") {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        setPosts(data)
      })
  }

  useEffect(fetchData, [])


  function handleAddingForm(e) {
    e.preventDefault()

    const newPost = {
      id: Date.now(),
      ...postsData
    };

    fetch("http://127.0.0.1:3000/", {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log('Success:', response)
        setPosts([
          ...posts,
          response.data])
        setPostsData(initialPostsData)
      })
      .catch(error => console.error('Error:', error));
  }

  function handleFormField(e) {
    const { name, value } = e.target;
    setPostsData({
      ...postsData,
      [name]: value
    });
  }




  /* function removePost(e) {
    const postToRemove = e.target.getAttribute("data-slug")
    const newPosts = postsData.data.filter((post) => post.slug != postToRemove)
    setPosts(newPosts)
  } */


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
                    <div className="col" key={post.slug} >
                      <div className="card border border-danger" >
                        <img className='rounded' src={'http://localhost:3000/imgs/posts/' + post.image} alt="" />
                        <div className='d-flex justify-content-between align-items-center'>
                          <div>
                            <p className='m-2'> {post.title} </p>
                          </div>
                          <div>
                            <button className='mx-1 px-1' /* onClick={removePost} */>
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

            <form className='my-3' onSubmit={handleAddingForm}>
              <div className="mb-3">
                <label htmlFor="Titolo" className="form-label">Titolo Articolo</label>
                <div className="input-group mb-3">
                  <input name='titolo' id='titolo' type="text" className="form-control" placeholder="Inserisci Titolo Articolo" aria-label="Titolo Articolo" aria-describedby="button-addon2" value={posts.title} onChange={handleFormField} required />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="Slug" className="form-label">Slug Articolo</label>
                <div className="input-group mb-3">
                  <input name='Slug' id='Slug' type="text" className="form-control" placeholder="Inserisci Slug Articolo" aria-label="Slug Articolo" aria-describedby="button-addon2" value={posts.slug} onChange={handleFormField} required />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="contenuto" className="form-label">Contenuto</label>
                <textarea className="form-control" name="contenuto" id="contenuto" rows="7" placeholder="Inserisci Contenuto Articolo" value={posts.content} onChange={handleFormField} required></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="Immagine" className="form-label">Immagine</label>
                <div className="input-group mb-3">
                  <input name='image' id='image' type="text" className="form-control" placeholder="Inserisci percorso immagine" aria-label="Immagine Articolo" aria-describedby="button-addon2" value={posts.image} onChange={handleFormField} />
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
