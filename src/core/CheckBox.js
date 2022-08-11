import React, { useState } from 'react';

const CheckBox = ({ categories, handleFilter }) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategory = [...checked];

        if (currentCategoryId === -1) {
            newCheckedCategory.push(c);
        } else {
            newCheckedCategory.splice(currentCategoryId, 1);
        }

        setChecked(newCheckedCategory);
        handleFilter(newCheckedCategory);
    }



    return categories.map((item, index) => (
         <li key={index} className='list-unstyle'>
            <input
                className='form-check-input'
                type='checkbox'
                onChange={handleToggle(item._id)}
                value={checked.indexOf(item._id === -1)}
            />
            <label className='form-check-label'>{ item.name}</label>
        </li>
    ))

}

export default CheckBox;