import React, { Dispatch, SetStateAction } from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface PaginatorProps {
    pagesNumber: number;
    activePage: number;
    setActivePage: Dispatch<SetStateAction<number>>
}

export const Paginator = ({ pagesNumber, setActivePage, activePage }: PaginatorProps) => {
    const pageArray = Array.from({ length: pagesNumber }, (_, i) => i + 1);

    const onClickPrev = () => {
        setActivePage((page) => page - 1 > 0 ? page - 1 : page)
    }

    const onClickNext = () => {
        setActivePage((page) => page + 1 <= pagesNumber ? page + 1 : page)
    }

    return (
        <Pagination >
            <Pagination.First />
            <Pagination.Prev onClick={onClickPrev} />
            {pageArray.map((page) => (
                <Pagination.Item key={page} active={page === activePage} onClick={() => setActivePage(page)}>{page}</Pagination.Item>
            ))}
            <Pagination.Next onClick={onClickNext} />
            <Pagination.Last />
        </Pagination>
    );
};
