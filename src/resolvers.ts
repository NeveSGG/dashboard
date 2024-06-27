import { FilterQuery } from "mongoose";
import Podkradulya, { IPodkradulya } from "./models/Podkradulya";

type IntFilter = {
  from?: number
  to?: number
}

type DateFilter = {
  from?: string
  to?: string
}

type PodkraduliesFilters = {
  speeds?: IntFilter
  sizes?: Array<string | null>
  creation?: DateFilter
}

type PodkraduliesInput = {
  id?: Array<string>
  filter?: PodkraduliesFilters
}

const resolvers = {
  Query: {
    podkradulya: async (parent: unknown, id: string) => await Podkradulya.findById(id),
    podkradulies: async (parent: unknown, data?: {input: PodkraduliesInput}) => {
      const resultFilter: FilterQuery<IPodkradulya> = {}

      if (!data) return await Podkradulya.find(resultFilter)

      const {input} = data

      if (!input) return await Podkradulya.find(resultFilter)

      const {id, filter} = input

      if (id && id.length > 0) {
        resultFilter._id = { $in: id };
      }

      if (filter) {
        const { speeds, sizes, creation } = filter;

        if (speeds) {
          if (speeds.from !== undefined || speeds.to !== undefined) {
            resultFilter.speed = {};
          }

          if (speeds.from !== undefined) {
            resultFilter.speed.$gte = speeds.from;
          }
          if (speeds.to !== undefined) {
            resultFilter.speed.$lte = speeds.to;
          }
        }

        if (sizes && sizes.length > 0) {
          resultFilter.size = { $in: sizes };
        }

        if (creation) {
          if (creation.from || creation.to) {
            resultFilter.createdAt = {}
          }
          
          if (creation.from) {
            resultFilter.createdAt.$gte = new Date(creation.from);
          }
          if (creation.to) {
            resultFilter.createdAt.$lte = new Date(creation.to);
          }
        }
      }

      return await Podkradulya.find(resultFilter);
    },
  },
  Mutation: {
    create: async (parent: unknown, { size, speed }: IPodkradulya) => {
      const newPodkradulya = new Podkradulya({ size, speed });
      await newPodkradulya.save();
      return newPodkradulya;
    },
    update: async (parent: unknown, { id, ...rest }: IPodkradulya & { id: string }) => {
      const updatedPodkradulya = await Podkradulya.findByIdAndUpdate(id, rest, { new: true });
      if (!updatedPodkradulya) {
        throw new Error(`Podkradulya with ID ${id} not found`);
      }
      return updatedPodkradulya;
    },
    delete: async (parent: unknown, { id }: { id: string }) => {
      const deletedPodkradulya = await Podkradulya.findByIdAndDelete(id);
      if (!deletedPodkradulya) {
        throw new Error(`Podkradulya with ID ${id} not found`);
      }
      return deletedPodkradulya;
    },
  }
};

export default resolvers;
