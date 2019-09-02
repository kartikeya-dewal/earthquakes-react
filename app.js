const http = require('http');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./data/schema');
const favicon = require('serve-favicon');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
  favicon(path.join(__dirname, '/public/static/media/logo.831d1b10.png'))
);
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use(express.static(path.join(__dirname, '/public')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || '4000';
app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT);
// eslint-disable-next-line no-console
server.on('listening', () => console.log(`Server started on port ${PORT}`));

module.exports = app;
