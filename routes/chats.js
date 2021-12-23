const { Router } = require('express');
const { asyncHandler } = require('../utils/async-handler');
const { ChatRoom } = require('../models');

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const rooms = await ChatRoom.find({}).sort({ createdAt: -1 });
  res.render('list', { rooms });
}));

router.get('/new', asyncHandler(async (req, res) => {
  res.render('new');
}))

router.get('/:shortId', asyncHandler(async (req, res) => {
  const { shortId } = req.params;

  const room = await ChatRoom.findOne({ shortId });
  if (!room) {
    throw new Error('NotFound');
  }

  res.render('room', { room });
}));

router.post('/', asyncHandler(async (req, res) => {
  const { title } = req.body;

  await ChatRoom.create({ title });

  res.redirect('/chats');
}));

module.exports = router;
