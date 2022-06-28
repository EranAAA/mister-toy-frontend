
import { Link } from "react-router-dom";
import React from 'react'

export function ToyPreview({ toy }) {
    const isImgUrl = typeof toy.img === 'string' ? true : false 
    return (
        <Link to={`/toy/details/${toy._id}`}>
            {/* { !isImgUrl && <img src={require(`../assets/img/toys/toy${toy.img}.png`)} />} */}
            { !isImgUrl && <img src={`http://res.cloudinary.com/dfmhvgff2/image/upload/${toy.img}.png`} />}
            { isImgUrl && <img src={toy.img} />}
            <div className="preview-txt">
                <p >{toy.name} </p> |
                <p >${toy.price} </p>
            </div>
        </Link>
    )
}



