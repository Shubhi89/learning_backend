const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
main().then(() => {
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
    from: "neha",
    to : "priya",
    msg : "send me your exam sheets",
    created_at : new Date(),
    },
    {
        from : "rohit",
        to : 'mohit',
        msg : 'teach me JS callbacks',
        created_at : new Date(),
    },
    {
        from : "roshni",
        to : 'meera',
        msg : 'are you coming tommorow?',
        created_at : new Date(),
    },
    {
        from : "sanjana",
        to : 'neha',
        msg : 'she is a fool',
        created_at : new Date(),
    },
];

Chat.insertMany(allChats);
