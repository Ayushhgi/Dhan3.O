const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const checkUserAuth = require('./middleware/auth')
const FrontContoller = require('./controllers/FrontContoller')



main()
  .then(() => {
    console.log('connection successful')
  })
  .catch(err => {
    console.log(err)
  })

async function main () {
  await mongoose.connect('mongodb://127.0.0.1:27017/user')
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'Public')))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  console.log('Root route hit')
  res.render('index.ejs')
})

app.get('/register', (req, res) => {
    console.log('Root route hit')
    res.render('register.ejs')
  })
  

  app.get('/dashboard', checkUserAuth, (req, res) => {
    console.log('Root route hit')
    res.render('index.ejs')
  })

app.post('/userinsert', FrontContoller.userinsert)
app.post('/verifyLogin', FrontContoller.verifyLogin)
app.get('/logOut' , FrontContoller.logOut)


app.listen(3000, () => {
    console.log('app is listening')
  })