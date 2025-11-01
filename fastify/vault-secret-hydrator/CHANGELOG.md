# Changelog

## 0.1.2

### Patch Changes

- release

## 0.1.1

### Patch Changes

- release

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-01

### Added

- Initial release of vault-secret-hydrator
- Core parsing engine for KEY=VALUE format secrets
- Automatic base64 decoding for FILE\_ prefixed keys
- Recursive parsing of nested file contents
- Property flattening with FILE_KEY_nestedKey pattern
- Configurable parser options:
  - `strict` mode for error handling
  - `duplicateKeyStrategy` for handling duplicate keys
  - `ignoreNonUppercase` option
- Complete TypeScript type definitions
- Comprehensive error classes:
  - `VaultSecretError` (base class)
  - `EmptyInputError`
  - `Base64DecodingError`
  - `DuplicateKeyError`
  - `ParsingError`
  - `InvalidOptionsError`
- Factory function `createVaultSecretParser()`
- Public API methods:
  - `parse(input: string | Buffer): ParsedSecret`
  - `getProperties(): Record<string, string>`
  - `getFiles(): Record<string, FileEntry>`
  - `toJSON(): ParsedSecret`
  - `getOptions(): Required<ParserOptions>`
- Utility functions for advanced usage
- Comprehensive test suite with >90% coverage
- Full documentation with examples
- PROJECT_BREAKDOWN_FRAMEWORK.md methodology document

### Features

- Support for both string and Buffer input
- Normalization of Windows (\r\n) and Unix (\n) line endings
- Automatic filtering of non-uppercase keys
- Three duplicate key strategies: error, override, skip
- Loose mode for graceful error handling
- Deep cloning of returned objects for immutability

### Dependencies

- `properties-parser`: ^0.3.1

### Requirements

- Node.js >= 22.0.0
- npm >= 9.0.0

[0.1.0]: https://github.com/carlosmarte/mta-multi-tenant-application/releases/tag/vault-secret-hydrator-v0.1.0
