import React from "react"

const PersonForm = ({ newName, newPhoneNumber,
    handleNewNameChange, handleNewPhoneNumberChange,
    addPerson }) => (
    <form onSubmit={addPerson}>
        <div>
            name: <input
                value={newName}
                onChange={handleNewNameChange} />
        </div>
        <div>
            phone: <input
                value={newPhoneNumber}
                onChange={handleNewPhoneNumberChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm