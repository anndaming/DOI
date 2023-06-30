import React from 'react';
import {render, screen} from '@testing-library/react';
import {WorkCard} from './index';
import {requestWorkDOI} from "../../utils/UnitTestTool";
import {Work} from "../../models/Work.model";
import "../../locales/i18n";

test('Component WorkCard', async () => {
    const work: Work = await requestWorkDOI("10.5555/12345678");
    render(<WorkCard work={work}/>);
    expect(screen.getByText(/Toward a Unified Theory of High-Energy Metaphysics: Silly String Theory/i)).toBeInTheDocument();
    expect(screen.getByText(/Chairs: Friends of Josiah Carberry/i)).toBeInTheDocument();
});
