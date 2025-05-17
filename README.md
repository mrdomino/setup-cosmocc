# Setup Cosmocc GitHub Action

A GitHub action to download and setup the [cosmocc](https://github.com/jart/cosmopolitan) toolchain for use in your workflows.

## Usage

```yaml
- name: Setup Cosmocc
  uses: mrdomino/setup-cosmocc@v1

# Or with a specific version
- name: Setup Cosmocc
  uses: mrdomino/setup-cosmocc@v1
  with:
    version: 4.0.2
```
