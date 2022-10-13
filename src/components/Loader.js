import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader';

const Loader = () => {
  return (
    
          <div className="w-full min-h-screen flex justify-center items-center">
             <PuffLoader color="#60a5fa" />
          </div>
        
  )
}

export default Loader