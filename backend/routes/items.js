const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Item = require('../models/Item');

// @route   GET /api/items
// @desc    Get all active user's items
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/items
// @desc    Add new item
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const newItem = new Item({
      title,
      description,
      status,
      userId: req.user.id,
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/items/:id
// @desc    Update item
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, status } = req.body;

  // Build item object
  const itemFields = {};
  if (title) itemFields.title = title;
  if (description) itemFields.description = description;
  if (status) itemFields.status = status;

  try {
    let item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Make sure user owns item
    if (item.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Make sure user owns item
    if (item.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Item.findByIdAndRemove(req.params.id);

    res.json({ message: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
