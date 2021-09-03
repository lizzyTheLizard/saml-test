const express = require('express')
const format = require('xml-formatter');
const atob = require('atob');
const axios = require('axios');
const querystring = require('querystring');
const app = express()
const port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/acs.html', (req, res) => {
  res.render('acs.ejs',  { 
    RelayState: atob(req.body.RelayState ? req.body.RelayState : ""),
    SAMLResponse: format(atob(req.body.SAMLResponse)) 
  });
});

app.get('/', (req, res) => {
  res.render('main', {});
});

app.get('/saml', (req, res) => {
  res.render('saml', {});
});

app.get('/oidc', (req, res) => {
  res.render('oidc', {});
});

app.get('/clientCredentials', (req, res) => {
  res.render('clientCredentials', {});
});

app.post('/clientCredentialsRequest', async(req, res) => {
  let tokenEndpoint = req.query.tokenEndpoint;
  let config = {
    headers: {
      "Content-Type": req.header('Content-Type'),
      "Authorization": req.header('Authorization'),
    }
  }
  let result = await axios
    .post(tokenEndpoint, querystring.stringify(req.body), config)
    .catch(err => err.response);
    res.status(result.status);
    res.send(result.data);
});

app.get('/consumer.html', (req, res) => {
  res.render('consumer', {});
});


app.use(express.static('views'))


app.listen(port, () => {
  console.log(`SAML test listening at http://localhost:${port}`)
});


