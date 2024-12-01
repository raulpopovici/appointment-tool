
    export type RemoteKeys = 'headerBarApp/Header';
    type PackageType<T> = T extends 'headerBarApp/Header' ? typeof import('headerBarApp/Header') :any;