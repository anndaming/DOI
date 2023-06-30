import React from 'react';
import {render, screen} from '@testing-library/react';
import {WorkDetail} from './index';
import {Work} from "../../models/Work.model";
import {requestWorkDOI} from "../../utils/UnitTestTool";
import "../../locales/i18n";

test('Component WorkDetail', async () => {
    const work: Work = await requestWorkDOI("10.5555/12345678");
    render(<WorkDetail work={work}/>);
    expect(screen.getByText(/Toward a Unified Theory of High-Energy Metaphysics: Silly String Theory/i)).toBeInTheDocument();
    expect(screen.getByText(/Department of Psychoceramics, Brown University/i)).toBeInTheDocument();
});
