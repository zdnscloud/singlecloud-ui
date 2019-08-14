---
inject: true
to: <%= h.src() %>/app/epics.js
before: "    // combine epics end"
skip_if: "    <%= name %>Epic,"
---
    <%= name %>Epic,