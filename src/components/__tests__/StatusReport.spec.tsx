import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Message } from 'semantic-ui-react';

import StatusReport from '../StatusReport';

describe('StatusReport component', function () {
    it('reports failure', () => {
        const errorReport = TestRenderer.create(
            <StatusReport pending={false} failure={true} ok={false} message={`error occurred`} />
        );

        expect(errorReport!.toTree()!.rendered!.instance instanceof Message).toBe(true);
        expect(errorReport!.toTree()!.rendered!.props!.color).toBe('red');
        expect(errorReport!.toTree()!.rendered!.props!.content).toBe('error occurred');
    });

    it('reports pending', () => {
        const errorReport = TestRenderer.create(
            <StatusReport pending={true} failure={false} ok={false} />
        );

        expect(errorReport!.toTree()!.rendered!.instance instanceof Message).toBe(true);
        expect(errorReport!.toTree()!.rendered!.props.color).toBe('yellow');
        expect(/fetching/i.test(errorReport!.toTree()!.rendered!.props!.content)).toBe(true);
    });

    it('do not report success', () => {
        const errorReport = TestRenderer.create(
            <StatusReport pending={false} failure={false} ok={true} />
        );

        expect(errorReport!.toTree()!.rendered).toBe(null);
    });
});
