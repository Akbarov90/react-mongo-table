import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "./Pagination";

const Table = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    // fetching api
    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:5000/products/")
            .then((res) => {
                if (res.data.success)
                    setProducts(res.data.products);
                setLoading(false);
            })
            .catch((err) => console.log(err))
    }, [])

    const indefOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indefOfLastProduct - productPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indefOfLastProduct)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div>
            <table className={'table table-hover table-bordered'}>
                <thead>
                <tr>
                    <th scope={'col'}>№</th>
                    <th scope={'col'}>Date</th>
                    <th scope={'col'}>Title</th>
                    <th scope={'col'}>Quantity</th>
                    <th scope={'col'}>Distance</th>
                </tr>
                </thead>
                <tbody>

                {loading ? <h2>Loading.....</h2> :
                    currentProducts?.map((item, index) => (
                        <tr>
                            <th>{index + 1}</th>
                            <td>{item.date}</td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>{item.distance}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <Pagination productsPerPage={productPerPage} totalProducts={products.length} paginate={paginate}/>
        </div>
    );
}

export default Table;