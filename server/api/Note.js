const { v4 } = require('uuid');

function createNote(text) {
  return {
    id: v4(),
    text,
    uploaded: Date.now()
  };
}

module.exports = createNote;
