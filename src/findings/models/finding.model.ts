import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { AssementSessions } from '../../asesmentSessions/models/asessmentSessions.models';

@Table({
  tableName: 'findings',
  underscored: true,
  paranoid: true,
})
export class Finding extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column
  githubPath: string;

  @Column
  message: string;

  @Column
  cwe: string;

  @Column
  owasp: string;

  @Column
  references: string;

  @Column
  severity: string;

  @Default(false)
  @Column
  isFalsePositive: boolean;

  @Column
  assesmentWord: string;

  @ForeignKey(() => AssementSessions)
  @Column(DataType.UUID)
  sessionsId: string;

  @BelongsTo(() => AssementSessions, 'sessionsId')
  session: AssementSessions;
}
