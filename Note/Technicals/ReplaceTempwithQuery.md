# Preview

Before:

```js
const basePrice = this._quantity * this._itemPrice;
if (basePrice > 1000)
  return basePrice * 0.95;
else
  return basePrice * 0.98;
```

After:

```js
get basePrice() {this._quantity * this._itemPrice;}

...

if (this.basePrice > 1000)
  return this.basePrice * 0.95;
else
  return this.basePrice * 0.98;
```

# Motivation

If I'm working on breaking up a large function, turning variables into their own functions makes it easier to extract parts of the function, since I no longer need to pass in variables into the extracted functions. Putting this logic into functions often also sets up a stronger boundary between the extracted logic and the original function, which helps me spot and avoid awkward dependencies and side effects.

Only some temporary variables are suitable for Replace Temp with Query. The variable needs to be calculated once and then only be read afterwards. In the simplest case, this means the variable is assigned to once, but it's also possible to have several assignments in a more complicated lump of code—all of which has to be extracted into the query. Furthermore, the logic used to calculate the variable must yield the same result when the variable is used later—which rules out variables used as snapshots with names like oldAddress.


# Mechanics

1. Check that the variable is determined entirely before it's used, and the code that calculates it does not yield a different value whenever it is used.
2. If the variable isn't read-only, and can be made read-only, do so.
3. Test.
4. Extract the assignment of the variable into a function.
   1. If the variable and the function cannot share a name, use a temporary name for the function. Ensure the extracted function is free of side effects. If not, use Separate Query from Modifier.
5. Test.
6. Use Inline Variable to remove the temp.
