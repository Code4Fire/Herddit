import Navbar from "./Navbar";
import Dashboard from"./Dashboard";



function Home({ user }) {
    console.log(user);
    if (user) {
        return <h1> Welcome, {user.email}!
        <Navbar/>
        <Dashboard/>
        </h1>
    } else {
        return <h1>HOME 2 MY DASHBOARD & NAVBAR </h1>
    }
       
//             <Navbar/>
//             <Dashboard/>
//         </div>
   
}
export default Home