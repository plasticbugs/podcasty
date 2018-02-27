const app = require('./server-config');
const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log('Serving up fresh HTML on port ', PORT);