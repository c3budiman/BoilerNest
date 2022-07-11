import {
  Column,
  DataType,
  Default,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Finding } from 'src/findings/models/finding.model';

@Table({
  tableName: 'status_finding',
  underscored: true,
  paranoid: true,
})
export class StatusFinding extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column
  name: string;

  @HasOne(() => Finding, 'idStatus')
  status: Finding;
}
