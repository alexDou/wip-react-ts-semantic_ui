import React from 'react';
import { mount } from 'enzyme';
import HealthCheck from '../../components/HealthCheck';
import { Message } from 'semantic-ui-react';

describe('component HealthCheck', function() {
    it("should render itself", () => {
        mount(<HealthCheck />);
    });

    it("should display Message and be pending on event", () => {
        const wrapper = mount(<HealthCheck />);

        // display Message
        expect(
          wrapper.find(Message).length
        ).toEqual(1);

        // with a text
        expect(
          wrapper.text()
            .toLowerCase()
            .replace(/health/i,'')
            .replace(/check/i,'')
            .trim()
        ).toBeTruthy()
    });
});
