import React from 'react';
import Items from '../components/ProductListing/Items';

const Home = props => (
    <div>
        <Items page={parseFloat(props.query.page) || 1}/>
    </div>
)
export default Home
