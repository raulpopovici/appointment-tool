
    export type RemoteKeys = 'headerBarApp/header';
    type PackageType<T> = T extends 'headerBarApp/header' ? typeof import('headerBarApp/header') :any;