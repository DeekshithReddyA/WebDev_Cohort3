import Navbar from "@/components/Navbar";

export default function users({children}: any){
    return <div>
        <Navbar />
        {children}
    </div>
}