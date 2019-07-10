import React from 'react';
import { shallow } from 'enzyme';
import { Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import App from '../home';

describe('base component App', function() {
    it("should render itself", () => {
        shallow(<App />);
    });

    it("should display header and link", () => {
        const wrapper = shallow(<App />);

        // check on non-empty header
        expect(
          wrapper
            .find(Container)
            .find(Header)
            .text()
            .trim()
        ).toBeTruthy();

        // check on link
        expect(
          wrapper
            .find(Container)
            .find(Link)
            .text()
            .trim()
        ).toBeTruthy();
    });
});
