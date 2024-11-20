import { useState, useEffect } from 'react'
import AppHeader from './components/AppHeader'
import './App.css'

function App() {

  const [postsData, setPostsData] = useState({})

  function fetchData(url = "http://127.0.0.1:3000/") {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        setPostsData(data)
      })
  }

  useEffect(fetchData, [])

  return (
    <>
      <AppHeader />
      <main>
        <section className='posts'>
          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {
                postsData.data ?
                  postsData.data.map(post => (
                    <div className="col" key={post.index}>
                      <div className="card border border-danger">
                        <img className='rounded' src={'http://localhost:3000/imgs/posts/' + post.image} alt="" />
                        <p className='my-2 text-center'>
                          {post.title}
                        </p>
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
          </div>
        </div>
      </main>
    </>
  )
}

export default App
