import React, { Fragment, useState } from "react";

const Radio = ({ price, handleFilter}) => {
    const [value, setValues] = useState(0);

    const handleToggle = (e) => {
          handleFilter(e.target.value)
          setValues(e.target.value)
    }
    return price.map((p, index) => (
        <div key={index}>
            <input 
                className="mr-2 ml-4"
                onChange={handleToggle}
                name="radio"
                type="radio"
                value={p._id}
            />
            <label className="form-check-label">{ p.name}</label>
        </div >
    ))

}

export default Radio;