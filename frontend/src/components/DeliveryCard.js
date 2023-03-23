import React from 'react';

const DeliveryCard = ({ icon, heading, description }) => {
  return (
    <div className='delivery-returns'>
        <span className="delivery-icons">
            {icon}
        </span>
        <span className='delivery-details'>
            <div className="delivery-heading">
                {heading}
            </div>
            <div className="delivery-description">
                {description}
            </div>
        </span>
    </div>
  )
}

export default DeliveryCard;