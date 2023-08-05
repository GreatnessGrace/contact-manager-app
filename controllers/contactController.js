const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route Get /api/contacts
//@acess private

//Whenever we interact with the mongodb we get an async promise , so we have to make our all functions async by using async keyword; whenever we use async keyword and wanted to catch the error then we have to use try catch block ;  but we can use of a middleare which is Express 's asyncHandler by which we can handle the exception in the express async route .
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find( {user_id: req.user.id});
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  // console.log(req.body);
  // console.log(req.user)
  // Error handling in case of emty fields:
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    // As we already destructure our body and our key is same as the value ; so  in the es6 we do not needed to write name : name, we simply pass only the key i.e. name
    name,
    email,
    phone,
    user_id: req.user.id
  })
  res.status(201).json({contact });
});

const upadteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(contact.user_id.toString() !== req.user.id ){
      res.status(403);
      throw new Error("USer don't have permission to update other user contacts");
    }
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id,
    req.body,
    { new : true }  // Query
    )
  res.status(200).json(updatedContact);
});
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id ){
      res.status(403);
      throw new Error("USer don't have permission to delete other user contacts");
    }
    await Contact.deleteOne({ _id: req.params.id });
      res.status(200).json( contact );
});

const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
  res.status(200).json({ message: `Get the Contact for ${req.params.id }`,
contact: contact });
});

module.exports = {
  getContact,
  createContact,
  deleteContact,
  upadteContact,
  getContactById,
};
