import { Schema, Model, model, Date } from "mongoose";

export interface IPodkradulya{
  size: string,
  speed: number,
  createdAt: string,
  updatedAt: string
}

type PodkradulyaModel = Model<IPodkradulya>;

const podkradulyaSchema: Schema = new Schema<IPodkradulya, PodkradulyaModel>({
  size: { type: String },
  speed: { type: Number }
}, { timestamps: true })

const Podkradulya = model<IPodkradulya, PodkradulyaModel>('Podkradulya', podkradulyaSchema)

export default Podkradulya