import React, { useState, useEffect } from "react";
import { API } from "../config";
import fallbackImg from '../assets/img/food.png';

const ShowImage = ({ item, url, photoPreview }) => {
    const [source, setsource] = useState('');

    const fallbackImage = (e) => {
        setsource(fallbackImg);
    };

    useEffect(() => {
        console.log('item', `${API}/${url}/photo/${item._id}`)
        setsource(`${API}/${url}/photo/${item._id}`)
    }, [url, item]);

    const image = () => {
        console.log(photoPreview)
        return !photoPreview ?
            <img src={source} onError={fallbackImage} alt={item.name} /> :
            <img src={photoPreview} alt="preview" />
    }

    return (
        <div className="ingredient__img">
            {item && image()}
        </div>
    )
};

export default ShowImage;