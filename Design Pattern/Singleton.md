# Singleton
In a singleton design pattern, only one object is created for each interface (class or function) and the same object is returned every time when the function or class is called.

It is really useful in scenarios where only one object is needed to coordinate actions across the system. For example, notification object, which sends notification across the system.

```javascript
const object1 = singleton.getInstance();
const object2 = singleton.getInstance();

console.log(object1 === object2); //true
```

We can implement the singleton pattern by creating a closure with a variable that stores the created instance and returns it every time.

```javascript
const Singleton = (function () {
    let instance;
 
    function createInstance() {
        const object = new Object("I am the instance");
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
```

```javascript
const object1 = singleton.getInstance();
const object2 = singleton.getInstance();

console.log(object1 === object2); //true
```