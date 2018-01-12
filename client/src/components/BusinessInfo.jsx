import React from 'react';

const BusinessInfo = (props) => {
  console.log(props.business);
  let imgArr = [];
  // for (let i = 0; i < props.business.rating; i++) {
  //   imgArr.push(
  //     (<img className="ratingLogo" key={i} src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>)
  //   )
  // }
  return (
    <div className="businessInfo">
      <div>Business Name</div>
      <div className="rating">{imgArr}</div>
      <div>Location</div>
      <div>Description</div>
      <div>Hours</div>
    </div>
  )
}

export default BusinessInfo;
