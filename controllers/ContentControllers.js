import db from '../config/db.js';

export const addContent = (req, res) => {
  const { name, rating, content, projects, years, price, phoneNumber, shortlist } = req.body;
  console.log(req.body);

  if (!name || !rating || !content ||  isNaN(projects) || isNaN(years) || isNaN(price) || !phoneNumber ||  typeof shortlist !== 'boolean')  {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const sql = 'INSERT INTO profiles (name, rating, content, projects, years, price, phoneNumber, shortlist) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
  db.query(sql, [name, rating, content, projects, years, price, phoneNumber,shortlist], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error'+ err });
    res.status(201).json({ message: 'Content added', id: result.insertId });
  });
};

export const listContents = (req, res) => {

  db.query('SELECT * FROM profiles', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    res.status(200).json(results);
  });
};

export const updateShortlisted = (req, res) => {
  const { id } = req.query;
  const { shortlist } = req.body; 

  if (!id || typeof shortlist !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const sql = 'UPDATE profiles SET shortlist = ? WHERE id = ?';
  db.query(sql, [shortlist, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error: ' + err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No profile found with that ID' });
    }

    res.status(200).json({ message: 'Shortlisted updated successfully', result, shortlist});
  });
};

export const listShortlisted = (req, res) => {
  const sql = 'SELECT * FROM profiles WHERE shortlist = TRUE';

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error: ' + err });

    res.status(200).json(results);
  });
};
