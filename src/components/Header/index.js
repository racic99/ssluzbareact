import { Link } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from "react-redux";
import { Creators } from "../../store/Auth";

const { signOut } = Creators

const Navbar = () => {

  const user = useSelector(({ auth }) => auth.data)
  const authority = useSelector(({ auth }) => auth.authority)
  const dispatch = useDispatch()

  const logout = () => {
      dispatch(signOut())
  }
    
  return (
    <nav className="navbar bg-lightdark">
        <div className="container-xl">
            { user !== null ? <Link className="text-decoration-none" to="/"><h1 className="h2 text-altorange">SSluzba</h1></Link> : <h1 className="h2 text-altorange">SSluzba</h1> }
            { user && 
            <div>
                <button style={{padding: "0.41rem 0.75rem"}} className="btn btn-outline-altorange fw-bold border-2" onClick={logout}>Logout</button> 
                { authority && authority === "ADMIN" &&
                    <button className="btn btn-outline-altorange border-2 ms-2 pb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                      <GiHamburgerMenu size="22px" />
                  </button>
                }
            </div>
            }
        </div>
    </nav>
  );
}
 
export default Navbar;