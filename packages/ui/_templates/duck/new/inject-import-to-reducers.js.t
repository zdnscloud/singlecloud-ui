---
inject: true
to: <%= h.src() %>/app/reducers.js
before: "// import reducers end"
skip_if: "import <%= name %>Reducer, { prefix as <%= name %>Prefix } from 'ducks/<%= name %>';"
---
import <%= name %>Reducer, { prefix as <%= name %>Prefix } from 'ducks/<%= name %>';