const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class FrontContoller {
  static userinsert = async (req, res) => {
    try {
      const { n, e, p, cp } = req.body
      const user = await UserModel.findOne({ email: e })
      // console.log(user)
      if (user) {
        // req.flash('error','Email Already Exists.')
        res.redirect('/register')
      } else {
        if (n && e && p && cp) {
          if (p == cp) {
            const hashPassword = await bcrypt.hash(p, 10)
            const result = new UserModel({
              name: n,
              email: e,
              password: hashPassword
            })

            
            console.log(result);
            //To save data
            await result.save();
          

            //To redirect to login page
            // req.flash('success','Successfully Registered , Please Login .')
            res.redirect('/')
          } else {
            // req.flash('error','Password & Confirm Password must be Same.')
            res.redirect('/register')
          }
        } else {
        //   req.flash('error', 'All Fields are Required.')
          res.redirect('/register')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  static verifyLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email: email })
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
          // To Generate Token
          const token = jwt.sign({ ID: user.id }, 'guptchabi@123456')
          // console.log(token)
          res.cookie('token', token)

          res.redirect('/dashboard')
        } else {
          // req.flash('error','Email or Password is Not Correct.')
          res.redirect('/')
        }
      } else {
        // req.flash('error','You are not a Registered User.')
        res.redirect('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  static logOut = async (req, res) => {
    try {
      res.clearCookie('token')
      req.flash('success', 'Successfully Logged Out.')
      res.redirect('/')
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = FrontContoller
