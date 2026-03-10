import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  packageId: string;
  vehicleType: string;
  startDate: Date;
  totalGuests: number;
  leadTraveler: {
    name: string;
    email: string;
    phone: string;
  };
  guestNames: string[];
  totalCost: number;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  userId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    packageId: { type: String, required: true },
    vehicleType: { type: String, required: true },
    startDate: { type: Date, required: true },
    totalGuests: { type: Number, required: true },
    leadTraveler: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    },
    guestNames: [{ type: String }],
    totalCost: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  {
    timestamps: true,
  }
);

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
