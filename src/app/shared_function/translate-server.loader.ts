
import { TranslateLoader } from '@ngx-translate/core';
import { join } from 'path';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
export class TranslateServerLoader implements TranslateLoader {
  constructor(
    private transferState: TransferState,
    private prefix: string = 'i18n',
    private suffix: string = '.json',
  ) {
  }

  public getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      const assetsFolder = join(
        process.cwd(),
        'dist',
        'Egecmena', // Your project name here
        'browser',
        'assets',
        this.prefix,
      );

      const jsonData = JSON.parse(
        fs.readFileSync(`${assetsFolder}/${lang}${this.suffix}`, 'utf8'),
      );
      const key: StateKey<number> = makeStateKey<number>(
        'transfer-translate-' + lang,
      );
      this.transferState.set(key, jsonData);
      observer.next(jsonData);
      observer.complete();
    });
  }
}

export function translateServerLoaderFactory(transferState: TransferState): TranslateLoader {
  return new TranslateServerLoader(transferState);
}
// export class TranslateServerLoader implements TranslateLoader {

//   constructor(
//     private transferState: TransferState,
//     @Inject(String) private prefix: string = 'i18n',
//     @Inject(String) private suffix: string = '.json'
//   ) {}

//   public getTranslation(lang: string): Observable<any> {
//     return new Observable((observer) => {
//       const assets_folder = join(
//         process.cwd(),
//         'dist',
//         'Egecmena', // Your project name here
//         'browser',
//         'assets',
//         this.prefix
//       );

//       const jsonData = JSON.parse(
//         fs.readFileSync(`${assets_folder}/${lang}${this.suffix}`, 'utf8')
//         );

//       // Here we save the translations in the transfer-state
//       const key: StateKey<number> = makeStateKey<number>(
//         lang
//       );
//       this.transferState.set(key, jsonData);
//       observer.next(jsonData);
//       observer.complete();
//     });
//   }
// }

// export function translateServerLoaderFactory(transferState: TransferState) {
//   return new TranslateServerLoader(transferState);
// }
