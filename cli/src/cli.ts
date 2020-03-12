import { inject as Inject, injectable as Injectable } from 'inversify';
import { askFeatures, askProjectName } from './questions';
import { ProjectService } from './service/project.service';
import { LogService } from './service/log.service';
import * as ts from 'typescript';
import fs from 'fs-extra';

@Injectable()
export class CLI {
  constructor(
    @Inject('LogService') private readonly log: LogService,
    @Inject('ProjectService') private readonly project: ProjectService
  ) {}

  /**
   * Start asking questions
   */
  // async run(): Promise<void> {
  //   this.log.showIntro();

  //   const { projectName } = await askProjectName('projectName');
  //   await this.project.validateName(projectName);

  //   const { features } = await askFeatures('features');
  //   this.project.validateFeatures(features);

  //   await this.project.generate(projectName, features);
  //   await this.project.install(projectName);

  //   this.log.showHelp(projectName);
  // }

  run() {
    const fileName = 'app-routing.module.ts';
    const buffer = fs.readFileSync(`/home/lars/Projects/angular-chrome-extension/cli/test/angular/src/app/${fileName}`);
    const content = buffer.toString('utf-8');

    const source = ts.createSourceFile(fileName, content, ts.ScriptTarget.Latest, true);

    const transformer = <T extends ts.Node>(context: ts.TransformationContext) => {
      return (rootNode: T) => {
        const visit = (node: ts.Node): ts.Node => {
          node = ts.visitEachChild(node, visit, context);
          if (ts.isPropertyAccessExpression(node) && node.name && node.name.getText() === 'routes') {
            return node.expression;
          }
          return node;
        };
        return ts.visitNode(rootNode, visit);
      };
    };

    const r = ts.transform(source, [transformer]);
    const transformed = (r.transformed.shift() as ts.Node).getSourceFile();

    const printer = ts.createPrinter();
    const result = printer.printFile(transformed as ts.SourceFile);
    const b = 10;
  }
}
