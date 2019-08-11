import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
    Segment, Container, Grid, Responsive, Header, Divider, Icon, Card, Image, Button
} from 'semantic-ui-react';
import { style } from 'typestyle';

import apiConfig from '@api/api.config';
import { AppState, ProjectsProps, ThunkActionCreate } from '@t/app';
import * as actions from '@store/actions';
import SearchContainer from '@containers/search';
import StatusReport from '@components/StatusReport';
import Footer from '@components/Footer';

const cardStyle = style({
    $nest: {
        '&.ui.card, &.ui.cards>.card': {
            width: '98%',
        },
    }
});

class Projects extends Component<AppState & ProjectsProps & RouteComponentProps, AppState> {

    componentDidMount(): void {
        const { session, repos, getSearch } = this.props;

        const query = repos.query || '';

        if (!session.pending && repos.shouldFetch) {
            getSearch(query, 1);
        }
    }

    shouldComponentUpdate(
        nextProps: Readonly<AppState & RouteComponentProps>,
        nextState: Readonly<AppState>, nextContext: any
    ): boolean {
        // const nextItemId = nextProps.repos.repos!.items && nextProps.repos.repos!.items![0].id;
        // const itemId = this.props.repos.repos!.items && this.props.repos.repos!.items![0].id;

        // eslint-disable-next-line no-console
        console.log(
            'SH OK',
            nextProps.repos.query !== this.props.repos.query
            || nextProps.repos.page !== this.props.repos.page
            || nextProps.repos.per_page !== this.props.repos.per_page
            || nextProps.session.ok !== this.props.session.ok
        )
        return (
            nextProps.repos.query !== this.props.repos.query
            || nextProps.repos.page !== this.props.repos.page
            || nextProps.repos.per_page !== this.props.repos.per_page
            || nextProps.session.ok !== this.props.session.ok
            // || nextItemId !== itemId
        );
    }

    componentDidUpdate(
        prevProps: Readonly<AppState & ProjectsProps & RouteComponentProps>,
        prevState: Readonly<AppState>, snapshot?: any
    ): void {
        const { session, repos, getSearch, setPerPage } = this.props;

        // get data to display from API
        if (!session.pending && repos.shouldFetch) {
            const query = repos.query || '';
            getSearch(query, repos.page || 1);

            // how many needs to be fetched to cover this page
            // const pageNum = repos.page || 1;
            // let per_page = 10;
            // if (repos!.repos!.items! && repos!.repos!.items!.length) {
            //     per_page = pageNum * apiConfig.defaults.per_page - repos!.repos!.items!.length;
            // }
            //
            // if (per_page !== repos.per_page) {
            //     setPerPage(per_page);
            // }
            //
            // const query = repos.query || '';
            // if (query && query.length) {
            //     getSearch(query, repos.page || 1);
            // }
        }
    }

    displayItems() {
        const { session, repos } = this.props;

        const pageNum = repos.page || 1;

        const endIdx = pageNum * apiConfig.defaults.per_page;
        const startIdx = endIdx - apiConfig.defaults.per_page;
        const items = repos!.repos!.items
            ? repos!.repos!.items.slice(startIdx, endIdx)
            : [];

        return (session.ok ?
            <Segment color={items.length ? 'green' : 'grey'}>
                <Grid celled="internally" stackable columns={3}>
                    {items.map(it =>
                        <Grid.Column key={it.id}>
                            <Card centered className={cardStyle}>
                                <Card.Content>
                                    <Image floated="right" size="mini" src={it.owner.avatar_url} />
                                    <Card.Header as="a" href={it.owner.url}>
                                        {it.full_name.length < 25
                                            ? it.full_name
                                            : `${it.full_name.substr(0, 25)}...`}
                                    </Card.Header>
                                    <Card.Meta>{it.language}</Card.Meta>
                                    <Card.Description>
                                        Owner: <strong>{it.owner.login}</strong>
                                    </Card.Description>
                                    <Card.Description>
                                        Stars: <strong>{it.stargazers_count}</strong>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    )}
                </Grid>
            </Segment>
            : <></>
        )
    }

    handlePageChange = (page: number) => {
        const { setPage } = this.props;

        setPage(page, true);
    }

    render() {
        const { session, repos } = this.props;

        const pageNum = repos.page || 1;

        return (
            <>
                <Divider horizontal>
                    <Header as="h4">
                        <Icon name="search" />
                        Search repositories
                    </Header>
                </Divider>
                <Responsive as={Container}>
                    <SearchContainer
                        size="small"
                        color="grey"
                        stacked={false}
                        disabled={false}
                        query={repos.query as string}
                    />
                </Responsive>

                <Divider horizontal>
                    <Header as="h4">
                        <Icon name="github square" />
                        Matching repositories
                    </Header>
                </Divider>
                <Responsive as={Container}>
                    {this.displayItems()}
                    <StatusReport { ...session } />
                </Responsive>
                <Footer
                    pages={repos!.repos!.total_count || 0}
                    active={pageNum}
                    pageChange={this.handlePageChange}
                    {...session}
                />
            </>
        );
    }
}

const mapStateToProps = (state: AppState) => state;

const mapDispatchToProps = (dispatch: ThunkActionCreate) => {
    return {
        getSearch: (query: string, page: number) => dispatch(actions.repos.getSearch(query, page)),
        setPage: (page: number, shouldFetch: boolean) => dispatch(actions.repos.setPage(page, shouldFetch)),
        setPerPage: (per_page: number) => dispatch(actions.repos.setPerPage(per_page)),
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Projects) as React.ComponentType;
