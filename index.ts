import express, {Express, Request, Response} from 'express';
import { config } from 'dotenv';
import { pool } from './db';
config()

const PORT = process.env.PORT
const app:Express = express()

app.use(express.json())

app.get('/status', (req: Request, res: Response) => {
    res.json({status: "all good 👍"})
})

app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email)
       VALUES ($1, $2)
       RETURNING *`,
      [name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to insert user' });
  }
})

app.get('/users', async (req: Request, res: Response) => {

    try {
        const results = await pool.query(`
            SELECT * FROM users
        `)
        res.json(results.rows)
    }
    catch(error) {
        console.log(error)
    }

})

app.listen(PORT, () => console.log('App started on port', PORT))