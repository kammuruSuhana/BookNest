require("dotenv")
.config();

const express=
require("express");

const cors=
require("cors");

const connectDB=
require(
"./config/connect"
);

const app=
express();

connectDB();

app.use(cors());

app.use(
express.json()
);

app.use(
"/uploads",
express.static(
"uploads"
)
);

app.use(
"/api/user",
require(
"./routes/userRoutes"
)
);

app.use(
"/api/seller",
require(
"./routes/sellerRoutes"
)
);

app.use(
"/api/admin",
require(
"./routes/adminRoutes"
)
);

app.listen(
process.env.PORT,

()=>{

console.log(
"Server Running"
);

}
);