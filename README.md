# esbuild-native-node-modules-plugin
A plugin for esbuild to load native node modules, node-loader for esbuld, support `.node` file modules.

# install
``` javascript
npm install --save-dev esbuild-native-node-modules-plugin
```

# usage
``` javascript
// esbuild config options
const  { nativeNodeModulesPlugin }  = require("esbuild-native-node-modules-plugin");

modules.export = {
    ...
    plugins: [
        ...
        nativeNodeModulesPlugin,
        ...
    ],
    
}



```
