module.exports = function(req, res, next) {
  let links = [
    {
      url: '/jurisdiction/JUR359D88F9B71718E7F4A6',
      title: 'Cour de cassation',
    },
    {
      url: '/jurisdiction/JUR64FE952E9CA370DAC630',
      title: 'Conseil d\'Etat',
    },
  ]
  res.locals.links = links
  res.render('index')
}
