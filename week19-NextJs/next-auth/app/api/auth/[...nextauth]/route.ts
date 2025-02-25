import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers :[
    CredentialProvider({
        name: "your credentials",
        credentials : {
            username : { label : "Username" , type :"text" , placeholder: "Deekshith"},
            password : { labal : "Password" , type: "password"}
        },
        async authorize(credentials, req) {
            return {
                username: "deekshith",
                id: "1",
                email: "deekshithreddy@gmail.com"
            }
        },
    })
  ],
  secret : process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }