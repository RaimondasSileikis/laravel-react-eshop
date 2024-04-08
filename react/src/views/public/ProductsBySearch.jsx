import PageComponent from '../../components/public/PageComponent'
import Products from '../../components/public/Products';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userAxiosClient } from '../../axios';
import Categories from '../../components/public/Categories';


export default function ProductsBySearch() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    userAxiosClient.get('/products', {
      params: { search: searchQuery }
    }).then(({ data }) => {
      setProducts(data.data);
    })
    .catch(error => {
      console.error('Error fetching products data:', error);
    });
  }, [searchQuery]);


  const categories = products
  .flatMap(p => p.categories.map(c => c.id)) // Flatten category IDs
  .filter((id, index, array) => array.indexOf(id) === index) // Extract unique IDs
  .map(id => products.flatMap(p => p.categories).find(c => c.id === id)); // Map IDs to category objects

  return (
    <PageComponent>
      <Categories categories={categories}  />
      <hr />
      <h3 className='flex font-semibold text-lg p-4'>
        Here are the search results for the phrase &quot;{searchQuery}&quot;
      </h3>
      <Products products={products} />
      {products.length === 0 && <div><h1>No products</h1></div>}
    </PageComponent>
  )
}
