const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const errorHandler = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const router = require('./routes/index');
const config = require('./utils/config');

const app = express();

app.use(express.json());
mongoose.connect(config.MONGODB_URL);
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
}));

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
