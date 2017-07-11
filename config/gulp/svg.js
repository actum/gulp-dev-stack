import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import { SVG_BASE, SVG_BUILD_SPRITES } from '../../config';

/* SVG sprites */
/* Returns an Object in a format { folderName: globbingPath } */
function getSprites() {
    const sprites = [];

    function getSpriteFolders(SVG_FOLDER) {
        return fs.readdirSync(SVG_FOLDER).filter(file => fs.statSync(path.join(SVG_FOLDER, file)).isDirectory());
    }
    const spriteFolders = getSpriteFolders(SVG_BASE);

    spriteFolders.forEach((spriteName) => {
        var spriteGlob = path.resolve(`${SVG_BASE}/${spriteName}/*.svg`);
        spriteGlob = path.relative(process.cwd(), spriteGlob);
        sprites.push({ name: spriteName, glob: spriteGlob });
    });

    return sprites;
}

/* Bundle SVG sprites */
/* Single SVG images are optimized in "images" task */
gulp.task('svg:sprite', () => {
    function bundle(sprite) {
        gutil.log(`Bundling '${gutil.colors.green(sprite.name)}' from ${gutil.colors.magenta(`(${sprite.glob})`)}`);

        return gulp.src(sprite.glob)
            .pipe(svgmin((file) => {
                const prefix = path.basename(file.relative, path.extname(file.relative));
                return {
                    plugins: [{
                        cleanupIDs: {
                            prefix: `${prefix}-`,
                            minify: true
                        }
                    }]
                };
            }))
            .pipe(svgstore({
                inlineSvg: true
            }))
            .pipe(rename((file) => {
                file.basename = sprite.name;
                return file;
            }))
            .pipe(gulp.dest(SVG_BUILD_SPRITES));
    }

    const sprites = getSprites();
    return sprites.forEach(sprite => bundle(sprite));
});

gulp.task('svg', ['svg:sprite']);
