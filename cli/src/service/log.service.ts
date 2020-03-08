import clear from 'clear';
import figlet from 'figlet';
import { inject as Inject, injectable as Injectable } from 'inversify';
import { cyan, red, yellow } from 'kleur';
import { Package } from '../model/package';

@Injectable()
export class LogService {
  constructor(@Inject('Package') private readonly pkg: Package) {}

  error(message: string, ...optionalParams: any[]): void {
    console.log(red(`=> ${message}`), ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]): void {
    console.log(yellow(`=> ${message}`), ...optionalParams);
  }

  info(message: string, ...optionalParams: any[]): void {
    console.log(cyan(`=> ${message}`), ...optionalParams);
  }

  showIntro(): void {
    clear({ fullClear: true });

    console.log(red(figlet.textSync(this.pkg.shortName, { horizontalLayout: 'full' })));
    console.log(yellow('More info: https://github.com/larscom/angular-chrome-extension'));
    console.log('---------------------------------------------------------------');
    console.info('Generating a new chrome extension...');
    console.log();
  }
}
