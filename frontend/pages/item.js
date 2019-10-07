import ProductPage from '../components/ProductDetail/ProductPage';

const Item = props => (
    <div>
        <ProductPage id={props.query.id}/>
    </div>
)
export default Item
