import { Router } from 'express'
const router = Router();

import GameBoard from '../db/GameBoard'

router.get('/', (req, res) => {
  GameBoard.find({}, (err, gameboards) => {
    return res.status(err ? 400 : 200).send(err || gameboards);
  })
})

router.post('/', (req, res) => {
  GameBoard.create(req.body, (err, gameboard) => {
    return res.status(err ? 400 : 200).send(err || gameboard);
  })
})

router.put('/', (req, res) => {
  console.log(req.body);
  GameBoard.findByIdAndUpdate(req.body._id, req.body, 'new', (err, gameboard) => {
    if (err) return res.status(400).send(err);
    GameBoard.find({}, (err, gameboards) => {
      return res.status(err ? 400 : 200).send(err || gameboards)
    })
  });
})

router.delete('/:id', (req, res) => {
  GameBoard.findByIdAndRemove(req.params.id, (err, removed) => {
    if (err) return res.status(400).send(err);
    GameBoard.find({}, (err, tenants) => {
      return res.status(err ? 400 : 200).send(err || tenants)
    })
  })
})

export default router
