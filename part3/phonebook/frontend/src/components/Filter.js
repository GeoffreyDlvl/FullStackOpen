import React from "react"

const Filter = ({ searchTerms, handleSearchTermsChange }) => (
    <div>
        filter shown with <input
            value={searchTerms}
            onChange={handleSearchTermsChange} />
    </div>
)

export default Filter