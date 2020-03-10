export function invoke(fn:any) {
    if('function' === typeof fn) {
        fn();
    }
}
