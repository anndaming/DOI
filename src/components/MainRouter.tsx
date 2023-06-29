import React from 'react';
import {TypeRoute} from "../utils/AutoRouter";
import {BrowserRouter, Route, Routes} from "react-router-dom";


export function MainRouter(props: {
    routes: TypeRoute[],
}) {
    return (
        <BrowserRouter>
            <Routes>
                {
                    props.routes.map((route: TypeRoute) => {
                        return <Route path={route.path} key={route.path} element={<route.component />}/>
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}
