import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import * as webpack from 'webpack';

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
