# Higher-order component pattern in React

- A higher-order component is a pattern that can be created with the React components. We can pass the reusable logic as props to the functional components to implement abstraction, reusability, and uniformity in the code.
- The principles of OOPS are embedded deep in the programming and in one way or another using them helps to make the code more readable, and less verbose and promotes reusability.
- A higher-order component (HOC) is a pattern that emerges in React given its compositional nature, where we can pass one component to another component as an argument, and this parent component (Higher-order) will have certain logic that it will pass down to this received component as props.
- For example, if you worked with Redux, you will notice how we use the connect() HOC to compose the components with the states and the actions.

```javascript
const ConnectedUsersList = connect(usersSelector, usersActions)(UsersList);
```

- Here the connect() method receives two arguments and returns another function that accepts the UsersList as arguments forming a composition of components.
- Now in the UsersList, you will receive the states and the actions as props.
- This can be written more discretely as,

```javascript
// create a connection first
const connectRedux = connect(usersSelector, usersActions);

// then connect the component
const ConnectedUsersList = connectRedux(UsersList);
```

