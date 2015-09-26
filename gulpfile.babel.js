import gulp from 'gulp'
import reload from 'gulp-livereload'
import webpack from 'webpack'
import devServer from 'webpack-dev-server'
import gutil from 'gulp-util'
import serve from 'gulp-serve'
import webpackConfig from './webpack.config'

const paths = {
  js: {
    all: ['./src/**/*']
  }
}

let devConfig = {...webpackConfig}
devConfig.devtoll = 'eval'

const devCompiler = webpack(devConfig)
const port = 3232

gulp.task('serve', serve({
  port: port,
  root: '.'
}))

gulp.task('build-dev', (callback) => {
  devCompiler.run((err, stats) => {
    if(err) throw new gutil.PluginError("webpack:build-dev", err)
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }))
    reload()
    callback()
  })
})

gulp.task('webpack-dev-server', () => {



  new devServer(devCompiler, {
      publicPath: devConfig.output.publicPath,
      stats: {
        colors: true
      }
    })
    .listen(port, 'localhost', (err) => {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
    })
})

gulp.task('watch', () => {
  gulp.watch(paths.js.all, ['build-dev'])
  reload.listen()
})

gulp.task('build', [])

gulp.task('dev', ['build-dev', 'serve', 'watch'])

gulp.task('default', ['build', 'serve', 'watch'])
