import React, {useEffect, useState, useMemo} from "react";
import axios from "axios";
import Pagination from "./Pagination";


const Table = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const numbers = [4, 3, 2, 1, 0];
    const [condition, setCondition] = useState([]);
    const [sortData, setSortData] = useState({key: 'date', keySort: 'asc'})
    const [currentProducts, setCurrentProducts] = useState([]);

    // condition lists
    const lists = [
        {text: 'Date', key: 'date'},
        {text: 'Title', key: 'title'},
        {text: 'Quantity', key: 'quantity'},
        {text: 'Distance', key: 'distance'},
    ]
    // condition lists

    // fetching api
    useEffect(() => {
        setLoading(true);
        axios.get("https://products-project-app.herokuapp.com/products")
            .then((res) => {
                if (res.data.success)
                    setProducts(res.data.products);
                setLoading(false);
            })
            .catch((err) => console.log(err))
    }, [])
    // fetching api

    // sorting products
    const sortProducts = (param) => {
        if (sortData.key === param) {
            if (sortData.keySort === 'asc')
                setSortData({...sortData, keySort: 'desc'})
            else setSortData({...sortData, keySort: 'asc'})
        } else {
            setSortData({key: param, keySort: 'asc'});
        }
        console.log(sortData.key)
    }

    useEffect(() => {
        if (currentProducts.length > 0 && typeof currentProducts[0][sortData.key] === 'string') {
            // console.log(currentProducts.length > 0 && typeof currentProducts[0][sortData.key]);
            currentProducts.sort((a, b) => {
                if (sortData.keySort === 'asc') {
                    return a[sortData.key].localeCompare(b[sortData.key])
                } else {
                    return b[sortData.key].localeCompare(a[sortData.key])
                }

            })
        } else {
            currentProducts.sort((a, b) => {
                if (sortData.keySort === 'asc') {
                    return a[sortData.key] - (b[sortData.key])
                } else {
                    return b[sortData.key] - (a[sortData.key])
                }
            })
        }
        setCurrentProducts([...currentProducts]);
    }, [sortData])
    // sorting products

    // pagination
    let indefOfLastProduct = currentPage * productPerPage;
    let indexOfFirstProduct = indefOfLastProduct - productPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    // pagination

    useEffect(() => {
        if (products.length > 0 && !search) {
            console.log(products.slice(indexOfFirstProduct, indefOfLastProduct))
            setCurrentProducts(products.slice(indexOfFirstProduct, indefOfLastProduct))

        }

    }, [indexOfFirstProduct, indefOfLastProduct, products, search])

    // filter products
    useMemo(() => {
        if (search) {
            setCurrentProducts(products.filter(
                product =>
                    product.date.toString().toLowerCase().includes(search.toLowerCase()) ||
                    product.title.toString().toLowerCase().includes(search.toLowerCase()) ||
                    product.quantity.toString().toLowerCase().includes(search.toLowerCase()) ||
                    product.distance.toString().toLowerCase().includes(search.toLowerCase())
            ))
        }
    }, [search])
    // filter products

    // delete conditions
    function deleteItem(id) {
        condition.forEach((item, index) => {
            if (item._id === id) {
                condition.splice(index, 1)
            }
        })
        setCondition([...condition])
    }
    // delete conditions

    return (
        <div>
            <input
                type="text"
                placeholder={'Search....'}
                className={'form-control my-4'}
                style={{width: '40%'}}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table className={'table table-hover table-bordered'}>
                <thead>
                <tr>
                    <th scope={'col'}>№</th>
                    {[{name: 'Date', key: 'date'}, {name: "Title", key: 'title'}, {
                        name: "Quantity",
                        key: 'quantity'
                    }, {name: "Distance", key: 'distance'}].map((item) => (
                        <th key={item.name} onClick={() => sortProducts(item.key)} scope={'col'}>{item.name}
                            {item.key === sortData.key && sortData.keySort === 'asc' &&
                                <i style={{cursor: 'pointer'}} className="fa-solid fa-arrow-down mx-2"></i>}
                            {item.key === sortData.key && sortData.keySort === 'desc' &&
                                <i style={{cursor: 'pointer'}} className="fa-solid fa-arrow-up mx-2"></i>}
                        </th>
                    ))}
                    <th scope={'col'}>Parameters</th>
                </tr>
                </thead>
                <tbody>

                {loading ? <h2>Loading.....</h2> :
                    currentProducts.length > 0 ? currentProducts.map((item, index) => (
                            <tr key={index}>
                                <th>{search ? index + 1 : indefOfLastProduct - numbers[index]}</th>
                                <td>{item.date}</td>
                                <td>{item.title}</td>
                                <td>{item.quantity} pcs</td>
                                <td>{item.distance}</td>
                                <td>
                                    <button onClick={() => setCondition([...condition, item])}
                                            className={'btn btn-primary'}>Condition
                                    </button>
                                </td>
                            </tr>
                        ))
                        : <h1>No Data</h1>
                }

                </tbody>
            </table>


            <Pagination productsPerPage={productPerPage} currentPage={currentPage} totalProducts={products.length}
                        paginate={paginate}/>

            {/* condition ui */}
            {condition.length > 0 &&
                <table className='table table-hover table-bordered'>
                    <tbody>
                    {lists.map(list => (
                        <tr>
                            <th>{list.text}</th>
                            {condition.map(item => (
                                <td>{item[list.key]}</td>
                            ))}
                        </tr>
                    ))}
                    {condition.length > 0 && (
                        <tr>
                            <th></th>
                            {condition.map(item => (
                                <td>
                                    <button className={'btn btn-danger'} onClick={() => deleteItem(item._id)}>delete
                                    </button>
                                </td>
                            ))}
                        </tr>
                    )}
                    </tbody>
                </table>
            }
        </div>
    );
}

export default Table;