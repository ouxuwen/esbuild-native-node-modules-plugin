"use strict";
exports.__esModule = true;
exports.nativeNodeModulesPlugin = void 0;
exports.nativeNodeModulesPlugin = {
    name: 'native-node-modules',
    setup: function (build) {
        build.onResolve({ filter: /\.node$/, namespace: 'file' }, function (args) {
            return {
                path: require.resolve(args.path, {
                    paths: [args.resolveDir]
                }),
                namespace: 'node-file'
            };
        });
        build.onLoad({ filter: /.*/, namespace: 'node-file' }, function (args) {
            return {
                contents: "\n        import path from ".concat(JSON.stringify(args.path), "\n        try { module.exports = require(path) }\n        catch {}\n      ")
            };
        });
        build.onResolve({ filter: /\.node$/, namespace: 'node-file' }, function (args) {
            return {
                path: args.path,
                namespace: 'file'
            };
        });
        var opts = build.initialOptions;
        opts.loader = opts.loader || {};
        opts.loader['.node'] = 'file';
    }
};
//# sourceMappingURL=native-node-plugin.js.map