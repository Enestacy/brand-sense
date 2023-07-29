import express from 'express';
const router = express.Router();

router.get('/brand', async function (req, res) {
  try {
    return res.send('hello');
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
