const Contact = require('../models/Contact');
const fs = require('fs');
const csv = require('csv-parser');

exports.uploadCSV = async (req, res) => {
  const results = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      // Ensure required fields exist
      if (data.name && data.email) {
        results.push({
          name: data.name,
          email: data.email,
          tags: data.tags ? data.tags.split(',').map((tag) => tag.trim()) : [],
          userId: req.user,
        });
      }
    })
    .on('end', async () => {
      try {
        await Contact.insertMany(results);
        fs.unlinkSync(filePath); // clean up file after processing
        res
          .status(201)
          .json({ msg: 'Contacts uploaded', count: results.length });
      } catch (err) {
        res.status(500).json({ msg: 'Upload failed', error: err.message });
      }
    });
};

exports.addContact = async (req, res) => {
  let { name, email, tags } = req.body;
  try {
    // Support both array and comma-separated string for tags
    if (typeof tags === 'string') {
      tags = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }
    const contact = await Contact.create({
      name,
      email,
      tags,
      userId: req.user,
    });
    // If request is from browser form, redirect back to contacts page
    if (req.accepts('html')) {
      return res.redirect('/contacts');
    }
    res.status(201).json(contact);
  } catch (err) {
    // If request is from browser form, show error on contacts page
    if (req.accepts('html')) {
      return res.status(500).render('contacts', {
        contacts: [],
        error: 'Server error',
        user: req.user,
      });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const updated = await Contact.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findOneAndDelete({ _id: req.params.id, userId: req.user });
    res.status(200).json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
