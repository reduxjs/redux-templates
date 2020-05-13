import { addDecorator, configure } from "@storybook/react";
import { RouterDecorator } from "../.storybook/decorators/RouterDecorator";

import requireContext from "require-context.macro";

const req = requireContext("../src/stories", true, /.stories.tsx|mdx$/);

function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);

import "../src/App.css";

// Don't add global decorator for store because in certain stories store has default value!
// use stories/decorators/StoreProviderDecorator.tsx for decorating stories that need redux
addDecorator(RouterDecorator);
