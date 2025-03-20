import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointment/appointment.module';
import { VisitorModule } from './Visitor/visitor.module';
import { Appointment } from './appointment/appointment.entity';
import { Visitor } from './Visitor/visitor.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'User', 
      entities: [User,Visitor],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    AppointmentModule,
    VisitorModule
  ],
})
export class AppModule {}
