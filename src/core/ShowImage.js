import { API } from '../config';
import React from 'react';

const ShowImage = ({ item, url }) => (
    <div className="productImage">
        <img className='mb-3' src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            style={{ maxWidth: "80 %", maxHeight: "80%" }}
        />
    </div>
)

export default ShowImage;