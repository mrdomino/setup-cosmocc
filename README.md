# Setup Cosmocc GitHub Action

A GitHub action to download and setup the [cosmocc](https://github.com/jart/cosmopolitan) toolchain for use in your workflows.

## Usage

Put a step like this in your GitHub workflow:

```yaml
- name: Setup Cosmocc
  uses: mrdomino/setup-cosmocc@v1

# Or with a specific version
- name: Setup Cosmocc
  uses: mrdomino/setup-cosmocc@v1
  with:
    version: 4.0.2
```

Then, you ought to be able to do things like `CC=cosmocc CXX=cosmoc++ make`.
