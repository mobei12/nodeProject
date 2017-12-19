var abc = {a:1};
Object.freeze(abc);

console.log(Object.getOwnPropertyDescriptor(abc,'c'))