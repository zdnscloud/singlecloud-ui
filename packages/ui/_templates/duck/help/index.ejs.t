---
message: |

  - hygen {bold duck} new --name [NAME]
    This will create a duck suit in {green app/ducks/[NAME]/} directory.
    A Duck includes 5 file:
    - actions.js
    - constants.js
    - epic.js
    - index.js
    - selectors.js

  - subactions:
    - hygen {bold duck} new:actions --name [NAME]
      Only create {green app/ducks/[name]/actions.js} file.
    - hygen {bold duck} new:constants --name [NAME]
      Only create {green app/ducks/[name]/constants.js} file.
    - hygen {bold duck} new:epic --name [NAME]
      Only create {green app/ducks/[name]/epic.js} file.
    - hygen {bold duck} new:index --name [NAME]
      Only create {green app/ducks/[name]/index.js} file.
    - hygen {bold duck} new:selectors --name [NAME]
      Only create {green app/ducks/[name]/selectors.js} file.
---
