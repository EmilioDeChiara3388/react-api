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
      <section className='posts'>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {
              postsData.data ?
                postsData.data.map(post => (
                  <div className="col" key={post.index}>
                    <div className="card">
                      <img src={'http://localhost:3000/imgs/posts/' + post.image} alt="" />
                      <p>
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
    </>
  )
}

export default App
