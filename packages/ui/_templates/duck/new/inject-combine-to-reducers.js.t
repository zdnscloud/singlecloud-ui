---
inject: true
to: <%= h.src() %>/app/reducers.js
before: "    // combine reducers end"
skip_if: "\\[<%= name %>Prefix\\]: <%= name %>Reducer,"
---
    [<%= name %>Prefix]: <%= name %>Reducer,