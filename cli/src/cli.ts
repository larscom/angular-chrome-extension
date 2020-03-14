import { inject as Inject, injectable as Injectable } from 'inversify';
import { askFeatures, askProjectName } from './questions';
import { ProjectService } from './service/project.service';
import { LogService } from './service/log.service';
import * as ts from 'typescript';
import fs from 'fs-extra';

function findNodes(node: ts.Node, nodes: ts.Node[] = []): ts.Node[] {
  if (ts.SyntaxKind[node.kind] === 'ObjectLiteralExpression') {
    nodes.push(node);
  }

  for (let child of node.getChildren()) {
    findNodes(child, nodes);
  }

  return nodes;
}

function showTree(node: ts.Node, indent: string = '    '): void {
  console.log(indent + ts.SyntaxKind[node.kind]);

  if (node.getChildCount() === 0) {
    console.log(indent + '    Text: ' + node.getText());
  }

  for (let child of node.getChildren()) {
    showTree(child, indent + '    ');
  }
}

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
    const compiler = ts.createCompilerHost(require('../tsconfig'));
    const fileName = 'app-routing.module.ts';
    const buffer = fs.readFileSync(`/home/lars/Projects/angular-chrome-extension/cli/test/angular/src/app/${fileName}`);
    const source = ts.createSourceFile(fileName, buffer.toString('utf-8'), ts.ScriptTarget.Latest, true);

    const nodes = findNodes(source).filter(node => node.getText().includes('options'));

    const test = source.getFullText().substring(nodes[0].pos, nodes[0].end);
    const test2 = source.getFullText().replace(test, '');

    showTree(source);

    compiler.writeFile(
      `/home/lars/Projects/angular-chrome-extension/cli/test/angular/src/app/testing-${fileName}`,
      test2,
      false
    );
  }
}
