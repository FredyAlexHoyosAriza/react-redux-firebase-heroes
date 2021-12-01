if ({}) {
    console.log('Un objeto vacio es como un true'); // true
} else {
    console.log('Un objeto vacio es como un false'); // false
}

if ([]) {
    console.log('Un array vacio es como un true'); // true
} else {
    console.log('Un array vacio es como un false'); // false
}

if ('') {
    console.log('Un string vacio es como un true'); // false
} else {
    console.log('Un string vacio es como un false'); // true
}

if (null) {
    console.log('Un null es como un true'); // false
} else {
    console.log('Un null es como un false'); // true
}

if (undefined) {
    console.log('Un undefined es como un true'); // false
} else {
    console.log('Un undefined es como un false'); // true
}

if (NaN) {
    console.log('Un NaN es como un true'); // false
} else {
    console.log('Un NaN es como un false'); // true
}

if (Infinity) {
    console.log('Un Infinity es como un true'); // true
} else {
    console.log('Un Infinity es como un false'); // false
}

const email = 'email';
const password = 'password'

console.log({[email]: 'bety10@gmail.com'});
console.log({email: 'bety10@gmail.com'});
let values = {
    email: '',
    password: ''
}
console.log(values);

values = {
    ...values,
    [email]: 'bety10@gmail.com'
}
console.log(values);
values = {
    ...values,
    [password]: '1234'
}
console.log(values);
values = {
    ...values,
    [email]: 'leo10@gmail.com'
}
console.log(values);

const defaultFunction = (a = false) => {
    if (!a) {
        console.log('Se ha tomado el valor por omision');
    } else {
        console.log('Se imprime el valor enviado:', a);
    }
}

defaultFunction('Pablito clavo un clavito');
defaultFunction();

const formStates = [true, true, true, true, true];

console.log(formStates.find((formState) => !formState));


