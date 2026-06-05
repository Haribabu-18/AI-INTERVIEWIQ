import React, { useEffect, useRef, useState } from 'react'
import { api } from '../apis/interceptors';

function Home() {

  const aiContentContainer = useRef();

  const aiResponse = "useEffect` is a **Hook** in React that allows you to perform **side effects** in functional components. It essentially provides a way to interact with the outside world (like the browser DOM, APIs, external subscriptions, timers, etc.) after a component has rendered.\n\nBefore Hooks, side effects in class components were handled using lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. `useEffect` consolidates these concerns into a single API.\n\n---\n\n### What are \"Side Effects\"?\n\nIn the context of React, rendering a component should be a \"pure\" operation – meaning it only calculates what to display based on its props and state, without altering anything outside its scope. Side effects are anything that reaches outside the component to do something, such as:\n\n*   **Data fetching:** Making API calls to get data.\n*   **DOM manipulation:** Directly changing the browser's DOM (e.g., setting the document title, adding/removing event listeners).\n*   **Subscriptions:** Setting up real-time connections or listeners.\n*   **Timers:** `setTimeout` or `setInterval`.\n*   **Logging:** Sometimes, logging to the console is a side effect.\n\n---\n\n### Basic Anatomy of `useEffect`\n\nThe `useEffect` Hook accepts two arguments:\n\n1.  **A function (the \"effect\" function):** This is where you put your side effect code.\n2.  **An optional array of dependencies:** This array tells React when to re-run your effect.\n\n```javascript\nimport React, { useState, useEffect } from 'react';\n\nfunction MyComponent() {\n  const [count, setCount] = useState(0);\n\n  // The basic structure\n  useEffect(() => {\n    // This function runs AFTER EVERY render of MyComponent\n    // if no dependency array is provided.\n\n    console.log('Component rendered or count changed!');\n    document.title = `Count: ${count}`;\n\n    // Optional: Return a cleanup function\n    return () => {\n      // This function runs BEFORE the component unmounts\n      // OR before the effect runs again (if dependencies change).\n      console.log('Cleanup for previous effect or unmount');\n      // For example, remove event listeners, clear timers, unsubscribe\n    };\n  }, [count]); // Optional: Dependency array\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\n---\n\n### Understanding the Dependency Array (The Key Part!)\n\nThe dependency array (the second argument to `useEffect`) is crucial for controlling *when* your effect runs.\n\n1.  **No dependency array (runs after every render):**\n    ```javascript\n    useEffect(() => {\n      // Runs after every single render of the component.\n      // Be careful: this can lead to performance issues if not handled well.\n    });\n    ```\n    *Use case:* Very rare for actual side effects; perhaps for logging every render.\n\n2.  **Empty dependency array `[]` (runs once on mount, cleans up on unmount):**\n    ```javascript\n    useEffect(() => {\n      console.log('Component mounted!');\n      // This effect runs only once after the initial render.\n      // It behaves like componentDidMount.\n\n      return () => {\n        console.log('Component unmounted!');\n        // This cleanup runs only once when the component unmounts.\n        // It behaves like componentWillUnmount.\n      };\n    }, []);\n    ```\n    *Use cases:* Data fetching that doesn't depend on props/state, setting up global event listeners, initializing third-party libraries.\n\n3.  **Dependencies specified `[prop1, state2]` (runs when dependencies change):**\n    ```javascript\n    useEffect(() => {\n      console.log(`Count or name changed: Count is ${count}, Name is ${name}`);\n      // This effect runs after the initial render,\n      // AND whenever `count` or `name` changes between renders.\n\n      return () => {\n        console.log('Cleanup before count or name changes again, or on unmount.');\n        // This cleanup runs BEFORE the effect is re-executed\n        // (if count or name changed) or when the component unmounts.\n      };\n    }, [count, name]); // Effect re-runs if count or name changes\n    ```\n    *Use cases:* Fetching data based on an ID prop, updating the DOM based on a state variable, reacting to specific state or prop changes.\n\n---\n\n### The Cleanup Function\n\nThe function you *return* from `useEffect` is the **cleanup function**. It's vital for preventing memory leaks and unwanted behavior.\n\n*   **When does it run?**\n    *   Before the effect runs again (if the dependencies have changed).\n    *   When the component unmounts.\n\n*   **What should it do?**\n    *   Remove event listeners (`removeEventListener`).\n    *   Clear timers (`clearTimeout`, `clearInterval`).\n    *   Unsubscribe from external services.\n    *   Cancel pending network requests.\n\nWithout proper cleanup, you can end up with stale data, performance issues, or incorrect component behavior.\n\n---\n\n### Key Takeaways\n\n*   **Purpose:** To manage side effects (interactions with the \"outside world\") in functional components.\n*   **Replacement for:** `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` from class components.\n*   **Dependency Array:** Controls *when* the effect re-runs. This is the most important concept to master.\n*   **Cleanup Function:** Crucial for preventing memory leaks and resource management; always return a cleanup function if your effect sets up subscriptions, listeners, or timers.\n*   **Runs *After* Render:** Effects execute after the component has rendered and the browser has painted the screen.\n\n`useEffect` is one of the most powerful and frequently used Hooks in React, essential for building complex and interactive applications"

  const [userText, setUserText] = useState("");

  async function callAI(e) {
    e.preventDefault();

    if (!userText.length) {
      return
    }


    try {
      const response = await api.post('/interview/liveInterview', { prompt: userText });

      console.log(response, response?.data?.data, 'ai response')

      aiContentContainer.current.innerText = response.data.data

    } catch (err) {
      console.log(err)

    }
  }

  // useEffect(() => {
  //   aiContentContainer.current.innerText = aiResponse;
  // }, [])
  return (
    <>

      <div>
        <form className='flex justify-center mt-4 gap-4' onSubmit={callAI}>
          <textarea type="text" placeholder='ask ai' className='w-80 border-1 shadow-2xl' onChange={(e) => { setUserText(e.target.value) }} />
          <input type="submit" value="Submit" disabled={!userText.length ? true : false} className={`${!userText.length ? "bg-blue-300 rounded text-white p-3" : "bg-blue-700 cursor-pointer rounded text-white p-3"}`} />
        </form>
      </div>

      <div ref={aiContentContainer}>

      </div>

    </>
  )
}

export default Home