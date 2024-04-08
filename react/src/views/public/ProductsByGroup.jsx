import PageComponent from '../../components/public/PageComponent'
import Breadcrumb from '../../components/public/Breadcrumb'
import Products from '../../components/public/Products';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userAxiosClient } from '../../axios';
import Categories from '../../components/public/Categories';
import Search from '../../components/public/Search';


export default function ProductsByCategory() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const { categorySlug } = useParams();
  
  useEffect(() => {
    setSearchQuery(searchParams.get('cq') || '');
  }, [searchParams]);


  useEffect(() => {
    userAxiosClient.get(`categories/get-by-slug/${categorySlug}`)
      .then(({ data }) => {
        setCategory(data.data);
        setCategories(data.data.childrens)
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
      });
  }, [categorySlug]);


  useEffect(() => {
    const search = searchParams.get('cq') || '';
    userAxiosClient.get(`products/${categorySlug}`, {
      params: { search }
    })
      .then(({ data }) => {
        setProducts(data.data);
      })
      .catch(error => {
        console.error('Error fetching products data:', error);
      });
  }, [searchParams, setProducts, categorySlug]);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = searchQuery.trim();
    setSearchParams((prevParams) => {
      searchValue === null
        ? prevParams.delete('cq')
        : prevParams.set('cq', searchValue);
      return prevParams;
    });
  };

  const handleSearchDelete = () => {
    setSearchQuery('')
    setSearchParams((prevParams) => {
      prevParams.delete('cq');
      return prevParams;
    });
  };

  return (
    <PageComponent >
      <Breadcrumb />
      <Categories categories={categories} />
      <hr />
      <h3 className='flex font-semibold text-lg p-4'>{category.title}</h3>
      <p className='flex p-4'>{category.description}</p>

      {/* Sort in results  */}

      <Search
        searchQuery={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onSubmit={handleSearchSubmit}
        onClick={handleSearchDelete}
        placeholder='Search in category'

      />

      <Products products={products} />
      {products.length === 0 &&
        <li className="py-5 flex justify-center">
          <p className="text-gray-500 ">No products available</p>
        </li>
      }

    </PageComponent>
  )
}
