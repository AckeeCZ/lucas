# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2021-04-03

### Changed
- 🔨 Switch from npm lock to yarn lock
- 🔧 Change editor for changelog from vim to vscode
- 🔧 Remove story files from being ignored by babel
- ♻️ Replace react-file-uploader with react-dropzone
- ⬆️ Upgrade travis node.js to v10
- ⬆️ Upgrade typescript
- ⬆️ Update babel
- ⬆️ Upgrade onchange package dependencies
- ⬆️ Upgrade enzyme to v3.11
- ⬆️ Upgrade storybook to v5
- ⬆️ Upgrade eslint to v5.16
- 📌 Ping dot-prop dependency version to fix vulnerability issue
- 📌 Pin immer to v8 to fix vulnerability issue

### Removed
- 🔥 Remove obsolete sass packages


## [0.3.1] - 2019-07-08
### Removed
- Unused import

### Fixed
- Avoid omitting children for `loadable` HOC to be able to pass complex components

## [0.3.0] - 2019-06-24
### Added
- Add configuration for `es` build.

### Changed
- Upgrade peer dependencies.

## [0.2.3] - 2019-04-29
### Added
- Optimize `lodash` partial imports.

## [0.2.2] - 2019-01-30
### Changed
- Update changelog-it

## [0.2.1] - 2019-01-30
### Changed
- TSconfig exclude tests from transpilation/generating definitions

## [0.2.0] - 2019-01-30
### Added
- CHANGELOG.md

### Changed
- Exclude stories from transpilation and generating of definitions

## [0.1.4] - 2019-01-28
### Fixed
- Building d.ts and story files from src [`e6dbced`](https://github.com/AckeeCZ/lucas/commit/e6dbcedeff28d5bf890fa13f6a80e83b791cb04f)

## [0.1.3] - 2019-01-28
### Fixed
- Export actions from package [`c62a57c`](https://github.com/AckeeCZ/lucas/commit/c62a57cf4a6c12aba801c92f621b6012cd5bd522)

## [0.1.2] - 2019-01-28
### Fixed
- Divide DataList component to individual components, fix issues in Readme [`4d9f4c1`](https://github.com/AckeeCZ/lucas/commit/4d9f4c124c7cc7354fb8cf8f20cfffd89b23c175)

## [0.1.1] - 2019-01-28
### Changed
- Generate new npm api key [`df3880c`](https://github.com/AckeeCZ/lucas/commit/df3880c29de0f452b2f86e286d40243db56897f9)

## 0.1.0 - 2019-01-28
### Added
- Repository ackee-lucas have been born [`202b401`](https://github.com/AckeeCZ/lucas/commit/202b4014cfbf593e85669ba4983a4e29b361ec3e)

[#11]: https://github.com/AckeeCZ/lucas/issues/11

[0.4.0]: https://github.com/AckeeCZ/lucas/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/AckeeCZ/lucas/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/AckeeCZ/lucas/compare/v0.2.3...v0.3.0
[0.2.3]: https://github.com/AckeeCZ/lucas/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/AckeeCZ/lucas/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/AckeeCZ/lucas/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/AckeeCZ/lucas/compare/v0.1.4...v0.2.0
[0.1.4]: https://github.com/AckeeCZ/lucas/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/AckeeCZ/lucas/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/AckeeCZ/lucas/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/AckeeCZ/lucas/compare/v0.1.0...v0.1.1
