import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// tslint:disable-next-line:no-any
export const RouterDecorator = (storyFn: any) => {
    return <Router>{storyFn()}</Router>;
};
