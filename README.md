# graphql-schema-collector

Instantiate a GraphQL Schema by loading GraphQL Schema Language files based on a glob pattern

* Allows creation of GraphQL Schema via GraphQL schema language shorthand
* Supports splitting the schema into modules
* Parse and validate schema files

## Installation

```sh
npm install --save graphql @cdmbase/graphql-schema-collector
```

## Usage

Given the following files

schema/schema.graphql

```
schema {
  query: RootQuery
}
```

schema/rootQuery.graphql

```
type RootQuery {
  testString: String
}
```

Create a schema with the following code:

```js
const loader = require('@cdmbase/graphql-schema-collector')

loader.loadSchema('./schema/*.graphql', (err, schema) => {
  console.log(schema.getQueryType().toString())
})
```

Create a schema using promises:

```js
const loader = require('@cdmbase/graphql-schema-collector')

loader.loadSchema('./schema/*.graphql').then((schema) => {
  console.log(schema.getQueryType().toString())
})
```

Create a schema using sync:

```js
const loader = require('@cdmbase/graphql-schema-collector')

const schema = loader.loadSchema.sync('./schema/*.graphql')
console.log(schema.getQueryType().toString())

```

## Development


### Build

```sh
npm run build
```


### Run test in watch mode

```sh
npm run test:watch
```

## License
This project is licensed under [Apache License Version 2.0](./LICENSE)
