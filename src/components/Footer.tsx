import React, { SyntheticEvent } from 'react';
import { Container, Pagination, PaginationProps } from 'semantic-ui-react';
import { style } from 'typestyle';

import apiConfig from '@api/api.config';
import { TFooterProps } from '@t/app';

const footerStyle = style({
    position: 'fixed',
    left: '0px',
    bottom: '0px',
    padding: '2em 0 2em 4em',
    width: '100%',
});

const Footer = ({ pages, active, pageChange }: TFooterProps) => {

    const total = Math.floor(pages / apiConfig.defaults.per_page);

    const handlePageChange = (e: SyntheticEvent, d: PaginationProps) => {
        const turnPage = parseInt(`${d.activePage}`);
        pageChange(turnPage);
    }

    return (total ?
        <Container className={footerStyle}>
            <Pagination
                defaultActivePage={active}
                totalPages={total}
                onPageChange={handlePageChange}
            />
        </Container>
        : <></>
    )
}

export default Footer;