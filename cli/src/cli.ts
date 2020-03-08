import { inject as Inject, injectable as Injectable } from 'inversify';
import { exit } from 'process';
import { askFeatures, askProjectName } from './questions';
import { ProjectService } from './service/project.service';
import { LogService } from './service/log.service';

const projectNameMatch = new RegExp(/^[a-z0-9-_]+$/);
const invalidProjectName = (name: string) => !projectNameMatch.test(String(name));

@Injectable()
export class CLI {
  constructor(
    @Inject('LogService') private readonly log: LogService,
    @Inject('ProjectService') private readonly project: ProjectService
  ) {}

  /**
   * Start asking questions
   */
  async run(): Promise<void> {
    this.log.showIntro();

    const { projectName } = await askProjectName('projectName');
    if (invalidProjectName(projectName)) {
      this.log.error(`Invalid project name, must match: ${projectNameMatch.toString()}`);
      exit(1);
    }

    const { features } = await askFeatures('features');
    if (!features.length) {
      this.log.error('You must select at least 1 feature');
      exit(1);
    }

    await this.project.generate(projectName, features);
    await this.project.install(projectName);

    console.log('done!');
  }
}
