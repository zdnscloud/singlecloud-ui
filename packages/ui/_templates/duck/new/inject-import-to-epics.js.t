---
inject: true
to: <%= h.src() %>/app/epics.js
before: "// import epics end"
skip_if: "import <%= name %>Epic from 'ducks/<%= name %>/epic';"
---
import <%= name %>Epic from 'ducks/<%= name %>/epic';