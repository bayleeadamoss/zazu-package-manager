## Zazu Package Manager

[![Build Status](https://travis-ci.org/tinytacoteam/zazu-package-manager.svg?branch=master)](https://travis-ci.org/tinytacoteam/zazu-package-manager)

## Installation

Add `tinytacoteam/zazu-package-manager` inside of plugins block of your ~/.zazurc.json file.

```
{
  "plugins": [
    "tinytacoteam/zazu-package-manager"
  ]
}
```

## Commands

### Installing

You can type `install foo` to search for a `foo` package to install.

![install](./screenshots/install.png)

### Uninstalling

Type `uninstall foo` to search for a `foo` package to uninstall.

![uninstall](./screenshots/uninstall.png)

### List

To list all installed plugins type in `list`, which also accepts an argument.
Clicking one will go to the plugin homepage.

![list](./screenshots/list.png)

### Show Config

To open the folder containing the config, or to open the config in your default
`.json` editor, try `config`:

![config](./screenshots/config.png)
