require('dotenv').config();
const app = require('./src/main');

const port = process.env.PORT || 5000;
app.set('port', port);

app.listen(app.get(port), () => {
  console.log('serving app');
});
