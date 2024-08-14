import React from 'react'
import "./Card.css";
export const Card = ({
    imgSrc,
    imgAlt,
    description,
    title,
    buttontext,
    link
}) => {
    return (
    <div className='card-container'>
   {imgSrc && imgAlt && ( <img  src={imgSrc} alt={imgAlt}  className='card-img' />
)}
     
        {title &&<h1 className='card-title'>{title}</h1>}
       {description && <p className='card-description'>{description}</p>
       }
       {buttontext && link &&<a href={link} className='card-btn'>{buttontext}</a>
}</div>
    );
}
export default Card;