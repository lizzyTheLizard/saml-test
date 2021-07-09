const express = require('express')
const format = require('xml-formatter');
const atob = require('atob');
const app = express()
const port = 8080

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
  res.render('saml', {});
});

app.use(express.static('views'))


app.listen(port, () => {
  console.log(`SAML test listening at http://localhost:${port}`)
});


