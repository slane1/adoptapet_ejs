const express = require('express')
const petlist = require('./petList.js')
const app = express()
app.set('view engine', 'ejs')
const port = 8000

app.get('/', (req, res) => {
  res.render("index")
})

app.get('/animals/:type', (req, res) => {
  const type = req.params.type;
  if (petlist.hasOwnProperty(type)) {
    const templateName = `${type}.ejs`;
    res.render(templateName, { type, data: petlist[type] });
  } else {
    res.status(404).send('Not found');
  }
});

  app.get('/:type/:name', (req, res) => {
    const name = req.params.name;
    const type = req.params.type;
    const specificAnimal = petlist[type].find(animal => animal.name === name);
  
    if (specificAnimal) {
      res.render('profile.ejs', { type, specificAnimal });
    } else {
      res.status(404).send('Animal not found');
    }
  });


app.listen(port, () => {
    console.log(`Server is running: http://localhost:${port}`)
  })

