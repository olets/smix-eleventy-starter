// Gulp
import { src, dest, watch, series } from "gulp";

// PostCSS
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import tailwindcss from "tailwindcss";
import cssNesting from "postcss-nesting";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

import { paths } from "../paths";

function css() {
  const plugins = [cssImport, tailwindcss, cssNesting, autoprefixer];

  return src(`${paths.css.src}/${paths.css.name}`)
    .pipe(postcss(plugins))
    .pipe(dest(paths.css.dest));
}

function cssProcess() {
  const plugins = [cssnano];

  return src(`${paths.css.dest}/${paths.css.name}`)
    .pipe(postcss(plugins))
    .pipe(dest(paths.css.dest));
}

function cssWatcher() {
  return watch(
    [`${paths.css.src}/**/*.css`, ...paths.css.additionalWatch],
    series(css)
  );
}

export { css, cssWatcher, cssProcess };
