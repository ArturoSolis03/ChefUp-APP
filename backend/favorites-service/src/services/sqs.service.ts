import { Injectable } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SqsService {
  private readonly sqs: SQS;
  private readonly queueUrl: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get('AWS_REGION');
    console.log('AWS region:', region);

    this.sqs = new SQS({ region });

    const queueUrl = this.configService.get<string>('SQS_QUEUE_URL');
    if (!queueUrl) {
      throw new Error('Missing SQS_QUEUE_URL environment variable');
    }
    this.queueUrl = queueUrl;
  }

  async sendMessage(messageBody: any) {
    const params = {
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(messageBody),
    };

    return this.sqs.sendMessage(params).promise();
  }
}
