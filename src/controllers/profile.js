import ash from 'express-async-handler';
import { User, Group, Board } from '../db';

export const getProfile = ash (async (req, res) => {
  const { name } = req.params;
  const [user, group] = await Promise.all ([
    User.findOne ({ username: name }),
    Group.findOne ({ name }),
  ]);
  if (user) {
    const result = await user
      .populate ('groups')
      .populate ('currentGroup')
      .populate ('currentGroup.members')
      .populate ('boards')
      .populate ('likes')
      .execPopulate ();

    const [boardId] = user.boards;
    const board = await Board.findById (boardId);

    const likesCount = result.likes.length;
    const pinsCount = board.pins.length;
    return res.json ({
      ...result.toJSON (),
      likesCount,
      pinsCount,
    });
  }
  if (group) {
    return res.json (group);
  }
  return res.status (404).json ({
    error: 'user and group with given name does not exist',
  });
});
