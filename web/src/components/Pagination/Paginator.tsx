import React, { Dispatch, SetStateAction } from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface PaginatorProps {
    pagesNumber: number;
    activePage: number;
    onPageChange: (page: number) => void;
}

export const Paginator = ({ pagesNumber, onPageChange, activePage }: PaginatorProps) => {
    const pageArray = Array.from({ length: pagesNumber }, (_, i) => i + 1);

    const isFirstPage = activePage === 1;

    const onClickPrev = () => {
        onPageChange(activePage - 1);
    }

    const onClickNext = () => {
        onPageChange(activePage + 1);
    }

    return (
        <Pagination >
            <Pagination.First disabled={isFirstPage} />
            <Pagination.Prev onClick={onClickPrev} disabled={isFirstPage} />
            {pageArray.map((page) => (
                <Pagination.Item key={page} active={page === activePage} onClick={() => onPageChange(page)}>{page}</Pagination.Item>
            ))}
            <Pagination.Next onClick={onClickNext} />
            <Pagination.Last />
        </Pagination>
    );
};
