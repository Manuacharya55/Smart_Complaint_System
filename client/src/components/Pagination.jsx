import React from 'react'

const Pagination = ({setPage,page,users}) => {
  return (
     <div className="btn-holder">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page <= 1} // ✅ disable when page is 1
        >
          Prev
        </button>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={users?.length < 10} // ✅ disable if less than 10 results
        >
          Next
        </button>
      </div>
  )
}

export default Pagination