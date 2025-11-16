# Reactivity in JavaScript frameworks

## What is Reactivity?.
- The process in which the view of the application is automatically updated when the state changes are known as Reactivity.

- Let us see two different examples to understand Reactivity.

- In vanilla JavaScript, we will do something like this to update the view whenever the state changes.

```javascript
const root = document.getElementById('root');
root.innerHTML = `
  <button id="increment-btn">Increment</button>
  <span id="count-tracker">0</span>
  <button id="decrement-btn">Decrement</button>
`;

const incrementBtn = root.querySelector('#increment-btn');
const decrementBtn = root.querySelector('#decrement-btn');

const span = root.querySelector('#count-tracker');
let count = 0;

decrementBtn.addEventListener('click', () => {
  count--;
  span.innerText = count;
});

incrementBtn.addEventListener('click', () => {
  count++;
  span.innerText = count;
});
```

- You see how after every state update count-- and count++, we are manually updating the view span.innerText = count.

- But on the other hand in this React example,

```javascript
function App() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <button onClick={() => setCount(count => count - 1)}>Decrement</button>
      <span>{count}</span>
      <button onClick={() => setCount(count => count + 1)}>Incremenet</button>
    </>
  );
}
```

- The framework/library explicitly handles the view change under the hood giving us the freedom to focus more on the business logic and state management and build and ship things faster.

- Not only React but all the major JavaScript frontend frameworks abstract Reactivity, because this is the part where many frameworks do the performance optimization, for example using virtual DOM with Reconciliation (using an intelligent diffing algorithm to check what has changed in the view and updating only that elements).

- The most challenging thing for Reactivity is deciding WHEN to update the view and WHAT to update.

## When to update the View?
- There is no particular answer to when to update the view and each framework has a different implementation of Reactivity according to how the framework is developed, but the one thing that is common is that the update happens in batches.

- Frequent updates are very expensive and they will outthrow the complete purpose of creating the framework, otherwise same could have been done in the vanilla JavaScript.

- One way is how React does this is that it debounces the updates and batches multiple updates together and this are done when the state updates, like in the component lifecycle event ShouldComponentUpdate.

- In the below example,
```javascript
function Count() {
  const [count, setCount] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const onAddCount = count => {
    setCount(counts => [...counts, count]);
    setTotalCount(totalCounts => totalCounts + 1);
  };
}
```

- There are two state updates happening one after another, if the view is also updated synchronously then we will see there is a glitch (views will be changing one after the other) and the changes won't reflect properly. (For this example, though it won't be visible to the naked eye when you are doing the animation it will be visible.) That is why batch updates are important.

## What to update in the View?
- Now that we know WHEN to update the view, let us see how to decide WHAT to update.

- To decide WHAT to update, we will have to track what has been changed, for primitive values, it is simple to track changes, but for Objects, it is hard, as Objects can be mutated after defining and we cannot freeze them as this beats all the purpose.

- Objects have to be extensible but still, there should be a way to track the mutation.

- For example,

```javascript
const person = {
    firstName: 'Prashant'
}

// getting property
Object.defineProperty(person, "getName", {
    get : function () {
        return this.firstName;
    }
});

// setting property
Object.defineProperty(person, "changeName", {
    set : function (value) {
        this.firstName = value;
    }
});

console.log(person.firstName); // Prashant

// changing the property value
person.changeName = 'Prashant2';

console.log(person.firstName); // Prashant2

person.blog = 'Learnersbucket';

console.log(person.blog); // Learnersbucket
```

- Here if you see, I have defined an object with a single property firstName and I was able to get and set its value and it can be tracked, but when I added a new property blog, I was not aware of it.

- To solve this we can use Proxies. Using the Proxy object, we can build a proxy for another object that can intercept and alter its core activities.

- In simple terms, proxies will work as observers through which we can monitor what has changed in the object.

```javascript
const person = {
    firstName: 'Prashant'
}

const handler = {
  set(target, prop, value) {
    console.log(`${prop} is changed from ${target[prop]} to ${value}`);
    target[prop] = value;
  },
};

const proxyPerson = new Proxy(person, handler);

proxyPerson.firstName = "Prashant 2"; 
// "firstName is changed from Prashant to Prashant 2"

proxyPerson.blog = "Learnersbucket";
// "blog is changed from undefined to Learnersbucket"
```

- Is this that simple?, No! This is one way of handling mutation, not every framework does that, each one keeps on experimenting and uses many performant techniques, but this is one of tracking the mutation.

- Once the mutation is tracked, it is easier to decide what has changed and update only that part.