// "use client";
// import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";


// export default function Home() {
//   return (
//     <SessionProvider>
//       <OtherHome />      
//     </SessionProvider>
//   );
// }


// function OtherHome(){
//   const session = useSession();

//   return (
//     <div>
//       {session.status === "authenticated" && <button onClick={() => signOut()}>Sign Out</button>}
//       {session.status === "unauthenticated" && <button onClick={() => signIn()}>Sign In</button>}
//     </div>
//   )
// }


// The above is the client side rendering after signin

// The below is the server side rendering after signin 

import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  // const userProfile = db.users.findOne({where : { email : session.email }})

  return(
    <div>
      {JSON.stringify(session)}
    </div>
  )
}