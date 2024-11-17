# Preview

Before:

```js
let temp = 2 * (height + width);
console.log(temp);
temp = height * width;
console.log(temp);
```

After:

```js
const perimeter = 2 * (height + width);
console.log(perimeter);
const area = height * width;
console.log(area);
```

# Motivation

Variables have various uses. Some of these uses naturally lead to the variable being assigned to several times. Loop variables change for each run of a loop (such as the i in for (let i=0; i<10; i++)). Collecting variables store a value that is built up during the method.

Many other variables are used to hold the result of a long-winded bit of code for easy reference later. These kinds of variables should be set only once. If they are set more than once, it is a sign that they have more than one responsibility within the method. **_Any variable with more than one responsibility should be replaced with multiple variables, one for each responsibility_**. Using a variable for two different things is very confusing for the reader.

# Mechanics

1. Change the name of the variable at its declaration and first assignment.
2. If possible, declare the new variable as immutable.
3. Change all references of the variable up to its second assignment.
4. Test.
5. Repeat in stages, at each stage renaming the variable at the declaration and changing references until the next assignment, until you reach the final assignment.
