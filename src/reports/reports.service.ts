import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from 'src/users/users.entity';
import { CreateReportDto } from './dtos/create-reports.dto';
@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

  create(reportDto: CreateReportDto, user: Users) {
    const report = this.repo.create(reportDto);
    report.user = user
    return this.repo.save(report)
  }
}


