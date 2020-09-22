import React, { useState, useEffect } from "react";
import { API } from "../config";
import fallbackImg from '../assets/img/food.png';

const ShowImage = ({ item, url }) => {
    const [source, setsource] = useState('');

    const fallbackImage = (e) => {
        setsource(fallbackImg);
    };

    useEffect(() => {
        setsource(`${API}/${url}/photo/${url === "recipe" ? item : item._id}`)
    }, [url, item]);

    return (
        <div className="ingredient__img">
            {item &&
                <img
                    src={source}
                    onError={fallbackImage}
                    alt={item.name}
                />}
        </div>
    )
};

export default ShowImage;