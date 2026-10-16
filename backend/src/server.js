import app from './app.js';

const port = Number(process.env.PORT || 5001);

app.listen(port, () => {
  console.log('========================================');
  console.log('Chandigarh University Backend Server');
  console.log(`Server running on port ${port}`);
  console.log(`- API available at http://localhost:${port}/api`);
  console.log('========================================');
});
