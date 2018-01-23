const express = require('express');
const router = express.Router();

const entries = [
  { id: 1, amt: 100.0, date: '01/20/18', description: 'BTC', type: 'debit' },
  { id: 2, amt: 47.50, date: '1/18/18', description: 'Utils', type: 'debit' },
  { id: 3, amt: 1050, date: '01/01/18', description: 'Paycheck', type: 'credit' },
]


router.get('/', (req, res) => {
  render json: (entries);
})

router.post()


module.exports = router;