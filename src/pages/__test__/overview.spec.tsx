import React from 'react';
import { mount } from 'enzyme';
import { Message } from "semantic-ui-react";

import Overview from '../overview';


describe('base component App', function() {
    it("should render itself", () => {
        mount(<Overview />);
    });

    it("should initially display Message", () => {
        const wrapper = mount(<Overview />);

        // display Message
        expect(
          wrapper.find(Message).length
        ).toEqual(1);
    });
});
