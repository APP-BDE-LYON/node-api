import {
  Document, Model, model, Schema,
} from 'mongoose';

// TODO: export Enum into a const queryable or a new entity with own CRUD (to be editable
const EventSchema = new Schema({
  name: { type: 'string', required: true, unique: true },
  type: {
    type: 'string',
    required: true,
    enum: [
      'Call Kolok',
      'Soirée Etudiante',
      'LAN',
      'Un moment sportif',
      'Vente de nourriture',
    ],
  },
  imgType: {
    type: String,
    required: true,
    enum: [
      'card_KOLOK',
      'card_PARTY',
      'card_LAN',
      'card_SPORT',
      'card_FOOD',
    ],
  },
  date: { type: 'Date', required: true },
  address: { type: 'string', required: true },
  description: { type: 'string', required: true },
  price: { type: 'number', required: true }, // In cents : 100 => 1,00€
  stripeProductId: { type: 'string', default: null, select: false },
  stripePriceIds: { type: 'array', default: null, select: false },
  isArchived: { type: 'boolean', default: false },
  __v: { type: Number, select: false },
});

export interface Event extends Document {
  _id: string;
  name: string;
  type: string;
  imgType: string;
  date: Date;
  address: string;
  description: string;
  price: number;
  stripeProductId: string;
  stripePriceIds: StripeProductPrices[];
  isArchived: boolean;
}

export interface StripeProductPrices {
  id: string;
  isActive: boolean;
}

export const EventModel: Model<Event> = model<Event>('Event', EventSchema);
