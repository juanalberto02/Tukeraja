import { useState } from 'react'
import { About, Blogs, Landing, Predict } from './pages'


function App() {
  const [paged, setPaged] = useState(0);
  // State pages: 
  // 0: Landing Page, 1: Landing to Predict, 2: Landing to About, 3: Landing to Blogs, 4: About to Predict, 5: Blogs to Predict.
  const handlePageChange = (newPage) => {
    setPaged(newPage);
  };

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <Landing handlePageChange={handlePageChange} paged={paged} />
        <div className={`w-[300vw] h-screen flex 
          ${paged === 2 ? "scroll-to-right" :
            paged === 3 ? "scroll-to-left" :
              paged === 4 ? "scroll-to-home-f-about" :
                paged === 5 ? "scroll-to-home-f-blogs" : "translate-x-[-100vw]"
          }`}>
          <Blogs handlePageChange={handlePageChange} paged={paged} />
          <Predict handlePageChange={handlePageChange} paged={paged} />
          <About handlePageChange={handlePageChange} paged={paged} />
        </div>
      </div>
    </>
  )
}

export default App
