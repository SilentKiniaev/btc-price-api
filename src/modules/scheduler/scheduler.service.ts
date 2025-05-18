import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronCommand } from 'cron';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  addCronJob(
    name: string,
    cronTime: string | Date,
    callback: CronCommand<null, false>,
    context?: any,
  ) {
    const job = new CronJob(cronTime, callback, null, null, null, context);
    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.debug(`job "${name}" is added`);
  }
}
