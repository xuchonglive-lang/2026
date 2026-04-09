module.exports = {
  plugins: [
    require('autoprefixer')({
      remove: process.env.UNI_PLATFORM !== 'h5'
    })
  ]
}
