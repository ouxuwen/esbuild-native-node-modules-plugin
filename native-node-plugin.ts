import { PluginBuild } from 'esbuild';
export const nativeNodeModulesPlugin = {
  name: 'native-node-modules',
  setup(build: PluginBuild) {
    // If a ".node" file is imported within a module in the "file" namespace, resolve
    // it to an absolute path and put it into the "node-file" virtual namespace.
    build.onResolve({ filter: /\.node$/, namespace: 'file' }, (args: any) => {
      // console.log('1onResolve:-------------------', args);
      return {
        path: require.resolve(args.path, {
          paths: [args.resolveDir],
        }),
        namespace: 'node-file',
      };
    });

    // Files in the "node-file" virtual namespace call "require()" on the
    // path from esbuild of the ".node" file in the output directory.
    build.onLoad({ filter: /.*/, namespace: 'node-file' }, (args: any) => {
      // console.log('2onLoad:-------------------', args);
      return {
        contents: `
        import path from ${JSON.stringify(args.path)}
        try { module.exports = require(path) }
        catch {}
      `,
      };
    });

    // If a ".node" file is imported within a module in the "node-file" namespace, put
    // it in the "file" namespace where esbuild's default loading behavior will handle
    // it. It is already an absolute path since we resolved it to one above.
    build.onResolve(
      { filter: /\.node$/, namespace: 'node-file' },
      (args: any) => {
        // console.log('3onResolve:----------------------', args);
        return {
          path: args.path,
          namespace: 'file',
        };
      }
    );

    // Tell esbuild's default loading behavior to use the "file" loader for
    // these ".node" files.
    let opts = build.initialOptions;
    opts.loader = opts.loader || {};
    opts.loader['.node'] = 'file';
  },
};
