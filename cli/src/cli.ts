import { inject as Inject, injectable as Injectable } from 'inversify';
import { askFeatures, askProjectName } from './questions';
import { ProjectService } from './service/project.service';
import { LogService } from './service/log.service';
import ts from 'typescript';
import fs from 'fs-extra';
import { Feature } from './model/feature';

const findNodes = (node: ts.Node, features: Feature[], nodes: ts.Node[] = []): ts.Node[] => {
  if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
    const children = node.getChildren().map(child => child.getText());
    const hasFeature = features.some(feature => children.some(child => child.includes(String(feature))));

    if (hasFeature) {
      ts.createObjectLiteral();
      nodes.push(node);
    }
  }

  for (const child of node.getChildren()) {
    findNodes(child, features, nodes);
  }

  return nodes;
};

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
    await this.project.validateName(projectName);

    const { features } = await askFeatures('features');
    this.project.validateFeatures(features);

    await this.project.create(projectName, features);
    await this.project.install(projectName);

    this.log.showHelp(projectName);
  }
}
