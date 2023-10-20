// import modules
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// Apply middlewares for the Express application
app.use(cors());
app.use(express.json());

// MongoDB
const uri =
  "mongodb+srv://imrulkaisar:0ZI8mdywF8N7xHb6@cluster0.itr0uhy.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // connect the client to the MongoDB server
    // await client.connect();

    // Access require database and collection
    const database = client.db("radiant");
    const productsData = database.collection("productsData");
    const brandsData = database.collection("brandsData");
    const typesData = database.collection("typesData");

    // get all products data
    app.get("/products", async (req, res) => {
      const findResult = productsData.find();
      const result = await findResult.toArray();
      res.json(result);
    });
    // get single product data
    app.get("/products/:url", async (req, res) => {
      const url = req.params.url;
      const findResult = productsData.find({ slug: url });
      const result = await findResult.toArray();
      res.json(result);
    });
    // get single product data with id
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const findResult = productsData.find({ _id: new ObjectId(id) });
      const result = await findResult.toArray();
      res.json(result);
    });

    // add products
    app.post("/products", async (req, res) => {
      const product = req.body;
      console.log(product);

      const result = await productsData.insertOne(product);
      res.json(result);
    });

    // update product data
    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updateProduct = req.body;

      // console.log(updateProduct);

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const update = {
        $set: {
          name: updateProduct.newName,
          slug: updateProduct.newSlug,
          image: updateProduct.newImage,
          brand: updateProduct.newBrand,
          type: updateProduct.newType,
          price: updateProduct.newPrice,
          rating: updateProduct.newRating,
          description: updateProduct.newDescription,
        },
      };

      const result = await productsData.updateOne(filter, update, options);
      res.json(result);
    });

    // delete single product
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productsData.deleteOne({ _id: new ObjectId(id) });
      res.json(result);
    });

    // Brand database operations

    // get all brands
    app.get("/brands", async (req, res) => {
      const findResult = brandsData.find();
      const result = await findResult.toArray();
      res.send(result);
    });

    // add brand data
    app.post("/brands", async (req, res) => {
      const brand = req.body;
      console.log(brand);
      const result = await brandsData.insertOne(brand);
      res.send(result);
    });

    // update brand data
    app.put("/brands/:id", async (req, res) => {
      const id = req.params.id;
      const updateBrand = req.body;
      console.log(updateBrand);

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const update = {
        $set: {
          name: updateBrand.newName,
          slug: updateBrand.newSlug,
          image: updateBrand.newImage,
          description: updateBrand.newDescription,
        },
      };

      const result = await brandsData.updateOne(filter, update, options);
      res.send(result);
    });

    // single brand data
    app.get("/brand/:slug", async (req, res) => {
      const reqSlug = req.params.slug;
      const findResult = brandsData.find({ slug: reqSlug });
      const result = await findResult.toArray();

      res.send(result);
    });

    // Type database operations

    // get all types
    app.get("/types", async (req, res) => {
      const findResult = typesData.find();
      const result = await findResult.toArray();
      res.send(result);
    });

    // add brand data
    app.post("/types", async (req, res) => {
      const brand = req.body;
      console.log(brand);
      const result = await typesData.insertOne(brand);
      res.send(result);
    });

    // single brand data
    app.get("/brand/:slug", async (req, res) => {
      const reqSlug = req.params.slug;
      const findResult = typesData.find({ slug: reqSlug });
      const result = await findResult.toArray();

      res.send(result);
    });

    // end try block
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
  }
}

run().catch(console.dir);

// Default route to check server status
app.get("/", (req, res) => {
  res.json("Server is running...");
});

// start the server and listen the on the defined port
app.listen(port, () => {
  console.log("Server is running on port:", port);
});
