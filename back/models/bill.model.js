// module.exports = mongoose => {
//   var schema = mongoose.Schema(

//     {
//       no: Number,
//       date: Date,
//       type: String,
//       amount: Number,
//       published: Boolean
//     },
//     { timestamps: true }
//   );

//   schema.method("toJSON", function () {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

//   const Bill = mongoose.model("bill", schema);
//   return Bill;
// };

const mongoose = require("mongoose");

const Bill = mongoose.model(
  "Bill",
  new mongoose.Schema(
    {
      no: Number,
      date: String,
      type: String,
      amount: Number,
      isPaid: Boolean,
      user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
  )
);

module.exports = Bill;
