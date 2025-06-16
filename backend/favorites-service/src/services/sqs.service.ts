import { Injectable } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SqsService {
  private readonly sqs: SQS;
  private readonly queueUrl: string;

  constructor(private configService: ConfigService) {
    this.sqs = new SQS({ region: this.configService.get('AWS_REGION') });
    this.queueUrl = this.configService.get('SQS_QUEUE_URL')!;
  }

  async sendMessage(messageBody: any) {
    const params = {
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(messageBody),
    };

    return this.sqs.sendMessage(params).promise();
  }
}