import { useState } from 'react'
import { Landing, Predict } from './pages'


function App() {
  const [paged, setPaged] = useState(0);

  const handlePageChange = (newPage) => {
    setPaged(newPage);
  };

  console.log(paged);

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <Landing handlePageChange={handlePageChange} paged={paged} />
        <Predict handlePageChange={handlePageChange} paged={paged} />
      </div>
    </>
  )
}

export default App
