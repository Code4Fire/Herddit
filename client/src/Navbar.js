import { Link } from "react-router-dom"
// import Search from "./Search"
import HerdditLogo from './Images/Herddit.png'
import Button from '@mui/material/Button';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

function Navbar({user, handleLogoutClick }) {

    // function handleLogoutClick() {
    //     fetch("/logout", {
    //       method: "DELETE"
    //     })
    //           .then((r) => {
    //               if (r.ok) {
    //                   setUser(null);
    //               }
    //           });
    //   }

    return (
        <header className="img-header">
            <h1 className="header-text">Herddit</h1>
            <img id="HerdditLogo" src= {HerdditLogo} alt="Logo"/>
            <div className="nav-link">
                {user ? (
                    <>
                    <Button 
                        type="submit"
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogoutClick}
                        >Logout of Herddit...But Why?!
                        <EmojiPeopleIcon color="primary"/>
                    </Button>
                    </>
                ):(
                    <>
                    <Link href="/signup">Signup</Link>
                    <Link href="/">Login</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Navbar;