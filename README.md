# Gitleaks Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fgitleaks_pipeline&query=%24.version)](https://pkg.fluentci.io/gitleaks_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.37)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/gitleaks-pipeline)](https://codecov.io/gh/fluent-ci-templates/gitleaks-pipeline)

A ready-to-use CI/CD Pipeline for detecting secrets in your code using [Gitleaks](https://gitleaks.io/).

## 🚀 Usage

Run the following command:

```bash
fluentci run gitleaks_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t gitleaks
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
fluentci run .
```

## Dagger Module

Use as a [Dagger](https://dagger.io) module:

```bash
dagger mod install github.com/fluent-ci-templates/gitleaks-pipeline@mod
```

## Jobs

| Job     | Description                 |
| ------- | --------------------------- |
| detect  | Detect secrets in your code |

```graphql
detect(src: String): String
```

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { detect } from "https://pkg.fluentci.io/gitleaks_pipeline@v0.1.0/mod.ts";

await detect();
```

