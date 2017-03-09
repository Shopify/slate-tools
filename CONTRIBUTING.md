# How to contribute
We ❤️ pull requests. If you'd like to fix a bug, contribute a feature or
just correct a typo, please feel free to do so, as long as you follow
our [Code of Conduct](https://github.com/Shopify/slate-tools/blob/master/CODE_OF_CONDUCT.md).

If you're thinking of adding a big new feature, consider opening an
issue first to discuss it to ensure it aligns to the direction of the
project (and potentially save yourself some time!).

## Getting Started
To start working on the codebase, first fork the repo, then clone it:
```
git clone git@github.com:your-username/slate-tools.git
```
*Note: replace "your-username" with your Github handle*

Install the project's dependencies:
```
npm install
```

Write some features.

Add some tests and make your change. Re-run the tests with:
```
npm run test
```

## Examples
See [here](https://github.com/Shopify/slate-tools/blob/master/examples) for our examples.

## Documentation
If your change affects how people use the project (i.e. adding or
changing arguments to a function, adding a new function, changing the
return value, etc), please ensure the documentation is also updated to
reflect this. Documentation is in the `README.md` if further documentation is needed please communicate via Github Issues.

## Testing locally

If you are working on a PR and want to test your changes in a project, that project will need to have a symlink (symbolic link) to your local `slate-tools` repo.

### Linking your repo

#### `npm link`

Navigate to the project folder and use `npm link` to create a symlink to the local repo. 

```sh
project $ npm link PATH/slate-tools
# subsitute PATH for the appropriate parent directory
```

The output will be something like:
```
/user/.../project/node_modules/@shopify/slate-tools -> /user/.../lib/node_modules/@shopify/slate-tools -> /user/.../slate-tools
```

Your editor may show a new icon to show it is linked.  Check under `node_modules/@shopify`

![http://take.ms/W6hB2](http://take.ms/W6hB2)

#### `npm start`

In the `slate-tools` directory, run `npm start`.   This will watch `slate-tools` for changes and transpile JS using babel.

```sh
slate-tools $ npm start
```

### Unlinking your repo

To unlink the project from your local repo, delete the `node_modules` directory.  The next time you run `npm install` it will no longer be linked.
