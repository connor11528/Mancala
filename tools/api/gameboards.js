import { Router } from 'express'
const router = Router();

import Game from '../db/Game'

router.get('/', (req, res) => {
  Game.find({}, (err, games) => {
    return res.status(err ? 400 : 200).send(err || games);
  })
})

router.get('/:id', (req, res) => {
  Game.find({'_id' : req.params.id}, (err, game) => {
    return res.status(err ? 400 : 200).send(err || game);
  })
})

router.post('/', (req, res) => {
  console.log("req.body:", req.body);
  Game.create({}, (err, game) => {
    return res.status(err ? 400 : 200).send(err || game);
  })
})

router.put('/', (req, res) => {
  console.log("req body:", req.body);
  Game.findByIdAndUpdate(req.body._id, req.body, 'new', (err, game) => {
    if (err) return res.status(400).send(err);
    Game.find({}, (err, games) => {
      return res.status(err ? 400 : 200).send(err || games)
    })
  });
})

router.delete('/:id', (req, res) => {
  Game.findByIdAndRemove(req.params.id, (err, removed) => {
    if (err) return res.status(400).send(err);
    Game.find({}, (err, games) => {
      return res.status(err ? 400 : 200).send(err || games)
    })
  })
})

export default router
