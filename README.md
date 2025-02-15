# Function Vault

## Overview

This project extends [Apps Script Management](https://github.com/sangnandar/Apps-Script-Management) in the case where clients have their own unique variables and/or functions.

Consider this scenario:

- There are John Doe and Jane Smith.

- Function `customFormulaOne` for cell A7 accepted 2 arguments:

  ```js
  function customFormulaOne(a, b)
  {
    return a + (coefficient * b);
  }
  ```

- John Doe and Jane Smith calculate `coefficient` differently. Let's say John Doe and Jane Smith have different sets of data resulted in a different method to calculate the coefficient.

- Hence we need to write different `customFormulaOne` for John Doe and Jane Smith.

## The Vault

We need to create a vault that follows this structure:

```text
/vault
│── Default.gs          # Default formulas applied for all clients.
│── John Doe.gs         # Unique formulas applied only for John Doe.
│── Jane Smith.gs       # Unique formulas applied only for Jane Smith.
└── ...etc...
```

## Send formulas

When the vault receives an incoming request:

```mermaid
graph TD;
  classDef return fill:#f96;
  incoming[Incoming request] --> validate[Validate];

  validate -->|Invalid| return1[Send error response]:::return;
  validate -->|Valid| processRequest[Process request];

  processRequest --> checkClientFile{Client file exist?};
  checkClientFile -->|No| defaultFile[Send default formulas]:::return
  checkClientFile -->|Yes| processFormula[Process formulas]

  processFormula --> clientFile{Formula exist?}
  clientFile --> |No| defaultFormula[Get default formula]
  clientFile --> |Yes| clientFormula[Get client formula]

  defaultFormula --> out[Send formulas]
  clientFormula --> out[Merge and send formulas]:::return
```

## Apps Script configuration

- **`appsscript.json`**:

  ```json
  {
    "webapp": {
      "executeAs": "USER_DEPLOYING",
      "access": "ANYONE_ANONYMOUS"
    }
  }
  ```

## Sheets configuration

**DO NOT** change sheets name, delete columns, or re-arrange columns for the following ranges:

- Read

  ```text
  'Updater'!A2:G
  ```

Sheets layout:

  ![413563127-97399f41-bfba-46fa-ade1-0b025e3295d3](https://github.com/user-attachments/assets/52593931-76e5-41c8-92bc-57e392ed6151)

