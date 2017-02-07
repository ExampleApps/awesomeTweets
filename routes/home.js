const Express = require('express')
const router = Express.Router()
function getTweets(cookies){
  if(cookies.tweets){
    return JSON.parse(cookies.tweets)
  } else {
    return [];
  }
}

router.get('/',function(req,res){
  res.render('home/index')
})

router.get('/dashboard',function(req,res){
  var cookies = req.cookies;
  var tweets = getTweets(req.cookies)
  console.log(tweets)
  res.render('home/dashboard',{tweetsArr:tweets})
})

router.post('/dashboard',function(req, res){
  var cookies = req.cookies
  var params = req.body;
  var tweets = getTweets(req.cookies)
  tweets.unshift(params.tweet);

  res.cookie('tweets',JSON.stringify(tweets))
  res.redirect('/dashboard')

})
module.exports = router
