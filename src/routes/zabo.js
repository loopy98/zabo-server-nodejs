import express from "express"
const router = express.Router();

import { Zabo } from "../db"

router.get('/', (req, res) => {
  if (!req.body.id) {
    console.log('null id error');
    return res.error('1');
  }

  Zabo.findOne({_id: req.body.id}, (err, zabo) => {
    if (err) {
      console.log(err);
      return res.error('1');
    }
    else if (zabo === null) {
      console.log('zabo does not exist');
      return res.error('1');
    }
    else {
      return res.json(zabo);
    }
  })
});

router.get('/list', (req, res) => {
  Zabo.find({}).sort({'createdAt': -1}).limit(10).exec((err, zabo) => {
    if (err) {
      console.log(err);
      return res.error('1');
    }
    else {
      return res.json(zabo);
    }
  })
});

router.post('/', (req, res) => {
  const newZabo = new Zabo(req.body);
  // console.log(req.body);

  newZabo.save(err => {
    if (err){
      console.log(err);
      res.error('1')
    } 
    console.log('new zabo has successfully saved');
    res.send('1');
  });
});

router.delete('/', (req, res) => {
  if (!req.body.id) {
    console.log('null id error');
    return res.error('1');
  }

  Zabo.deleteOne({_id: req.body.id}, (err, zabo) => {
    if (err) {
      console.log(err);
      return res.error('1');
    }
    else {
      console.log('zabo successfully deleted');
      return res.send('1');
    }
  });
});

module.exports = router;