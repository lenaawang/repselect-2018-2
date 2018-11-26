import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';

const production = !process.env.ROLLUP_WATCH;

export default {
	entry: 'src/main.js',
	dest: 'public/bundle.js',
	format: 'iife',
	moduleName: 'app',
	sourceMap: true,
	plugins: [
		svelte({
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/bundle.css');
			},

			// this results in smaller CSS files
			cascade: false
		}),

		json({
      preferConst: true
    }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			preferBuiltins: false,
		}),

		commonjs({
			ignoreGlobal: true,
		}),
		globals(),
		builtins(),
		babel({
			//exclude: 'node_modules/**' // only transpile our source code
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), transpile and minify
		production && babel({
			//exclude: 'node_modules/**' // only transpile our source code
    }),
		production && uglify({}, minify)
	]
};
