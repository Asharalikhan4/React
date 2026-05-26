# 5 Advanced React Component Patterns

React is a powerful and popular JavaScript framework for frontend development. Every framework has its way, style, and syntax of writing code; React is no different.

In this article, we will see advanced React component patterns that frontend developers who use React should know. Patterns are a way to fix the recurring problems. Following the patterns is a standard programming practice that helps to create and maintain a standard that enforces rules and helps to maintain the code quality and improve the developer experience in an enterprise codebase

## Headless Components

Renderless or logic, or Headless components are the components that abstract the logic, state management from the view or presentation, which means they do not render any view themselves; rather, they expose the state, methods to the children, and the children can use them as they wish.

Separating the logic and the view gives the flexibility on how you want to structure and style the UI.

### Key characteristics:

- Separation of concerns as the logic and the view are decoupled.
- Create different types of UI with the same reusable logic.
- You have the flexibility to decide how the UI looks.

### Example - Headless Modal Component

Here, the HeadlessModal component will encapsulate the state and the logic, and give the control to the child to render the UI however they wish.

```javascript
// HeadlessModal.js
import { useState, useEffect } from "react";

const HeadlessModal = ({
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Handle controlled or uncontrolled state
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen =
    controlledIsOpen !== undefined ? onOpenChange : setInternalIsOpen;

  const open = () => setIsOpen?.(true);
  const close = () => setIsOpen?.(false);
  const toggle = () => setIsOpen?.(!isOpen);
  // Handle ESC key
  // Hides the modal on ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isOpen) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Prevent scroll when modal is mounted
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return children({
    isOpen,
    open,
    close,
    toggle,
  });
};

const HeadlessModalExample = () => {
  return (
    <div>
      <HeadlessModal>
        {({ isOpen, open, close }) => (
          <>
            <button onClick={open}>Open Modal</button>

            {isOpen ? (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    maxWidth: "500px",
                    width: "90%",
                  }}
                >
                  <h2>Modal Title</h2>
                  <p>This is modal content!</p>
                  <button onClick={close}>Close</button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </HeadlessModal>
    </div>
  );
};

export { HeadlessModal, HeadlessModalExample };
```

## Polymorphic Components
As the name suggests, polymorphic components are the components that can be rendered as different HTML elements or React components while maintaining the same behavior and using the same API.

This is achieved through a prop (generally as), which determines using what element this component should render.

### Key characteristics:
- Consistency with flexibility - The same component with the same logic and behavior can be rendered as different elements.
- Easy to create and maintain, and has greater Type safety with Typescript.
- The components can be made accessible by using the semantic HTML elements.

### Example - Polymorphic Box Component:
Here we are creating a Box component that can be rendered as a div, main, article, section, or whichever element you need.

```javascript
// Box.js - Polymorphic container component
import React from "react";

const Box = ({
  as: Component = "div",
  padding,
  margin,
  backgroundColor,
  textAlign,
  display = "block",
  children,
  className = "",
  ...props
}) => {
  // Generate dynamic styles
  const styles = {};

  if (padding) styles.padding = padding;
  if (margin) styles.margin = margin;
  if (backgroundColor) styles.backgroundColor = backgroundColor;
  if (textAlign) styles.textAlign = textAlign;
  if (display) styles.display = display;

  return (
    <Component style={styles} className={className} {...props}>
      {children}
    </Component>
  );
};

const BoxExamples = () => {
  return (
    <div>
      {/* Div container */}
      <Box padding="20px" backgroundColor="#f0f0f0">
        Default div box
      </Box>

      {/* Section with semantic meaning */}
      <Box as="section" padding="40px" margin="20px 0">
        <h2>This is a section</h2>
        <p>Section content here...</p>
      </Box>

      {/* Article element */}
      <Box
        as="article"
        padding="30px"
        backgroundColor="#fff"
        className="shadow-lg"
      >
        <h3>Article Title</h3>
        <p>Article content...</p>
      </Box>

      {/* Header element */}
      <Box
        as="header"
        padding="20px"
        textAlign="center"
        backgroundColor="#333"
        className="text-white"
      >
        <h1>Site Header</h1>
      </Box>

      {/* Inline element */}
      <Box
        as="span"
        padding="5px 10px"
        backgroundColor="yellow"
        display="inline-block"
      >
        Inline box
      </Box>
    </div>
  );
};

export { Box, BoxExamples };
```

## Compound Components
Compound components are the components that work together as a cohesive unit, similar to Lego blocks with being tightly coupled to each other but with clear separation of concerns. Each unit abstracts its UI and the logic, but it will function following its Master.

Each unit has a declarative API, but they share the state and the logic with the master component.

Similar to how the <Option> tag functions following the <Select> tag.

### Key characteristics:
- All the child components explicitly inherit the parent's state and the methods exposed.
- With the declarative API, it is easy to understand the purpose and the structure of the components, while the underlying logic is encapsulated.
- The child components can be composed in any order within the parent.

### Example - Accordion Compound Component:
```javascript
// Accordion.js - Flexible accordion compound component
import React, { useState, createContext, useContext } from "react";

const AccordionContext = createContext();

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion compound components must be used within Accordion."
    );
  }
  return context;
};

// Individual AccordionItem context
const AccordionItemContext = createContext();

const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionItem compound components must be used within AccordionItem."
    );
  }
  return context;
};

// Main Accordion component
const Accordion = ({
  children,
  allowMultiple = false,
  defaultValue = allowMultiple ? [] : null,
}) => {
  const [openItems, setOpenItems] = useState(
    allowMultiple
      ? Array.isArray(defaultValue)
        ? defaultValue
        : []
      : defaultValue
  );

  const toggleItem = (value) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else {
      setOpenItems((prev) => (prev === value ? null : value));
    }
  };

  const isItemOpen = (value) => {
    return allowMultiple ? openItems.includes(value) : openItems === value;
  };

  const value = {
    toggleItem,
    isItemOpen,
    allowMultiple,
  };

  return (
    <AccordionContext.Provider value={value}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
};

// Accordion Item component
const AccordionItem = ({ children, value, disabled = false }) => {
  const { toggleItem, isItemOpen } = useAccordion();

  const isOpen = isItemOpen(value);
  const toggle = () => !disabled && toggleItem(value);

  const contextValue = {
    value,
    isOpen,
    toggle,
    disabled,
  };

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div
        className={`accordion-item ${isOpen ? "open" : ""} ${
          disabled ? "disabled" : ""
        }`}
        style={{
          border: "1px solid #e5e5e5",
          borderRadius: "6px",
          marginBottom: "8px",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

// Accordion Trigger component
const AccordionTrigger = ({ children, className = "", ...props }) => {
  const { isOpen, toggle, disabled } = useAccordionItem();

  return (
    <button
      className={`accordion-trigger ${className}`}
      onClick={toggle}
      disabled={disabled}
      aria-expanded={isOpen}
      style={{
        width: "100%",
        padding: "16px",
        backgroundColor: isOpen ? "#f8f9fa" : "white",
        border: "none",
        textAlign: "left",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "16px",
        fontWeight: "500",
      }}
      {...props}
    >
      <span>{children}</span>
      <span
        style={{
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
        }}
      >
        ▼
      </span>
    </button>
  );
};

// Accordion Content component
const AccordionContent = ({ children, className = "", ...props }) => {
  const { isOpen } = useAccordionItem();

  return (
    <div
      className={`accordion-content ${className}`}
      style={{
        maxHeight: isOpen ? "1000px" : "0",
        overflow: "hidden",
        transition: "max-height 0.3s ease",
      }}
      {...props}
    >
      <div style={{ padding: "16px", borderTop: "1px solid #e5e5e5" }}>
        {children}
      </div>
    </div>
  );
};

// Attach sub-components
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

const AccordionExample = () => {
  return (
    <div>
      {/* Single accordion (only one item open at a time) */}
      <div>
        <h3>FAQ - Single Selection</h3>
        <Accordion defaultValue="item1">
          <Accordion.Item value="item1">
            <Accordion.Trigger>What is React?</Accordion.Trigger>
            <Accordion.Content>
              <p>
                React is a JavaScript library for building user interfaces,
                particularly web applications.
              </p>
              <p>
                It was developed by Facebook and is now maintained by Meta and
                the community.
              </p>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item2">
            <Accordion.Trigger>What are compound components?</Accordion.Trigger>
            <Accordion.Content>
              <p>
                Compound components are a pattern where components work together
                to form a complete UI.
              </p>
              <ul>
                <li>They share state implicitly</li>
                <li>They provide a flexible API</li>
                <li>They encapsulate complex logic</li>
              </ul>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item3" disabled>
            <Accordion.Trigger>This item is disabled</Accordion.Trigger>
            <Accordion.Content>
              <p>This content won't be shown because the item is disabled.</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* Multiple accordion (multiple items can be open) */}
      <div>
        <h3>Settings - Multiple Selection</h3>
        <Accordion allowMultiple defaultValue={["privacy", "notifications"]}>
          <Accordion.Item value="privacy">
            <Accordion.Trigger>Privacy Settings</Accordion.Trigger>
            <Accordion.Content>
              <div>
                <label style={{ display: "block", marginBottom: "8px" }}>
                  <input type="checkbox" style={{ marginRight: "8px" }} />
                  Make profile public
                </label>
                <label style={{ display: "block", marginBottom: "8px" }}>
                  <input type="checkbox" style={{ marginRight: "8px" }} />
                  Allow search engines to index profile
                </label>
                <label style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ marginRight: "8px" }}
                  />
                  Show online status
                </label>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="notifications">
            <Accordion.Trigger>Notification Preferences</Accordion.Trigger>
            <Accordion.Content>
              <div>
                <label style={{ display: "block", marginBottom: "8px" }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ marginRight: "8px" }}
                  />
                  Email notifications
                </label>
                <label style={{ display: "block", marginBottom: "8px" }}>
                  <input type="checkbox" style={{ marginRight: "8px" }} />
                  SMS notifications
                </label>
                <label style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ marginRight: "8px" }}
                  />
                  Push notifications
                </label>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="account">
            <Accordion.Trigger>Account Settings</Accordion.Trigger>
            <Accordion.Content>
              <div>
                <button
                  style={{
                    padding: "8px 16px",
                    marginRight: "8px",
                    backgroundColor: "#f3f4f6",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                  }}
                >
                  Change Password
                </button>
                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Delete Account
                </button>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export { Accordion, AccordionExample };
```

## Higher Order Components - HOCs
Higher-order components follow the principle of higher-order functions of functional programming, in which a function takes a component as Input and returns a new component or updates the component with enhanced functionalities.

This is a common pattern for abstraction and code reusability, where the HOCs act as the base component, like Error boundary, Authentication handler, Loading state manager, or anything in general, the primary logic resides within the HOCs but the control and data are passed to the input components so that they can control in the way they want to.

Widely used for authentication, logging, and data fetching, etc

### Key characteristics:
- Shares common logic across the components that HOCs take as input.
- Enhances input components without modifying them by passing new props to them.

### Example - with Loading HOC:
withLoading acts as a Higher component that handles the loading state when the item is loading and switches to the input component once loading is completed by rendering different elements conditionally.

```javascript
// withLoading.js - Basic HOC
import React, { useState, useEffect } from "react";

const withLoading = (WrappedComponent) => {
  // Return an updated component
  const WithLoadingComponent = (props) => {
    const { isLoading, loadingText = "Loading...", ...restProps } = props;

    // Show loading state
    if (isLoading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            fontSize: "16px",
            color: "#666",
          }}
        >
          <div style={{ marginRight: "10px" }}>⏳</div>
          {loadingText}
        </div>
      );
    }

    // Render the wrapped component when not loading
    return <WrappedComponent {...restProps} />;
  };

  // Set display name for better debugging
  WithLoadingComponent.displayName = `withLoading(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithLoadingComponent;
};

// Normal component
const UserProfile = ({ user, onEdit }) => (
  <div
    style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
  >
    <h2>{user.name}</h2>
    <p>Email: {user.email}</p>
    <p>Role: {user.role}</p>
    <button onClick={onEdit}>Edit Profile</button>
  </div>
);

// Upgraded component with loading capability
const UserProfileWithLoading = withLoading(UserProfile);

// Usage in parent component
const UserProfileWithLoadingExample = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock API call with delay
    setTimeout(() => {
      setUser({
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
      });
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      <UserProfileWithLoading
        user={user}
        isLoading={isLoading}
        loadingText="Fetching user data..."
        onEdit={() => console.log("Edit clicked")}
      />
    </div>
  );
};

export { withLoading, UserProfileWithLoadingExample };
```

## Render Props Pattern
Render props is a pattern or technique in React to share state and data between two components. Headless component also functions similarly, but in Render props, we can render the UI through a function that will be passed as a prop.

The renderer component will accept a render function as either a prop or children, and then pass the data to that render function and invoke it, rather than itself rendering the U,I providing the flexibility to generate the UI with the style and the structure we want.

### Key characteristics:
- The render component invokes the render function with the data and passes the control to render the logic that will then be returned or generated on the DOM.
- Separate logic and decoupled UI, share the state and the logic without controlling the UI.
- Flexibility to create different UI with the same data.
- Have a clear understanding of what data is being shared.

### Example - Mouse Tracker component:
We will create a mouse tracker component that monitors the mouse movement and returns the coordinates in the render function. providing the flexibility to render the UI as we wish.

```javascript
// MouseTracker.js - Basic render props component
import React, { useState, useEffect } from "react";

const MouseTracker = ({ children, render }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Support both render prop and children as function
  const renderContent = render || children;

  // If neither render prop nor function children are provided, return null
  if (typeof renderContent !== "function") {
    return null;
  }

  return renderContent(mousePosition);
};

const MouseExamples = () => {
  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <h1>Render Props Examples</h1>

      {/* Using render prop */}
      <MouseTracker
        render={({ x, y }) => (
          <div
            style={{
              position: "fixed",
              top: y + 10,
              left: x + 10,
              background: "red",
              color: "white",
              padding: "5px 10px",
              borderRadius: "4px",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            Mouse at ({x}, {y})
          </div>
        )}
      />

      {/* Using children as function */}
      <MouseTracker>
        {({ x, y }) => (
          <div
            style={{
              position: "absolute",
              top: "100px",
              left: "20px",
              padding: "20px",
              border: "2px solid #007bff",
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <h3>Mouse Position Display</h3>
            <p>X: {x}px</p>
            <p>Y: {y}px</p>
            <div
              style={{
                width: "200px",
                height: "100px",
                border: "1px solid #ddd",
                position: "relative",
                backgroundColor: "white",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${(x / window.innerWidth) * 180}px`,
                  top: `${(y / window.innerHeight) * 80}px`,
                  width: "10px",
                  height: "10px",
                  backgroundColor: "blue",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        )}
      </MouseTracker>

      {/* Another different implementation */}
      <MouseTracker>
        {({ x, y }) => (
          <div
            style={{
              position: "absolute",
              top: "250px",
              right: "20px",
              padding: "15px",
              backgroundColor:
                x > window.innerWidth / 2 ? "#e7f5e7" : "#ffe7e7",
              border: `2px solid ${
                x > window.innerWidth / 2 ? "#28a745" : "#dc3545"
              }`,
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
          >
            <h4>Mouse Zone Detector</h4>
            <p>
              You are on the{" "}
              <strong>{x > window.innerWidth / 2 ? "RIGHT" : "LEFT"}</strong>{" "}
              side
            </p>
            <p>
              Distance from center:{" "}
              {Math.abs(x - window.innerWidth / 2).toFixed(0)}px
            </p>
          </div>
        )}
      </MouseTracker>
    </div>
  );
};

export { MouseExamples, MouseTracker };
```