import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import Root from '@containers/Root';
import Projects from '@components/Projects';
import SearchForm from '@components/SearchForm';
import SearchContainer from '@containers/search';
import {
    Segment, Card, Loader
} from 'semantic-ui-react';

describe('Projects component', () => {
    it('renders itself', () => {
        const proj = shallow(
            <Projects />
        );

        expect(proj.find(Segment)).toHaveLength(1);
    });
    it('renders SearchContainer and SearchForm', () => {
        const proj = mount(
            <Root iniStore={{} as any}>
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>
            </Root>
        );

        expect(proj.find(SearchContainer)).toHaveLength(1);
        expect(proj.find(SearchForm)).toHaveLength(1);
        proj.unmount();
    });
    it('has pending & not found state', () => {
        const state = {
            session: {
                pending: true,
                ok: false,
                failure: false,
                message: ''
            },
            repos: {
                query: 'find something',
                page: 1,
                items: [],
                shouldFetch: false
            }
        }

        const proj = mount(
            <Root iniStore={state}>
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>
            </Root>
        );

        expect(proj.find(Loader)).toHaveLength(1);
        proj.unmount();

        state.session.pending = false;
        state.session.ok = true;
        state.session.message = '404';

        const proj2 = mount(
            <Root iniStore={state}>
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>
            </Root>
        );

        expect(proj2.find(Card)).toHaveLength(0);
        expect(proj2.find(Loader)).toHaveLength(0);
        proj2.unmount();
    });
    it('renders item from state', () => {
        const state = {
            session: {
                pending: true,
                ok: false,
                failure: false,
                message: ''
            },
            repos: {
                query: 'find something',
                page: 1,
                items: [{
                    "id": 123456,
                    "node_id": "ABC=123",
                    "name": "repo",
                    "full_name": "author/repo",
                    "private": false,
                    "author": {
                        "login": "author",
                        "id": 654321,
                        "node_id": "123=ABC",
                        "avatar_url": "https://avatars0.githubusercontent.com/u/654321?v=4",
                        "url": "https://api.github.com/users/author",
                    },
                    "html_url": "https://github.com/author/repo",
                    "description": "Repo",
                    "url": "https://api.github.com/repos/apollographql/react-apollo",
                    "size": 12702,
                    "stargazers_count": 5817,
                    "watchers_count": 5817,
                    "language": "TypeScript"
                }],
                shouldFetch: false
            }
        }

        const proj = mount(
            <Root iniStore={state}>
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>
            </Root>
        );

        expect(proj.find(Card)).toHaveLength(1);
        proj.unmount();
    });
    it('matches snapshot', () => {
        const proj = mount(
            <Root iniStore={{}}>
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>
            </Root>
        );

        expect(proj).toMatchSnapshot();
        proj.unmount();
    });
});
