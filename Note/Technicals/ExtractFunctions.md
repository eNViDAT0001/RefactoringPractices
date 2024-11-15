# Preview

Before:

```js
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();

  //print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

After:

```js
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  printDetails(outstanding);

  function printDetails(outstanding) {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
  }
}
```

# Motivation

During my career, I've heard many arguments about when to enclose code in its own function. Some of these guidelines were based on length: Functions should be no larger than fit on a screen. Some were based on reuse: Any code used more than once should be put in its own function, but code only used once should be left inline. The argument that makes most sense to me, **_however, is the separation between intention and implementation_**. If you have to spend effort looking at a fragment of code and figuring out what it's doing, then you should extract it into a function and name the function after the “what.” Then, when you read it again, the purpose of the function leaps right out at you, and most of the time you won't need to care about how the function fulfills its purpose (which is the body of the function).

_Some people are concerned about short functions because they worry about the performance cost of a function call_. When I was young, that was occasionally a factor, _but that's very rare now_. **Optimizing compilers often work better with shorter functions which can be cached more easily. As always, follow the general guidelines on performance optimization**.

# Mechanics

1. Create a new function, and name it after the intent of the function (name it by what it does, not by how it does it).
2. Copy the extracted code from the source function into the new target function.
3. Scan the extracted code for references to any variables that are local in scope to the source function and will not be in scope for the extracted function. Pass them as parameters.
4. Compile after all variables are dealt with.
5. Replace the extracted code in the source function with a call to the target function.
6. Look for other code that's the same or similar to the code just extracted, and consider using Replace Inline Code with Function Call to call the new function.

> “What happens if more than one variable needs to be returned?”

Here, I have several options. Usually I prefer to pick different code to extract. I like a function to return one value, so I would try to arrange for multiple functions for the different values. If I really need to extract with multiple values, I can form a record and return that—but usually I find it better to rework the temporary variables instead. Here I like using Replace Temp with Query and Split Variable.
