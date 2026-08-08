# Data Normalization

State management has become a critical task in modern frontend applications, especially in the decoupled and stateless architecture where the data is pulled from the server and stored in the browser, which will be later used for rendering the user interface and handling user interactions.

In order to keep the application performant, it is very important how you handle the data. Servers return the data in a complex structure that can have duplicates, which makes them bulky, redundant, and extremely complex to process them.

This data can be normalized to remove duplicates and simplify its structure, making it easier to process and analyze.

For example, consider this comment's API response structure.

```javascript
const blogPosts = [
  {
    id: "post-1",
    author: { id: "user-1", username: "user1", email: "[email protected]" },
    body: "......",
    comments: [
      {
        id: "comment1",
        author: { id: "user-2", username: "user2", email: "[email protected]" },
        body: ".....",
      },
      {
        id: "comment2",
        author: { id: "user-3", username: "user3", email: "[email protected]" },
        body: ".....",
      },
    ],
  },
];
```

There are two major problems with this data.

- It becomes more challenging to update the records in the state.
- The data is very nested, which will make it complex to get the desired information efficiently.
  This data can be normalizaed to make it is easier, to update, store, and modifiy the records.

This is similar to the CRUD (Create, Read, Update, and Delete) that we perform in the databases, but here because we are dealing with the local state, we don't create a record, rather we just update, store, or modify them.

## How to normalize the data?

The process of normalizing the state is also similar to how we normalize the database table in the RDBMS.
![Related Image](../public/images/How-to-normalize-the-data.png)
For each entity, we want them to have a single source of truth, which means they can be updated in only one place and will be referenced in other places. We can adhere to this principle of RDBMS for normalizing the state's data.

- Each entity should be stored separately representing a table.
- It is best to store a group of similar entities together as an object, with the objects themselves serving as the values and object identifiers as the keys.
- An independent array with just identifiers in it should define the data order in this object.
- Only identifiers should be used to refer to one another in data.

Using this, we can create a byIds and allIds hierarchical structure. This hierarchical structure allows for efficient data retrieval and manipulation.

```javascript
const blogPosts = {
  posts: {
    byIds: {
      post-1: {
        id: 'post-1',
        author: 'user-1',
        body: '......',
        comments: ['comment-1', 'comment-2'],
      },
      post-2: {
        id: 'post-2',
        author: 'user-2',
        body: '......',
        comments: [],
      },
    },
    allIds: ['post-1', 'post-2'],
  },
  comments: {
    byIds: {
      "comment-1": {
        id: 'comment-1',
        author: 'user-2',
        comment: '.....',
      },
      "comment-2": {
        id: 'comment-2',
        author: 'user-3',
        comment: '.....',
      },
    },
    allIds: ['comment-1', 'comment-2'],
  },
  users: {
    byIds: {
      "user-1": {
        id: 'user-1',
        username: 'user1',
        email: '[email protected]',
      },
      "user-2": {
        id: 'user-2',
        username: 'user-2',
        email: '[email protected]',
      },
      "user-3": {
        id: 'user-3',
        username: 'user-3',
        email: '[email protected]',
      },
    },
    allIds: ['user-1', 'user-2', 'user-3'],
  }
```

Here we have grouped each entity and converted it to an object, using the id (unique identifier) as the key and the entity as the value.

Also, in each entity group, we have the ids array, which makes it easier to iterate rather than retrieving the object keys every time.

With this structure, it has now become easier to update any record or create a new one; all the operations will take place in constant or linear time.

```javascript
const addNewComment = (postId, comment) => {
  // create a new comment
  const {id: commentId} = comment;
  blogPosts.comments.byIds[commentId] = comment;
  blogPosts.comments.ids = [...blogPosts.comments.ids, commentId];

  //update the post with the comment
  blogPosts.posts.byIds[postId].comments = [...blogPosts.posts.byIds[postId].comments, commentId];
}
```

Retrieving the comments for any given blog post has also become easier with this normalized data.

```javascript
const getAllCommentsForThePost = (postId) => {
  const mappedComments = blogPosts.posts.byIds[postId].comments.map((commentId) => {
    // get the comment details
    const comment = blogPosts.comments.byIds[commentId];

    // get the author details
    const user = blogPosts.users.byIds[comment.author];

    // get the comment along with the  author details
    return {...comment, author: user};
  });

  return mappedComments
};
```

In this way, the write operation while updating the records in the state becomes expensive, but all the other actions become extremely convenient, making the state predictable and easy to use.

## Advantages of data normalization of frontend state
Normalizing the state of frontend by splitting the data into byId and allIds structures and storing it offers a number of perks:

**• Quick Updates:** It is simpler to add, edit, or remove values without changing the entire array when an object rather than an array is used to hold entities. When storing things in an array, locating the item's index is necessary for removal, which might cause lag in big arrays. We can quickly locate and change certain items without having to go through the full array by utilizing an object with unique IDs as keys.

**• Ease of Access:** Accessing the entities becomes easier as they are stored using a unique identity as a key.

**• Minimal Redundancy:** We can prevent redundant data by employing a normalized state structure. There is now only one entity stored in the state that has to be updated, and all the other places are referenced using an identifier that makes the data consistent. This ensures that the data remains synchronized and reduces the chance of inconsistencies.

**• Easier complex processing:** By normalizing the data and storing it in an organized manner, we can do better processing of the data and pull it efficiently by writing an easy-to-understand function that has straight-forward logic implementation.

**• Easier debugging:** Additionally, normalizing the data allows for easier debugging and troubleshooting as each entity is separate and can be individually examined. This also simplifies the task of adding new features or making changes to the data structure, as it is already organized and modular. Overall, employing a normalized state structure improves the efficiency and maintainability of the system.

Data normalization is a powerful technique that enforces to store the data in organized manner, removing the duplication and making it easier to retrieve and modify values.

This technique can be implemented in any state management library, like Redux or Zustand, as we are ultimately just processing the arrays and the objects.

Throughout the course, we will see multiple examples of data normalization. Some examples will include normalizing relational data, normalizing nested data, and normalizing array data.

## Resources
• https://adrianarlett.gitbooks.io/idiomatic-redux-by-dan-abramov/content/normalizing-the-state-shape.html

• https://github.com/paularmstrong/normalizr

• https://brainsandbeards.com/blog/advanced-redux-patterns-normalisation/

• https://hexlet.io/courses/js-redux-toolkit/lessons/data-normalization/theory_unit

• https://www.johnraptis.dev/frontend-data-normalization/

• https://blog.muvon.io/frontend/normalize-state-shape-in-redux