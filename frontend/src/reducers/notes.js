const _ = require('lodash');
const api = require('../helpers/api');


// The initial state of blog post data
const initialState = {
  visibleNotes: [
    { id: 5,
      title: "From Redux Store: Companies that make computers",
      content: "content1",
      createdAt: "2016-09-11T23:26:36.000Z",
      updatedAt: "2016-09-11T23:26:36.000Z"
    },
    {id: 4,
     title: "From Redux Store: Dell",
      content: "content1",
     createdAt: "2016-09-11T23:18:08.000Z",
     updatedAt: "2016-09-11T23:18:08.000Z"
    },
    { id: 3,
      title: "From Redux Store: Lego Nexo Knights",
       content: "content1",
      createdAt: "2016-09-11T07:47:30.000Z",
      updatedAt: "2016-09-11T07:47:30.000Z"
    },
    { id: 2,
      title: "From Redux Store: React",
       content: "content1",
      createdAt: "2016-09-11T07:46:55.000Z",
      updatedAt: "2016-09-11T07:46:55.000Z"
    },
    { id: 1,
      title: "From Redux Store: Deep Learning",
       content: "content1",
      createdAt: "2016-09-11T07:46:28.000Z",
      updatedAt: "2016-09-11T07:46:28.000Z"
    }

  ]
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  return state;
}

module.exports = reducer;