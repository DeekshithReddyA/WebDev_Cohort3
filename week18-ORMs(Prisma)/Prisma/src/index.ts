import { PrismaClient } from "@prisma/client";


const client = new PrismaClient();


const createUser = async () => {
    
    await client.user.create({
        data : {
            username : "deekshith",
            password : "deeks",
            age : 20,
            city : "Hyderabad"
        }
    });



    await client.user.delete({
        where : {
            id : 1
        }
    });




    await client.user.update({
        where : {
            id : 1
        },
        data : {
            username : "deekshithReddy",
            password : "deeks",
            age : 21,
            city : "Hyd"
        }
    });




    await client.user.findFirst({
        where : {
            id : 1
        },
    });




    await client.user.findFirst({
        where : {
            id : 1
        },
        select: {
            username : true
        }
    });


    await client.user.findFirst({
        where : {
            id : 1
        },
        include: {
            todos : true
        }
    });
    
};

createUser();
