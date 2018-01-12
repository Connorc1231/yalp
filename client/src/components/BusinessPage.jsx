import React from 'react';
import Search from './Search.jsx'
import BusinessInfo from './BusinessInfo.jsx';
import PhotoFeed from './PhotoFeed.jsx';
import Reviews from './Reviews.jsx';

class BusinessPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="businessPage">
        <div id="form">
            <Search getBusinesses={this.props.getBusinesses}/>
        </div>
        <div className="businessInfo">
            <BusinessInfo /> 
        </div>
        <div className="PhotoFeed">
          <PhotoFeed />
        </div>
        <div className="reviews">
          <Reviews />  
        </div> 
        <div> 
        </div>
      </div>
    )
  }
}

export default BusinessPage;
