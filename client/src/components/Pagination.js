import React from 'react';


const Pagination = ({productsPerPage, totalProducts, paginate, currentPage}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className={'pagination'}>
                {pageNumbers.map((number) => (
                    <li key={number} className={
                        number === currentPage ? "page-item active" : "page-item"
                    }>
                        <a onClick={() => paginate(number)} href="#" className={'page-link'}>{number}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination;