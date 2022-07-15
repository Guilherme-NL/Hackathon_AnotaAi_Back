import { db, ObjectId } from "../dbStrategy/mongo.js";

export async function AddNote(req, res) {
  const { title, description, date } = req.body;
  const { id } = res.locals;

  try {
    await db.collection("notes").insertOne({
      title,
      description,
      date,
      userId: new ObjectId(id),
    });

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function DeleteNote(req, res) {
  const { id } = req.params;

  try {
    await db.collection("notes").deleteOne({ _id: new ObjectId(id) });

    const notes = await db.collection("notes").find({}).toArray();
    res.status(200).send(notes);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function EditNote(req, res) {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    await db
      .collection("notes")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, description, date } }
      );

    const notes = await db.collection("notes").find({}).toArray();
    res.status(200).send(notes);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function ListNotes(req, res) {
  try {
    const notes = await db.collection("notes").find({}).toArray();

    res.send(notes);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function GetNote(req, res) {
  const { id } = req.params;

  try {
    const note = await db
      .collection("notes")
      .find({ _id: new ObjectId(id) })
      .toArray();

    res.status(200).send(note);
  } catch (error) {
    res.sendStatus(500);
  }
}
