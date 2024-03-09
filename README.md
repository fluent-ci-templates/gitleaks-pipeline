# Gitleaks Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fgitleaks_pipeline&query=%24.version)](https://pkg.fluentci.io/gitleaks_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF&labelColor=000000)](https://dagger.io)
[![](https://jsr.io/badges/@fluentci/gitleaks)](https://jsr.io/@fluentci/gitleaks)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/gitleaks-pipeline)](https://codecov.io/gh/fluent-ci-templates/gitleaks-pipeline)
[![ci](https://github.com/fluent-ci-templates/gitleaks-pipeline/actions/workflows/ci.yml/badge.svg)](https://github.com/fluent-ci-templates/gitleaks-pipeline/actions/workflows/ci.yml)

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

## 🧩 Dagger Module

Use as a [Dagger](https://dagger.io) module:

```bash
dagger install github.com/fluent-ci-templates/gitleaks-pipeline@main
```

Call a function from the module:

```bash
dagger call detect --src .
```

## ✨ Jobs

| Job     | Description                 |
| ------- | --------------------------- |
| detect  | Detect secrets in your code |

```typescript
detect(
  src: string | Directory | undefined = "."
): Promise<File | string>
```

## 👨‍💻 Programmatic usage

You can also use this pipeline programmatically:

```ts
import { detect } from "jsr:@fluentci/gitleaks";

await detect();
```

