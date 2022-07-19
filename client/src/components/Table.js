import React, {useEffect, useState} from "react";
import axios from "axios";

const Table = () => {
    const [products, setProducts] = useState([]);
    // fetching api
    useEffect(() => {
        axios.get("http://localhost:5000/products/")
            .then((res) => {
                if (res.data.success)
                    setProducts(res.data.products);
            })
            .catch((err) => console.log(err))
    }, [])

    console.log(products);
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

                {products?.map((item, index) => (
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
        </div>
    );
}

export default Table;