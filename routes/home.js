const Express = require('express')
const router = Express.Router()
const pg = require('pg')

const config= {
  user:'aldo',
  database: 'awesomeTweets',
  password: 'abc',
  host: 'localhost',
  port: '5432',
  max:10,
  idleTimeoutMillis:300000
}

const pool = new pg.Pool(config);

router.get('/',function(req,res){

  res.render('home/index')
})

router.get('/dashboard',function(req,res){
  var tweets = [];
  pool.connect(function(err,client,done){
    if(err) return console.error("ERROR, can't connect to the pool")
    client.query('SELECT * FROM tweets;', function(qErr,result){
      done();
      if(qErr){return console.error("Problem with query")}

      result.rows.forEach(function(row){
        tweets.unshift([row.tweet,row.date])
      });
      console.log(result);
      console.log(tweets)
      res.render('home/dashboard',{tweets});
    })
  })
})

router.post('/dashboard',function(req, res){
  var params = req.body;
  pool.connect((err,client,done)=>{
    if(err) return console.error("ERROR, can't connect to the pool")
      client.query('INSERT INTO public."tweets" (tweet) VALUES($1)',[params.tweet])
    done();
  });
  res.redirect('/dashboard')
})
module.exports = router
