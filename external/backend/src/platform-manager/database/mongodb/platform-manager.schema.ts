import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityTypes, PlatformManagerProps } from 'rules';

type TPlatformManager = Partial<Record<keyof PlatformManagerProps, unknown>>;

@Schema()
export class PlatformManagerModel implements TPlatformManager {
  @Prop({ type: String, required: true, unique: true, index: 1 })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, unique: true, index: 1 })
  email: string;

  @Prop({ type: String, unique: true })
  password: string;

  @Prop({
    type: String,
    enum: EntityTypes.PlatformManager,
    default: EntityTypes.PlatformManager,
  })
  type: EntityTypes.PlatformManager;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;
}

export const PlatformManagerSchema =
  SchemaFactory.createForClass(PlatformManagerModel);
