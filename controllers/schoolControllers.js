import db from '../config/db.js';
import { calculateDistance } from '../utils/distance.js';

export const addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error'+ err });
    res.status(201).json({ message: 'School added', id: result.insertId });
  });
};

export const listSchools = (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLng = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  db.query('SELECT * FROM schools', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    const sorted = results.map(s => ({
      ...s,
      distance: calculateDistance(userLat, userLng, s.latitude, s.longitude),
    })).sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  });
};
