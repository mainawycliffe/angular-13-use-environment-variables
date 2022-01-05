# Angular 13 Consume Environment Variables Demo

First, install `@angular-builders/custom-webpack`:

```sh
yarn add --dev @angular-builders/custom-webpack
```

Next, replace `@angular-devkit/build-angular` with
`@angular-builders/custom-webpack` in your `angular.json` for the project(s) you
want to use environment variables in. Follow instructions
[here](https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack#usage)
on how to.

Then add a `custom-webpack.config.ts` file, in it, we will define a webpack
plugin, declaring the variables we want to pass to our application and the
source will be environment variables, but we can pass the data from any other
source including reading the package.json file as demoed [here](https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack#custom-webpack-config-function).:

```ts
import {
  CustomWebpackBrowserSchema,
  TargetOptions,
} from "@angular-builders/custom-webpack";
import * as webpack from "webpack";

export default (
  config: webpack.Configuration,
  options: CustomWebpackBrowserSchema,
  targetOptions: TargetOptions
) => {
  config.plugins?.push(
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(process.env["APP_VERSION"] || "1.0.0"),
    })
  );

  return config;
};
```

Pay attention to the following section:

```ts
config.plugins?.push(
  new webpack.DefinePlugin({
    APP_VERSION: JSON.stringify(process.env["APP_VERSION"] || "1.0.0"),
  })
);
```

We are defining an `APP_VERSION` variable, and in it, we are passing the value
from the environment variable and defaulting to `1.0.0` if the environment variable is not set. Feel
free to replace the variable with the variables of your choice i.e.

```ts
config.plugins?.push(
  new webpack.DefinePlugin({
    APP_VERSION: JSON.stringify(process.env["APP_VERSION"] || "1.0.0"),
    OTHER_VARIABLE: JSON.stringify(process.env["OTHER_VARIABLE"] || "1.0.0"),
  })
);
```

And finally, we can consume it inside our Angular app:

```ts
import { Component } from "@angular/core";

// make sure to declare a global variable here to prevent typescript from throwing an error
declare var APP_VERSION: string;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor() {
    console.log(`APP_VERSION: ${APP_VERSION}`);
  }
}
```

You can test this demo by running and check the browser console on the value being
logged out:

```sh
APP_VERSION=10.0.1 ng s
```

where `APP_VERSION` is the environment variable.
