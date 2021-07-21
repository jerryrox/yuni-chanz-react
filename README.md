# yuni-chanz-react
The core components of the Yuni Chanz React library.

This is still in early development, so it is subject to frequent breaking changes. The package wasn't meant for others to use anyway...

## Versions
### 1.1.2 (WIP)
#### New features
- Added `getSearchParams` to `Navigation` module.

### 1.1.1
#### Changes
- Changed the default parameter type of `ExplicitViewModel` to `any`.

### 1.1.0 
#### Changes
- Redesigned the way dependencies are created and added to the `DependencyContainer`.

### 1.0.0
#### Major changes
- Removed `bindable-bloc` package. Specifically, a new package `bindable-data` was used instead which is a subset that doesn't include the weird `BLoC` stuffs. All in short, this now allows for a less-complex way for a dependency to retrieve other dependencies.

### 0.2.3
#### Fixes
- Fixed issue where calling `ExplicitViewModel.show` would not pass the parameters to the model when the view is already being shown.

### 0.2.2
#### New features
- Implemented an additional event `onRoutePath` on `RoutedViewModel`.
- Added an additional parameter on `RoutedViewModel.onRouteParams` to retrieve current path.

### 0.2.1
#### New features
- Implemented `EventAction` to achieve similar effect to C#'s event.

### 0.2.0
#### Changes
- Changed generic type of `IApi` in `IStreamableDataApi` from `T | null` to just `T`.

### 0.1.0
#### Changes
- Added `ApiResponse` class to be resolved by `IApi`'s `request()`. This is to enforce the APIs to catch errors if there would be any.

### 0.0.5
#### Changes
- Added some encoder functions in `ModelConverter` just for consistency.

### 0.0.4
#### New features
- Implemented dependency management module.
- Implemented a utility class for Promises.
- Implemented a utility class for useful math operations.
- Implemented a utility class for useful path manipulations.
- Implemented a base model conversion class.
- Implemented base view model classes.
- Implemented navigation module and hooks.
- Added basic interfaces for API class implementation.