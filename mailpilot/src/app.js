// (Delete this file. All logic is now in index.js)
const app = express();
const authRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

// These routes are already defined in authRoutes.js, so they're redundant here
// app.get('/auth/login', (req, res) => {
//   res.render('login');
// });
//
// app.get('/auth/register', (req, res) => {
//   res.render('register');
// });

module.exports = app;
