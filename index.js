require("dotenv").config();
const { default: axios } = require("axios");
const express = require("express"),
  cors = require("cors");
app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) =>
  res.json({ message: "cors-proxy is up and running!" })
);
app.get("/restaurant-cards", async (req, res) => {
  try {
    const userAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0";
    let { data } = await axios(process.env.SWIGGY_RESTAURANT_CARDS_API, {
      headers: {
        "User-Agent": userAgent,
      },
    });
    console.log(data);
    return res.json(data);
  } catch (error) {
    return res.json({ error: error });
  }
});

app.get("/restaurants/:resId",async( req,res) =>{
  try {
    const userAgent ="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0";
    let {data} = await axios(`${process.env.MENU_API}/${req.params.resId}`,{
      headers:{
        "User-Agent":userAgent,
      },
    });

return res.json(data);
  } catch (error) {
    return res.json({ error: error });
  }
})



const PORT = 3005 | process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

// 588705