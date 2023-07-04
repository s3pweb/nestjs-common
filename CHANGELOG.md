# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.2.0](https://github.com/s3pweb/nestjs-ip-whitelist/compare/v2.1.0...v2.2.0) (2023-07-04)


### Features

* **middleware:** add a cache-control middleware ([dfcc939](https://github.com/s3pweb/nestjs-ip-whitelist/commit/dfcc9391f2192e1cdec7b428418d0ba6325deeed))

## [2.1.0](https://github.com/s3pweb/nestjs-ip-whitelist/compare/v2.0.3...v2.1.0) (2023-06-27)


### Features

* **deps:** update peerDependencies to be compatible with NestJS 10 ([12d1206](https://github.com/s3pweb/nestjs-ip-whitelist/commit/12d120683b4ddd7b511a2463931e74eda6a7f6fb))

## [2.0.3](https://github.com/s3pweb/nestjs-ip-whitelist/compare/v2.0.2...v2.0.3) (2023-05-30)

## [2.0.2](https://github.com/s3pweb/nestjs-ip-whitelist/compare/v2.0.1...v2.0.2) (2023-05-30)


### Bug Fixes

* **logger:** inject ConfigService in the constructor ([083afde](https://github.com/s3pweb/nestjs-ip-whitelist/commit/083afde4e0266576dcbc99d8c896c4b7dd53d542))

## [2.0.1](https://github.com/s3pweb/nestjs-ip-whitelist/compare/v2.0.0...v2.0.1) (2023-05-26)


### Bug Fixes

* **logger:** fix injection failure ([93afe5b](https://github.com/s3pweb/nestjs-ip-whitelist/commit/93afe5b2d025147841c80198d1fad1265abeca18))

## [2.0.0](https://github.com/s3pweb/nestjs-ip-whitelist/compare/v1.0.2...v2.0.0) (2023-05-26)


### ⚠ BREAKING CHANGES

* **logging:** externalise logger config for @s3pweb/s3pweb-logger 2.0.0

### Features

* **logging:** externalise logger config for @s3pweb/s3pweb-logger 2.0.0 ([72797d6](https://github.com/s3pweb/nestjs-ip-whitelist/commit/72797d6b271e4de58a985539ef251eb84fd177d5))

## [1.0.2](https://github.com/s3pweb/nestjs-ip-whitelist/compare/v1.0.1...v1.0.2) (2023-02-22)

## [1.0.1](https://github.com/s3pweb/nestjs-ip-whitelist/compare/v1.0.0...v1.0.1) (2023-02-22)


### Other

* add build command to npm-publish.yml ([05f5c38](https://github.com/s3pweb/nestjs-ip-whitelist/commit/05f5c3883db83b639d1e0b94086187bde81cd9b7))

## [1.0.0](https://github.com/s3pweb/nestjs-ip-whitelist/compare/v0.3.0...v1.0.0) (2023-02-22)


### Features

* **logger:** add debug and verbose functions ([4097d58](https://github.com/s3pweb/nestjs-ip-whitelist/commit/4097d58704d5bcfe3b25886b26c179d38b71f7b4))


### Other

* **deps-dev:** replace standard-version with commit-and-tag-version ([e171586](https://github.com/s3pweb/nestjs-ip-whitelist/commit/e171586d60e519e8f4d2089009b61676738362ce))

## [0.3.0](https://github.com/s3pweb/nestjs-ip-whitelist/compare/v0.2.0...v0.3.0) (2022-12-19)


### Features

* **middleware:** add the correlation ID middleware ([371e838](https://github.com/s3pweb/nestjs-ip-whitelist/commit/371e8380fbdc19782ac0f1d44ed6e9c4abf5fb99))
* **middleware:** add the HTTP exceptions logger middleware ([f471053](https://github.com/s3pweb/nestjs-ip-whitelist/commit/f4710536fca0333aa68efbeb5b21079bac42c8ea))

## [0.2.0](https://github.com/s3pweb/nestjs-ip-whitelist/compare/v0.1.0...v0.2.0) (2022-12-15)


### Features

* **logger:** add a logging module ([4e5e321](https://github.com/s3pweb/nestjs-ip-whitelist/commit/4e5e321d30bcaf7ca9da3de5483b2416d6d65714))
* **metrics:** add a new interface for a metrics service ([9e3d70f](https://github.com/s3pweb/nestjs-ip-whitelist/commit/9e3d70f3a6f3fd28bb72e6fb4ee5572913941283))

## 0.1.0 (2022-12-13)


### Features

* **ip-whitelist:** add a guard and a decorator to filter IPs on a controller or a route ([460cce3](https://github.com/s3pweb/nestjs-ip-whitelist/commit/460cce349159f37485e6c14913e61750d6138e38))
