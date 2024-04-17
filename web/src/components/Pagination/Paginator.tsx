import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { calculatePagination } from './helpers';

const MAX_VISIBLE_PAGES = 10;

interface PaginatorProps {
    pagesNumber: number;
    activePage: number;
    onPageChange: (page: number) => void;
}

export const Paginator = ({ pagesNumber, onPageChange, activePage }: PaginatorProps) => {
    const pagesArray = calculatePagination(activePage, pagesNumber, MAX_VISIBLE_PAGES);

    const isFirstPage = activePage === 1;
    const isLastPage = activePage === pagesNumber;

    const onClickPrev = () => {
        onPageChange(activePage - 1);
    }

    const onClickNext = () => {
        onPageChange(activePage + 1);
    }

    const onClickFirst = () => {
        onPageChange(1);
    }

    const onClickLast = () => {
        onPageChange(pagesNumber);
    }

    return (
        <Pagination >
            <Pagination.First disabled={isFirstPage} onClick={onClickFirst} />
            <Pagination.Prev disabled={isFirstPage} onClick={onClickPrev} />
            {pagesArray.map((page) => (
                <Pagination.Item key={page} active={page === activePage} onClick={() => onPageChange(page)}>{page}</Pagination.Item>
            ))}
            <Pagination.Next disabled={isLastPage} onClick={onClickNext} />
            <Pagination.Last disabled={isLastPage} onClick={onClickLast} />
        </Pagination>
    );
};
