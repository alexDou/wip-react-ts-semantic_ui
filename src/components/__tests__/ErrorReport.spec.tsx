import React from 'react';
import { mount } from 'enzyme';

import Error from '../../components/ErrorReport';

describe('component Error', function() {
    it("should render itself", () => {
        mount(<Error error="erroneous" />);
    });

    it("should display Message and be pending on event", () => {
        const wrapper = mount(<Error error="erroneous" />);

        // check on correct text
        expect(
          wrapper.text()
        ).toEqual('erroneous');
    });
});
