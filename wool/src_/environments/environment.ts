// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const parsedUrl = new URL(window.location.href);
const baseUrl = parsedUrl.origin;
console.log(baseUrl); // this will print http://example.com or http://localhost:4200

export const environment = {
  production: false,
  baseUrl: "http://202.131.123.10:8884/",
  //for Tracy
  //;baseUrl: "http://localhost:4203/",
  menuSystemUrl: "http://localhost:4200/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
