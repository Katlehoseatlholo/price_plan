import express from 'express';
import cors from 'cors';
import totalPhoneBill from './Bootcamp/TotalPhoneBill.js';
import {
    getPricePlan_Name,
  deleteById,
  create,
  UpdatePriceById,
  getPrice_plan,
} from './db.js';

const app = express();
const PORT = process.env.PORT || 4012;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Routes
app.post(`/api/phonebill`, async (req, res) => {
  try {
    const { plan_name, action } = req.query;

    const getSmsCall = await getPricePlan_Name(plan_name);
    const sms_price = getSmsCall[0].sms_price;
    const call_price = getSmsCall[0].call_price;

    const total = totalPhoneBill(action, sms_price, call_price);
    res.json({
      status: 'success',
      total,
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/phonebill', async (req, res) => {
  try {
    const price_Plan = await getPrice_plan();
    res.json({ price_Plan });
  } catch (error) {
    next(error);
  }
});

app.post('/api/price_plan/delete', async (req, res) => {
  try {
    const id = req.query.id;
    await deleteById(id);
    res.json({
      message: `${id} was deleted from the table`,
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/phonebill/create', async (req, res) => {
  try {
    const { plan_name, sms_price, call_price } = req.query;
    await create(plan_name, sms_price, call_price);
    res.json({
      status: 'Success',
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/phonebill/update', async (req, res) => {
  try {
    const { plan_name, sms_price, call_price, id } = req.query;
    await UpdatePriceById(plan_name, sms_price, call_price, id);
    res.json({
      status: `Plan name = ${plan_name}, sms = ${sms_price}, call = ${call_price} was updated to the database`,
    });
  } catch (error) {
    next(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
