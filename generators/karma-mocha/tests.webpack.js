var context = require.context('./modules', true, /-test\.js$/);
console.log(context);
context.keys().forEach(context);
